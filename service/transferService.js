// transferService.js
const { transfers } = require('../model/transferModel');
const { getUser } = require('./userService');

function createTransfer({ from, to, amount }) {
  const sender = getUser(from);
  const recipient = getUser(to);
  if (!sender || !recipient) throw new Error('Usuário remetente ou destinatário não encontrado');
  const isFavorecido = sender.favorecidos.includes(to);
  if (!isFavorecido && amount >= 5000) {
    throw new Error('Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos');
  }
  const transfer = { from, to, amount, date: new Date() };
  transfers.push(transfer);
  return transfer;
}

function getTransfers() {
  return transfers;
}

module.exports = {
  createTransfer,
  getTransfers,
};
