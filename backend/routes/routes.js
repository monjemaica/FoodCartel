
const router = (app) => {
    const users = require('../controller/usersController');
    const auth = require('../controller/authController');
    const prod = require('../controller/productController')

    //authentication
    const _auth = require('../middleware/index')

    //HOME
    app.get('/', prod.homepage)

    //USERS
    app.get('/users',_auth.isAuthenticated, _auth.role, users.getAllUsers);
    app.put('/users/:id',_auth.isAuthenticated, _auth.role, users.updateUser);
    app.delete('/users/:id',_auth.isAuthenticated, _auth.role, users.deleteUser);

    //AUTH
    app.get('/auth/register', auth.signupPage)
    app.post('/auth/register', auth.register)
    app.post('/auth/login', auth.login)
}

module.exports = router;