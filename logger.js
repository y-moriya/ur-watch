const winston = require('winston');
const format = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');
const timezoned = () => {
  return new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
};
const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

module.exports.logger =
  winston.createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: timezoned }),
      myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
      new DailyRotateFile({ filename: 'log/ur-watch.log', datePattern: 'yyyy-MM-DD', maxFiles: '7d' }),
      new winston.transports.Console()
    ],
  });
