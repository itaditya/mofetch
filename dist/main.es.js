module.exports = process.env.NODE_ENV === 'production' ? require('./production.es.js') : require('./development.es.js');
