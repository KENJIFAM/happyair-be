import express from 'express';
import feedbackly from '../services/feedbackly';
import { RoomsQuery, ChannelAPI, RoomAPI } from '../types';

const router = express.Router();

// @GET rooms?id={room-id}
router.get('/', async (req, res) => {
    try {
        const { id } = req.query as RoomsQuery;

        const channels = await feedbackly.get('/channels')
            .then(res => res.data as ChannelAPI[]);

        const rooms: RoomAPI[] = channels
            .filter(channel =>
                channel.name.includes('Kaisaniemen ala-aste') &&
                !channel.name.includes('124') &&
                !channel.name.includes('509'))
            .map(channel => ({
                id: channel.id,
                name: `Room ${channel.name.slice(-3)}`,
            }));
        return res.status(200).json([ ...rooms ]);
    } catch (err) {
        return res.status(500).send('There was a problem finding rooms.' + err);
    }
});

export default router;
