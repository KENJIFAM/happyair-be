import express from 'express';
import { ReportQuery } from '../types';
import { getRoomsInfo } from '../utils';
import { units } from '../utils/constants';
import { getMeasurementDataByIDs } from '../services/nuuka';

const router = express.Router();

// @GET reports/{roomId}?data=[co2, temperature]&startTime=timestamp&endTime=<>&groupBy=[day, week, month]
// {
//     "room": "abc",
//     "type": "co2",
//     "unit": "ppm",
//     "group_by": "date",
//     "data": [
//       {
//         "collected_time": 1234567789023,
//         "value": 120.4,
//         "rating": 3.3
//       },
//       {
//         "collected_time": 1234567789023,
//         "value": 120.4,
//         "rating": 3.3
//       }
//     ]
//   }
router.get('/:roomId', async (req, res) => {
    try {
        const { roomId } = req.params;
        const { dataType, startTime, endTime, groupBy = 'minute' } = req.query as ReportQuery;
        if (!dataType || !startTime || !endTime) {
            return res.status(500).send('"dataType", "startTime", "endTime" queries are required! "groupBy"="minute" by default if not provided');
        }

        const roomInfo = await getRoomsInfo()
            .then(res => res.find(r => r.id === roomId));
        console.log(roomInfo);
        if (!roomInfo) {
            return res.status(500).send('No room found!');
        }

        const measurementDataByIDs = await getMeasurementDataByIDs({
            dataPointIds: roomInfo[dataType],
            endTime,
            startTime,
        }).then(res => res.data);

        return res.status(200).json({
            id: roomId,
            dataType,
            unit: units[dataType],
            groupBy,
            data: measurementDataByIDs,
        });
    } catch (err) {
        return res.status(500).send('There was a problem finding reports.' + err);
    }
});

export default router;
