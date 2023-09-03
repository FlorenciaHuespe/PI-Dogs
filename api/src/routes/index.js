const { Router } = require('express');
require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogsRoutes = require('./router_dogs');
const temperamentsRoutes = require('./router_temperaments');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRoutes);
router.use("/temperaments", temperamentsRoutes);


module.exports = router;
