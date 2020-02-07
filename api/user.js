const bcrypt = require('bcryptjs');

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.library.validation;

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    async function save(req, res) {
        const user = { ...req.body }

        if (req.params.id) {
            user.id = req.params.id;
        }

        //PROTEGENDO PARA SER CRIADO USUARIOS DIRETAMENTE COM ADMIN OU DEV
        if(!req.originalUrl.startsWith('/users')) {
            user.admin = false;
            user.dev = false;
        }
        if(!req.user || !req.user.admin || !req.user.dev) {
            user.admin = false;
            user.dev = false;
        }

        try {
            existsOrError(user.name, 'Nome não informado');
            existsOrError(user.email, 'Email não informado');
            existsOrError(user.password, 'Senha não informada');
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida');
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem');

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first();
            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado');
            }
        } catch (msg) {
            return res.status(400).send(msg);
        }

        user.password = encryptPassword(user.password);
        delete user.confirmPassword;

        if (user.id) { //UPDATE
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { //CREATE
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    function get(req, res) {
        app.db('users')
            .select('id', 'name', 'email', 'admin', 'dev')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    function getById(req, res) {
        const userId = req.params.id

        app.db('users')
            .select('id', 'name', 'email', 'admin', 'dev')
            .where({ id: userId })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}