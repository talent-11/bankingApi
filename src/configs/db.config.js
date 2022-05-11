require('dotenv').config();

const env = process.env;

module.exports = `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_URL}/${env.DB_NAME}?retryWrites=true&w=majority`;
