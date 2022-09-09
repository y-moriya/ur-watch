const { logger } = require('../logger');
const { db } = require('../db');

module.exports.createRoom = async (id) => {
  try {
    await db.push(`/rooms/${id}`, { watch: true });
  } catch (error) {
    logger.error(error);
  }
}

module.exports.getRoom = async (id) => {
  try {
    return await db.getData(`/rooms/${id}`);
  } catch (error) {
    logger.error(error);
  }
}

module.exports.getRooms = async () => {
  try {
    return await db.getData('/rooms');
  } catch (error) {
    logger.error(error);
  }
}

module.exports.watchRoom = async (id) => {
  try {
    await db.push(`/rooms/${id}`, { watch: true });
  } catch (error) {
    logger.error(error);
  }
}

module.exports.unWatchRoom = async (id) => {
  try {
    await db.push(`/rooms/${id}`, { watch: false });
  } catch (error) {
    logger.error(error);
  }
}
