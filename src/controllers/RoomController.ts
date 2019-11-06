import express from 'express';
import feedbackly from '../services/feedbackly';
import { RoomsQuery, ChannelAPI, RoomAPI, MeasurementInfoAPI } from '../types';
import { getMeasurementInfo } from '../services/nuuka';

const router = express.Router();

// @GET rooms?id={room-id}
router.get('/', async (req, res) => {
    try {
        const { id } = req.query as RoomsQuery;
        const channels = await feedbackly.get('/channels')
            .then(res => res.data as ChannelAPI[]);
        const measurementInfo = await getMeasurementInfo()
            .then(res => res.data as MeasurementInfoAPI[]);

        const rooms: RoomAPI[] = channels
            .filter(channel =>
                channel.name.includes('Kaisaniemen ala-aste') &&
                !channel.name.includes('124') &&
                !channel.name.includes('509'))
            .map(channel => {
                const room = channel.name.slice(-3);
                const co2Info = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_co2`));
                const humidityInfo = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_humidity`));
                const pm1Info = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_mass_pm1`));
                const pm10Info = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_mass_pm10`));
                const pm2_5Info = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_mass_pm2_5`));
                const temperatureInfo = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_temperature`));
                const tvocInfo = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_tvoc`));
                const pressureDiffInfo = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_pressureDiff`));
                return {
                    id: channel.id,
                    name: `Room ${room}`,
                    co2: co2Info && co2Info.DataPointID || '',
                    humidity: humidityInfo && humidityInfo.DataPointID || '',
                    pm1: pm1Info && pm1Info.DataPointID || '',
                    pm10: pm10Info && pm10Info.DataPointID || '',
                    pm2_5: pm2_5Info && pm2_5Info.DataPointID || '',
                    temperature: temperatureInfo && temperatureInfo.DataPointID || '',
                    tvoc: tvocInfo && tvocInfo.DataPointID || '',
                    pressureDiff: pressureDiffInfo && pressureDiffInfo.DataPointID || '',
                };
            });

        if (id) {
            const room = rooms.find(r => r.id === id);
            return res.status(200).json({ ...room });
        }
        return res.status(200).json([ ...rooms ]);
    } catch (err) {
        return res.status(500).send('There was a problem finding rooms.' + err);
    }
});

export default router;
