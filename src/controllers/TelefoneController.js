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
            const result = await msRequest.query('select * from telefones');
            return res.json(result.recordset);
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    },
    async byCliente(req, res) {
        try {
            const result = await msRequest.query(`select * from telefones where cliente_id = ${req.params.id}`);

            if(!result.recordset || result.recordset.length == 0) {
                throw Error("Telefones não encontrados");
            }
            
            return res.json(result.recordset);
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    },
    async show(req, res) {
        try {
            const result = await msRequest.query(`select * from telefones where id = ${req.params.id}`);

            if(!result.recordset || result.recordset.length == 0) {
                throw Error("Telefone não encontrado");
            }
            
            return res.json(result.recordset[0]);
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    },
    async store(req, res) {
        try {
            let payload = req.body;

            const result = await msRequest.query(`insert into telefones (numero, enviar_sms, enviar_whatsapp, receber_ligacoes, cliente_id)
                                                  values('${payload.numero}', ${payload.enviar_sms}, ${payload.enviar_whatsapp}, ${payload.receber_ligacoes}, ${payload.cliente_id})`)

            let message = null;
            if (result.rowsAffected[0] > 0) {
                message = "Telefone cadastrado com sucesso.";
            } else {
                message = "Telefone não foi cadastrado";
            }

            return res.json({ message });

        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);

        }
    },
    async update(req, res) {
        try {
            let payload = req.body;
 
            const result = await msRequest.query(`update telefones set
                                                  numero = '${payload.numero}',
                                                  enviar_sms = ${payload.enviar_sms},
                                                  enviar_whatsapp = ${payload.enviar_whatsapp},
                                                  receber_ligacoes = ${payload.receber_ligacoes},
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
            const result = await msRequest.query(`delete from telefones where id = ${req.params.id}`);
            
            let message = null;
            if (result.rowsAffected[0] > 0) {
                message = "Telefone deletado com sucesso.";
            } else {
                message = "O telefone informado já foi deletado ou nunca existiu."
            }
            
            return res.send({ message });
        } catch (e) {
            return res.json({ message : "Ocorreu um erro: "+ e.message }).status(400);
        }
    }
};