module.exports = {
    async index(req, res) {
        let telefone = [{ message : 'teste' }];
        return res.json(telefone);
    },
    async show(req, res) {
        let telefone = [{ message : 'teste' }];
        return res.json(telefone);
    },
    async store(req, res) {
        let telefone = [{ message : 'teste' }];
        return res.json(telefone);
    },
    async update(req, res) {
        let telefone = [{ message : 'teste' }];
        return res.json(telefone);
    },
    async destroy(req, res) {
        let telefone = [{ message : 'teste' }];
        return res.send(telefone);
    }
};