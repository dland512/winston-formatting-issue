const winston = require('winston');
const jsonStr = require('fast-safe-stringify');

const customFormat = winston.format.printf(data => {
    const { level, message, timestamp } = data;
    const args = data[Symbol.for('splat')];

    let strArgs = '';

    if (args) {
        strArgs = args.map(jsonStr).join(' ');
    }
        
    return `${timestamp} ${level}: ${message} ${strArgs}\n`;
});

logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(winston.format.timestamp(), customFormat),
    transports: [new winston.transports.Console()]
});

logger.log('debug', 'hi', 123, { a: 1, b: 'two' });
logger.log('debug', 'hi', { timestamp: 'this is bad' });
logger.log('debug', 'hi', 123, { timestamp: 'this is fine' } );
