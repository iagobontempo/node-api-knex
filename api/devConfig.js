module.exports = app => {
    const { existsOrError, notExistsOrError } = app.library.validation;

    function save(req, res) {
        const config = { ...req.body };

        //UPDATE
        app.db('dev_config')
            .update(config)
            .where({ id: 1 })
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))

    }

    function get(req, res) {
        app.db('dev_config')
            .select('menu', 'tagManagerHead', 'tagManagerBody')
            .then(config => res.json(config))
            .catch(err => res.status(500).send(err))
    }

    function getLock(req, res) {
        app.db('dev_config')
            .select('mesageHost', 'messageEmail', 'messagePassword', 'messagePort')
            .then(config => res.json(config))
            .catch(err => res.status(500).send(err))
    }

    return { save, get }

}