import express from 'express';
import feedbackly from '../services/feedbackly';
import { RoomsQuery, ChannelAPI, RoomAPI } from '../types';

const router = express.Router();

// @GET feedbacks?room={room-id}&limit-point=2.5&start-time=timestamp&end-time=<>
router.get('/', async (req, res) => {
    try {
        const { name } = req.query as RoomsQuery;

        const channels = await feedbackly.get('/channels')
            .then(res => res.data as ChannelAPI[]);

        const rooms: RoomAPI[] = channels
            .filter(channel => channel.type === 'DEVICE' &&
                (name ? channel.name.toLowerCase().includes(name.toLowerCase()) : true))
            .map(channel => ({
                id: channel.id,
                name: channel.name.split(' / ')[1],
                lastSeen: new Date(channel.last_seen).getTime(),
                lastFeedback: new Date(channel.last_feedback).getTime(),
            }));
        console.log(rooms);

        return res.status(200).json({
            rooms,
        });
    } catch (err) {
        return res.status(500).send('There was a problem finding rooms.' + err);
    }
});

export default router;
