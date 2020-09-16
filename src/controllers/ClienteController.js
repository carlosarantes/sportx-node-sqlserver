const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'P@55w0rd',
    database: 'sportx',
    server: 'localhost'
};
 
sql.connect(config);
const msRequest = new sql.Request();

module.exports = {
    async index(req, res) {
        try {
            const result = await msRequest.query('select * from clientes');
            return res.json(result.recordset);
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    },
    async show(req, res) {
        try {
            const result = await msRequest.query(`select * from clientes where id = ${req.params.id}`);

            if(!result.recordset || result.recordset.length == 0) {
                throw Error("Cliente não encontrado");
            }
            
            return res.json(result.recordset[0]);
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    },
    async store(req, res) {

        try {

            const userId = req.userId;

            let payload = req.body;

            const result = await msRequest.query(`insert into clientes (tipo_pessoa,nome,cpf_cnpj,cep,email,classificacao,userId)
                                                  values('${payload.tipo_pessoa}', '${payload.nome}', '${payload.cpf_cnpj}', '${payload.cep}', '${payload.email}', '${payload.classificacao}', ${userId})`)

            let message = null;
            if (result.rowsAffected[0] > 0) {
                message = "Cliente cadastrado com sucesso.";
            } else {
                message = "Cliente não foi cadastrado";
            }

            return res.json({ message });

        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);

        }
    },
    async update(req, res) {

        try {
            let payload = req.body;

            const result = await msRequest.query(`update clientes set
                                                  tipo_pessoa = '${payload.tipo_pessoa}',
                                                  nome = '${payload.nome}',
                                                  cpf_cnpj = '${payload.cpf_cnpj}',
                                                  cep = '${payload.cep}',
                                                  email = '${payload.email}',
                                                  classificacao = '${payload.classificacao}'
                                                  where id = ${req.params.id}`);

            let message = null;
            if (result.rowsAffected[0] > 0) {
                message = "Cliente alterado com sucesso.";
            } else {
                message = "Cliente não foi alterado";
            }

            return res.json({ message });                        
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    },
    async destroy(req, res) {
        try {
            const result = await msRequest.query(`delete from clientes where id = ${req.params.id}`);
            
            let message = null;
            if (result.rowsAffected[0] > 0) {
                message = "Cliente deletado com sucesso.";
            } else {
                message = "O cliente informado já foi deletado ou nunca existiu."
            }
            
            return res.send({ message });
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    }
};