
module.exports = app => {
    const { existsOrError } = app.library.validation;

    function save(req, res) {
        const field = { ...req.body };

        if (req.params.parentId) {
            field.parentId = req.params.parentId;
        }

        if (req.body.id) {
            field.id = req.body.id;
        }

        try {
            existsOrError(field.parentId, 'ParentId não informado');
            existsOrError(field.type, 'Tipo não informado');
            existsOrError(field.name, 'Nome não informado');
            existsOrError(field.label, 'Label não informado');
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (field.id) { //UPDATE
            app.db('fields')
                .update(field)
                .where({ id: field.id })
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        } else { //CREATE
            app.db('fields')
                .insert(field)
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        }
    }

    async function get(req, res) {

        try {
            existsOrError(req.params.parentId, 'Página pai não informada');
        } catch (msg) {
            return res.status(400).send(msg);
        }

        app.db('fields')
            .select('parentId', 'internal', 'type', 'name', 'label')
            .where({ parentId: req.params.parentId })
            .then(fields => res.json(fields))
            .catch(err => res.status(500).send(err))
    }


    function saveInternal(req, res) {
        const field = { ...req.body };

        field.internal = true;

        if (req.params.parentId) {
            field.parentId = req.params.parentId;
        }

        if (req.body.id) {
            field.id = req.body.id;
        }

        try {
            existsOrError(field.parentId, 'ParentId não informado');
            existsOrError(field.type, 'Tipo não informado');
            existsOrError(field.name, 'Nome não informado');
            existsOrError(field.label, 'Label não informado');
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (field.id) { //UPDATE
            app.db('fields')
                .update(field)
                .where({ id: field.id })
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        } else { //CREATE
            app.db('fields')
                .insert(field)
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        }
    }

    async function getInternal(req, res) {

        try {
            existsOrError(req.params.parentId, 'Página pai não informada');
        } catch (msg) {
            return res.status(400).send(msg);
        }

        app.db('fields')
            .select('parentId', 'internal', 'type', 'name', 'label')
            .where({ parentId: req.params.parentId })
            .then(fields => res.json(fields))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, saveInternal, getInternal }
}