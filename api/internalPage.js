module.exports = app => {
    const { existsOrError } = app.library.validation;

    function save(req, res) {
        const internalPage = { ...req.body };

        if (req.params.id) {
            internalPage.id = req.params.id;
        }

        if (req.params.parentId) {
            internalPage.parentId = req.params.parentId;
        }

        try {
            existsOrError(internalPage.parentId, 'ParentId não informado');
            existsOrError(internalPage.name, 'Nome não informado');
            existsOrError(internalPage.uri, 'URI não informada');
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (internalPage.id) { //UPDATE
            app.db('internal_pages')
                .update(internalPage)
                .where({ id: internalPage.id })
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        } else { //CREATE
            app.db('internal_pages')
                .insert(internalPage)
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

        // Se houver query, será usado a paginação
        if (req.query.limit) {
            return getWithPagination(req, res);
        }

        app.db('internal_pages')
            .select('id', 'parentId', 'name', 'uri', 'seoTitle', 'seoDescription', 'deleted')
            .where({ parentId: req.params.parentId, deleted: false })
            .then(pages => res.json(pages))
            .catch(err => res.status(500).send(err))
    }

    function getById(req, res) {
        app.db('internal_pages')
            .select('id', 'parentId', 'name', 'uri', 'seoTitle', 'seoDescription', 'deleted')
            .where({ id: req.params.id, parentId: req.params.parentId, deleted: false })
            .first()
            .then(internalPage => res.json(internalPage))
            .catch(err => res.status(500).send(err))
    }

    async function getWithPagination(req, res) {
        const limit = req.query.limit;
        const page = req.query.page || 1

        const result = await app.db('internal_pages')
            .count('id')
            .where({ parentId: req.params.parentId, deleted: false })
            .first()
        const count = Object.values(result)[0]

        app.db('internal_pages')
            .select('id', 'parentId', 'name', 'uri', 'seoTitle', 'seoDescription', 'deleted')
            .where({ parentId: req.params.parentId, deleted: false })
            .limit(limit).offset(page * limit - limit)
            .then(internalPage => res.json({ data: internalPage, count, limit }))
    }

    async function remove(req, res) {
        try {
            const rowDeleted = await app.db('internal_pages')
                .where({ id: req.params.id, parentId: req.params.parentId }).del()

            try {
                existsOrError(rowDeleted, 'Página não encontrada')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }


    return { save, get, getById, getWithPagination, remove }
}