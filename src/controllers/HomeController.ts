import express from 'express';
import moment from 'moment';
import { getRoomsInfo } from '../utils';
import { getMeasurementDataByIDs } from '../services/nuuka';
import { RoomDetails, NuukaReportAPI } from '../types';
import { unit } from '../utils/constants';

const router = express.Router();

// @GET /home?id={room-id}
router.get('/', async (req, res) => {
    try {
        const rooms = await getRoomsInfo();
        const now = moment();
        const endTime = moment(now).format('YYYY-MM-DD HH:mm');
        const startTime = moment(now).subtract(1, 'hours').format('YYYY-MM-DD HH:mm');
        const dataPointIds = rooms
            .flatMap(room => {
                const { id, name, ...dataList } = room;
                return Object.values(dataList);
            })
            .reduce((pre, cur) => pre += `,${cur}`);
        const result = await getMeasurementDataByIDs({
            dataPointIds,
            startTime,
            endTime,
        }).then(res => res.data as NuukaReportAPI[]);
        const roomsDetails: RoomDetails[] = rooms.map(room => {
            const { id, name, ...dataList } = room;
            const roomDetails = {};
            let timestamp = 0;
            Object.keys(dataList).forEach(data => {
                const dataResult = result.filter(res => res.DataPointID === dataList[data]).slice(-1)[0];
                if (timestamp < moment(dataResult.Timestamp).valueOf()) {
                    timestamp = moment(dataResult.Timestamp).valueOf();
                }
                roomDetails[data] = {
                    value: dataResult.Value,
                    unit: unit[data],
                };
            });
            return {
                id,
                name,
                timestamp,
                ...roomDetails,
            };
        });
        return res.status(200).json(roomsDetails);
    } catch (err) {
        return res.status(500).send('There was a problem finding rooms.' + err);
    }
});

export default router;
