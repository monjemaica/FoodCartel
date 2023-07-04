
const router = (app) => {
    const users = require('../controller/usersController');
    const auth = require('../controller/authController');

    //authentication
    const _auth = require('../middleware/index')

    //USERS
    app.get('/users',_auth.isAuthenticated, users.getAllUsers);
    app.put('/users/:id',_auth.isAuthenticated, users.updateUser);
    app.delete('/users/:id',_auth.isAuthenticated, users.deleteUser);

    //AUTH
    app.post('/auth/register', auth.register)
    app.post('/auth/login', auth.login)
}

module.exports = router;