require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    API_KEY: process.env.API_KEY || 'default-key',
    NODE_ENV: process.env.NODE_ENV || 'development'
};