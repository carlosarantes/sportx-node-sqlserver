const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'P@55w0rd',
    database: 'sportx',
    server: 'localhost'
};
 
try {
    sql.connect(config);
    const msRequest = new sql.Request();
 } catch(e) {
     console.log(e.message);
 }


module.exports = {
    async index(req, res) {
        try {
            const result = await msRequest.query('select * from users');
            return res.json(result.recordset);
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    },
    async register(req, res) {
        try {
            let user = req.body;

            const hash = await bcrypt.hash(user.senha, 10);
            user.senha = hash;

            const result = await msRequest.query(`insert into users (nome,email,senha)
                                                  values('${user.nome}', '${user.email}', '${user.senha}')`)

            if (result.rowsAffected[0] == 0) {
                throw Error("Ocorreu algum erro durante o seu cadastro...");
            } 

            const token = jwt.sign({  id : user.id }, authConfig.secret, {
                expiresIn: 86400,
            });

            return res.json({ message : "Cadastro realizado com sucesso", token });
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    },
    async auth(req, res) {
        try {
            let payload = req.body;

            const result = await msRequest.query(`select * from users where email = '${payload.email}'`);
            
            if (!result.recordset || result.recordset.length == 0){
                throw Error('Usuário não encontrado.');
            }

            const user = result.recordset[0];

            if(!await bcrypt.compare(payload.senha, user.senha)) {
                return res.status(400).send({ error : "Invalid password" });
            }
    
            user.senha = null;

            const token = jwt.sign({  id : user.id }, authConfig.secret, {
                expiresIn: 86400,
            });

            return res.json({ message : "Login realizado com sucesso", token });
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(401);
        }
    }
};