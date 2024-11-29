const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Kirim Pesan
router.post('/send', async (req, res) => {
    try {
        const message = new Message({
            sender: req.body.sender,
            recipient: req.body.recipient,
            content: req.body.content,
        });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ambil Pesan
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.query.userId },
                { recipient: req.query.userId },
            ],
        }).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;