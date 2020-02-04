module.exports = app => {
    //! ** AUTHENTICATION ** //
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    //! ** USERS ** //
    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.user.get)
        .post(app.api.user.save)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getById)
        .put(app.api.user.save)

    //! ** PAGES ** //
    app.route('/pages')
        .get(app.api.page.get)
        .post(app.config.passport.authenticate())
        .post(app.api.page.save)

    app.route('/pages/:id')
        .get(app.api.page.getById)
        .put(app.config.passport.authenticate())
        .put(app.api.page.save)
        .delete(app.config.passport.authenticate())
        .delete(app.api.page.remove) //Voltar para adicionar soft delete (ficará no metodo save)

    //! ** INTERNAL PAGES ** //
    app.route('/pages/:parentId/internal')
        .get(app.api.internalPage.get)
        .post(app.config.passport.authenticate())
        .post(app.api.internalPage.save)

    app.route('/pages/:parentId/internal/:id')
        .get(app.api.internalPage.getById)
        .put(app.config.passport.authenticate())
        .put(app.api.internalPage.save)
        .delete(app.config.passport.authenticate())
        .delete(app.api.internalPage.remove)
}