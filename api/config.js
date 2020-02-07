module.exports = app => {
    const { existsOrError, notExistsOrError } = app.library.validation;

    function save(req, res) {
        const config = { ...req.body };

        //UPDATE
        app.db('config')
            .update(config)
            .where({ id: 1})
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
        
    }

    function get(req, res) {
        app.db('config')
            .select('siteName', 'siteTitle', 'logo', 'logoFooter', 'favicon', 'seoDescription','whatsapp', 'phone', 'facebook', 'linkedin', 'youtube', 'instagram')
            .then(config => res.json(config))
            .catch(err => res.status(500).send(err))
    }

    return { save, get  }

}