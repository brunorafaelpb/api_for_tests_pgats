
const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Remetente, destinatário e valor são obrigatórios' });
  }
  try {
    const transfer = transferService.createTransfer({ from, to, amount });
    res.status(201).json(transfer);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
});

router.get('/', authenticateToken, (req, res) => {
  res.json(transferService.getTransfers());
});

module.exports = router;
