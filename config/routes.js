module.exports = app => {

    //! ** USERS ** //
    app.route('/users')
        .get(app.api.user.get)
        .post(app.api.user.save)

    app.route('/users/:id')
        .get(app.api.user.getById)
        .put(app.api.user.save)

    //! ** PAGES ** //
    app.route('/pages')
        .get(app.api.page.get)
        .post(app.api.page.save)

    app.route('/pages/:id')
        .get(app.api.page.getById)
        .put(app.api.page.save)
        .delete(app.api.page.remove) //Voltar para adicionar soft delete (ficará no metodo save)

    //! ** INTERNAL PAGES ** //
    app.route('/pages/:parentId/internal')
        .get(app.api.internalPage.get)
        .post(app.api.internalPage.save)

    app.route('/pages/:parentId/internal/:id')
        .get(app.api.internalPage.getById)
        .put(app.api.internalPage.save)
        .delete(app.api.internalPage.remove)
}