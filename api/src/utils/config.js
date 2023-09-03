require("dotenv").config();

const env = process.env;

module.exports = {
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_HOST: env.DB_HOST,
  API_KEY: env.APIKEY,
  URL:"https://api.thedogapi.com/v1/breeds"
};