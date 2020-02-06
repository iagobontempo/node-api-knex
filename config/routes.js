const ADMIN = require('../library/admin');
const DEV = require('../library/dev');

module.exports = app => {
    //! ** AUTHENTICATION ** //
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    //! ** USERS ** //
    app.route('/users')
        .all(app.library.passport.authenticate())
        .get(ADMIN(app.api.user.get))
        .post(ADMIN(app.api.user.save))

    app.route('/users/:id')
        .all(app.library.passport.authenticate())
        .get(ADMIN(app.api.user.getById))
        .put(DEV(app.api.user.save))

    //! ** PAGES ** //
    app.route('/pages')
        .get(app.api.page.get)
        .post(app.library.passport.authenticate())
        .post(ADMIN(app.api.page.save))

    app.route('/pages/:id')
        .get(app.api.page.getById) // Adicionar os fields de (configur~ao) para serem pegos diretamente aqui
        .put(app.library.passport.authenticate())
        .put(ADMIN(app.api.page.save))
        .delete(app.library.passport.authenticate())
        .delete(DEV(app.api.page.remove)) //Voltar para adicionar soft delete (ficará no metodo save)

    app.route('/pages/:pageId/fields')
        .post(app.library.passport.authenticate())
        .post(ADMIN(app.api.pageFields.save))
        .put(app.library.passport.authenticate())
        .put(ADMIN(app.api.pageFields.save))
        .delete(app.library.passport.authenticate())
        .delete(DEV(app.api.pageFields.remove)) //Voltar para adicionar soft delete (ficará no metodo save)

    //! ** INTERNAL PAGES ** //
    app.route('/pages/:parentId/internal')
        .get(app.api.internalPage.get)
        .post(app.library.passport.authenticate())
        .post(ADMIN(app.api.internalPage.save))

    app.route('/pages/:parentId/internal/:id')
        .get(app.api.internalPage.getById)
        .put(app.library.passport.authenticate())
        .put(ADMIN(app.api.internalPage.save))
        .delete(app.library.passport.authenticate())
        .delete(DEV(app.api.internalPage.remove))
}