const express = require('express');
const routes  = express.Router();
const authMiddleware = require('./middlewares/auth');

const UserController = require('./controllers/UserController');
const ClienteController = require('./controllers/ClienteController');
const TelefoneController = require('./controllers/TelefoneController');

routes.get('/users', UserController.index);

routes.post('/users/register', UserController.register);

routes.post('/users/auth', UserController.auth);
// ---------------------------------------

routes.use(authMiddleware);

routes.get('/clientes/', ClienteController.index);

routes.get('/clientes/:id', ClienteController.show);

routes.post('/clientes/', ClienteController.store);

routes.put('/clientes/:id', ClienteController.update);

routes.delete('/clientes/:id', ClienteController.destroy);
// ---------------------------------------
routes.get('/telefones/', TelefoneController.index);

routes.get('/telefones/:id', TelefoneController.show);

routes.post('/telefones/', TelefoneController.store);

routes.put('/telefones/:id', TelefoneController.update);

routes.delete('/telefones/:id', TelefoneController.destroy);

module.exports = routes;


// docker run -d --name sqlserver -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=P@55w0rd' -e 'MSSQL_PID=Developer' -p 1433:1433 microsoft/mssql-server-linux:2017-latest