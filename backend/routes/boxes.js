const express = require('express');
const router = express.Router();
const { DeskPositionManage } = require('../models');

// POST /api/boxes
router.post('/', async (req, res) => {
    const boxes = req.body;
    if (!Array.isArray(boxes)) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    try {
        // 既存データを全削除
        await DeskPositionManage.destroy({ where: {} });
        // 一括insert
        await DeskPositionManage.bulkCreate(
            boxes.map(box => ({
                x_position: box.x,
                y_position: box.y,
                rotation_angle: box.rotation || 0
            }))
        );
        return res.status(200).json({ message: '保存しました' });
    } catch (err) {
        console.error('BOX SAVE ERROR:', err, boxes);
        return res.status(500).json({ message: 'サーバーエラー' });
    }
});

// GET /api/boxes
router.get('/', async (req, res) => {
    try {
        const boxes = await DeskPositionManage.findAll();
        res.json(boxes);
    } catch (err) {
        console.error('BOX FETCH ERROR:', err);
        res.status(500).json({ message: 'サーバーエラー' });
    }
});

module.exports = router; 