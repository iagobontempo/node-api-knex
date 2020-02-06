module.exports = app => {

    function save(req, res) {
        const field = { ...req.body };

        if (req.params.pageId) {
            field.pageId = req.params.pageId;
        }

        if (req.body.id) {
            field.id = req.body.id;
        }

        try {
            existsOrError(field.pageId, 'pageId não informado');
            existsOrError(field.inputType, 'Tipo do input não informado')
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (field.id) { //UPDATE
            app.db('pages_fields')
                .update(field)
                .where({ id: field.id })
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        } else { //CREATE
            app.db('pages_fields')
                .insert(field)
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        }

    }

    async function remove(req, res) {
        try {
            existsOrError(req.params.pageId, 'Código da página não informado')
            existsOrError(req.body.id, 'O id do campo não foi informado')

            const rowsDeleted = await app.db('pages_fields')
                .where({ id: req.body.id }).del()

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, remove }
}