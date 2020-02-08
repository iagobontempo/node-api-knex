const ADMIN = require('../library/admin');
const DEV = require('../library/dev');

module.exports = app => {
    //! ** AUTHENTICATION ** //
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    //! ** CONFIG ** //
    app.route('/config')
        .get(app.api.config.get)
        .put(app.library.passport.authenticate())
        .put(ADMIN(app.api.config.save))

    //! ** DEV CONFIG ** //
    app.route('/devConfig')
        .get(app.api.devConfig.get)
        //.get(app.api.devConfig.getLock) ! Como fazer para os dados sensiveis serem pegos apenas pelo servico??? Servico de email etc
        .put(app.library.passport.authenticate())
        .put(ADMIN(app.api.devConfig.save))

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
        .get(app.api.page.getById)
        .put(app.library.passport.authenticate())
        .put(ADMIN(app.api.page.save))
        .delete(app.library.passport.authenticate())
        .delete(DEV(app.api.page.remove)) //Voltar para adicionar soft delete (ficará no metodo save)

    //! ** PAGES FIELD ** //
    app.route('/pages/:parentId/fields')
        .get(app.api.fields.get) // Pegar os fields da page
        .put(app.api.fields.save) // Update nos fields
        .post(app.api.fields.save) // Criar fields da page

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

    //! ** INTERNAL PAGES FIELD ** //
    app.route('/pages/:parentId/internal/fields')
        .get(app.api.fields.getInternal) // Pegar os fields da page interna
        .put(app.api.fields.saveInternal) // Update nos fields interna
        .post(app.api.fields.saveInternal) // Criar fields da page interna
}