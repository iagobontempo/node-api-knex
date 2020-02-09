
module.exports = app => {
    const { existsOrError } = app.library.validation;

    function save(req, res) {
        const value = { ...req.body };

        if (req.params.parentId) {
            value.parentId = req.params.parentId;
        }

        if (req.body.fieldId) {
            value.fieldId = req.body.fieldId;
        }

        if (req.body.id) {
            value.id = req.body.id;
        }

        try {
            existsOrError(value.parentId, 'ParentId não informado');
            existsOrError(value.fieldId, 'FieldId não infomado');
            existsOrError(value.value, 'Nome não informado');
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (value.id) { //UPDATE
            app.db('field_values')
                .update(value)
                .where({ id: value.id })
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
        } else { //CREATE
            app.db('field_values')
                .insert(value)
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

        app.db('field_values')
            .select('id', 'parentId', 'fieldId', 'value')
            .where({ parentId: req.params.parentId })
            .then(value => res.json(value))
            .catch(err => res.status(500).send(err))
    }

    return { save, get }
}