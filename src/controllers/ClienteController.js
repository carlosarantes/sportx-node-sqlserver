module.exports = {
    async index(req, res) {
        let cliente = [{ message : 'teste' }];
        return res.json(cliente);
    },
    async show(req, res) {
        let cliente = { message : 'teste' };
        return res.json(cliente);
    },
    async store(req, res) {
        let cliente = { message : 'teste' };
        return res.json(cliente);
    },
    async update(req, res) {
        let cliente = { message : 'teste' };
        return res.json(cliente);
    },
    async destroy(req, res) {
        let cliente = { message : 'teste' };
        return res.send(cliente);
    }
};