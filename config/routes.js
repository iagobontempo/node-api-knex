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
        .delete(app.api.page.remove)
}