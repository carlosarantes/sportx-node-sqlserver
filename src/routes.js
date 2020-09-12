const express = require('express');
const routes  = express.Router();

const UserController = require('./controllers/UserController');
const ClienteController = require('./controllers/ClienteController');
const TelefoneController = require('./controllers/TelefoneController');

routes.get('/users', UserController.index);

routes.post('/users/register', UserController.register);

routes.post('/users/auth', UserController.auth);
// ---------------------------------------
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