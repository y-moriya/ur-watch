const { logger } = require('../logger');
const { db } = require('../db');

module.exports.updateRooms = async (rooms) => {
  try {
    await db.push(`/rooms`, rooms);
  } catch (error) {
    logger.error(error);
  }
}

module.exports.getAllRooms = async () => {
  try {
    return await db.getData("/rooms");
  } catch (error) {
    logger.error(error);
    return null;
  }
}

module.exports.getRoom = async (room_number) => {
  try {
    const rooms = await db.getData("/rooms");
    return rooms.filter((r) => r.number === room_number)?.at(0);
  } catch (error) {
    logger.error(error);
    return null;
  }
}

module.exports.ignoreRoom = async (room_number) => {
  try {
    const rooms = await this.getAllRooms();
    const room = rooms.filter((r) => r.number === room_number)?.at(0);
    room.ignore = true;
    await this.updateRooms(rooms);
  } catch (error) {
    logger.error(error);
  }
}

module.exports.unIgnoreRoom = async (room_number) => {
  try {
    const rooms = await this.getAllRooms();
    const room = rooms.filter((r) => r.number === room_number)?.at(0);
    room.ignore = false;
    await this.updateRooms(rooms);
  } catch (error) {
    logger.error(error);
  }
}

module.exports.addRoom = async (room_number) => {
  try {
    const rooms = await this.getAllRooms();
    rooms.push({ number: room_number, ignore: false });
    await this.updateRooms(rooms);
  } catch (error) {
    logger.error(error);
  }
}

