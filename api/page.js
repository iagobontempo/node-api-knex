module.exports = app => {
    const { existsOrError, notExistsOrError } = app.library.validation;

    function save(req, res) {
        const page = { ...req.body };

        if (req.params.id) {
            page.id = req.params.id;
        }

        try {
            existsOrError(page.name, 'Nome não informado');
            existsOrError(page.uri, 'URI não informada')
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (page.id) { //UPDATE
            app.db('pages')
                .update(page)
                .where({ id: page.id })
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        } else { //CREATE
            app.db('pages')
                .insert(page)
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        }
    }

    function get(req, res) {
        app.db('pages')
            .select('id', 'name', 'uri', 'status', 'seoTitle', 'seoDescription', 'deleted')
            .where({ deleted: false })
            .then(pages => res.json(pages))
            .catch(err => res.status(500).send(err))
    }

    function getById(req, res) {
        const pageId = req.params.id
        app.db('pages')
            .select('id', 'name', 'uri', 'status', 'seoTitle', 'seoDescription', 'deleted')
            .where({ id: pageId, deleted: false })
            .first()
            .then(page => res.json(page))
            .catch(err => res.status(500).send(err))
    }

    async function remove(req, res) {
        try {
            existsOrError(req.params.id, 'Código da página não informado')

            const internalPage = await app.db('internal_pages')
                .where({ parentId: req.params.id })
            notExistsOrError(internalPage, 'Página possui dependencias internas.')

            const rowsDeleted = await app.db('pages')
                .where({ id: req.params.id }).del()

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }

}