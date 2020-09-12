module.exports = {
    async index(req, res) {
        let user = [{ message : 'teste' }];
        return res.json(user);
    },
    async register(req, res) {
        let user = [{ message : 'teste' }];
        return res.json(user);
    },
    async auth(req, res) {
        let user = [{ message : 'teste' }];
        return res.json(user);
    }
};