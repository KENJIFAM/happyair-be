import express from 'express';
import moment from 'moment';
import { getRoomsInfo } from '../utils';
import { getMeasurementDataByIDs } from '../services/nuuka';
import { RoomDetails, NuukaReportAPI } from '../types';

const router = express.Router();

// @GET /home?id={room-id}
router.get('/', async (req, res) => {
    try {
        const rooms = await getRoomsInfo();
        const now = moment();
        const endTime = moment(now).format('YYYY-MM-DD hh:mm');
        const startTime = moment(now).subtract(30, 'minute').format('YYYY-MM-DD hh:mm');
        const roomsDetails: RoomDetails[] = [];
        for (const room of rooms) {
            const roomDetails = {};
            const dataList = Object.keys(room).filter(key => key !== 'id' && key !== 'name');
            for (const data of dataList) {
                const [ dataValue ]: NuukaReportAPI[] = await getMeasurementDataByIDs({
                    dataPointIds: room[data] || '',
                    startTime,
                    endTime,
                }).then(res => res.data.slice(-1));
                roomDetails[data] = {
                    timestamp: dataValue && dataValue.Timestamp,
                    value: dataValue && dataValue.Value,
                };
            }
            roomsDetails.push({
                id: room.id,
                name: room.name,
                ...roomDetails,
            });
        }
        return res.status(200).json(roomsDetails);
    } catch (err) {
        return res.status(500).send('There was a problem finding rooms.' + err);
    }
});

export default router;
