var usersController = {
    register: function (req, res) {
        res.render('register');
    },
    login: function (req, res) {
        res.render('login');
    },
    profile: function (req, res) {
        res.render('profile');
    },
    profileEdit: function (req, res) {
        res.render('profile-edit');
    }
};

module.exports = usersController;