const { buildOpt } = require('../lib/util');
const { apiUrl, aparts, urUrl, channelId, ignoreCondition, washitsuApiUrl } = require('../config.json');
const fetch = require('node-fetch');
const { logger } = require('../logger');
const { createRoom, getRoom, unWatchRoom } = require('../lib/room');
const { _sleep } = require('./_sleep');

module.exports.main = async (client) => {
    logger.info('start get rooms from api');
    for (const apart of aparts) {
        for (let i = 0; i < 10; i++) {
            const opt = buildOpt(apart.shisya, apart.danchi, apart.shikibetu, i);
            const response = await fetch(apiUrl, opt);
            const json = await response.text();
            const rooms = JSON.parse(json);
            if (rooms && rooms.length > 0) {
                for (const room of rooms) {
                    retrieveRoom(client, room, apart);
                }
            } else {
                logger.info(`空室情報はありませんでした。pageIndex: ${i}`);
                break;
            }
        }
    }
    logger.info('end get rooms from api');
}

const retrieveRoom = async (client, room, apart) => {
    const existRoom = await getRoom(room.id);
    if (existRoom && !existRoom.watch) {
        logger.info(`${room.name} はウォッチ対象外のためスキップします。`);
        return;
    } else {
        await createRoom(room.id);
    }
    if (apart.watch || await isFitRoom(room)) {
        const mes = `${room.name} ${room.madori}\n${urUrl + room.roomDetailLink}`;
        logger.info(mes);
        const channel = await client.channels.fetch(channelId);
        channel.send(mes);
    }
}

const isFitRoom = async (room) => {
    if (ignoreCondition.madori.includes(room.type)) {
        logger.info(`${room.name} は ${room.type} のためスキップします。`);
        await unWatchRoom(room.id);
        return false;
    }

    if (room.floor == ignoreCondition.floor) {
        logger.info(`${room.name} は ${room.floor} のためスキップします。`);
        await unWatchRoom(room.id);
        return false;
    }

    const floorspace = parseInt(room.floorspace.replace('&#13217'));
    if (floorspace < ignoreCondition.floorspace) {
        logger.info(`${room.name} は ${floorspace}m^2 のためスキップします。`);
        await unWatchRoom(room.id);
        return false;
    }

    const rent = parseInt(room.rent.replace(',', '').replace('円', ''));
    const commonfee = parseInt(room.commonfee.replace(',', '').replace('円', ''));
    if (rent + commonfee > ignoreCondition.fee) {
        logger.info(`${room.name} は ${rent + commonfee}円 のためスキップします。`);
        await unWatchRoom(room.id);
        return false;
    }

    // OpenCV API で和室判定
    const madori = encodeURIComponent(room.madori);
    const hasWashitsu = await fetch(washitsuApiUrl + madori);
    if (hasWashitsu) {
        logger.info(`${room.name} は和室を含むためスキップします。`);
        await unWatchRoom(room.id);
        return false;
    }

    return true;
}