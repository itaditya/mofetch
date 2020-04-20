module.exports = process.env.NODE_ENV === 'production' ? require('./production.lib.js') : require('./development.lib.js');
