const { Router } = require("express");
const {getTemperaments} = require ("../handlers/handlersTemperaments");
const routerTemperaments = Router();



routerTemperaments.get("/", getTemperaments); //busca por temperamentos

module.exports = routerTemperaments;