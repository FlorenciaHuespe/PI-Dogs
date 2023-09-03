const { Router } = require("express");
const {getTemperaments} = require ("../handlers/getTemperamentsHandler");

const routerTemperaments = Router();



routerTemperaments.get("/", getTemperaments); //busca por temperamentos

module.exports = routerTemperaments;