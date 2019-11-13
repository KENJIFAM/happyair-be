import express from 'express';
import { RoomsQuery } from '../types';
import { getRoomsInfo } from '../utils';

const router = express.Router();

// @GET rooms?id={room-id}
router.get('/', async (req, res) => {
    try {
        const { id } = req.query as RoomsQuery;
        console.log(id);

        const rooms = await getRoomsInfo();
        if (id) {
            console.log('gooo');
            const room = rooms.find(r => r.id === id);
            return res.status(200).json({ ...room });
        }
        return res.status(200).json([ ...rooms ]);
    } catch (err) {
        return res.status(500).send('There was a problem finding rooms.' + err);
    }
});

export default router;
