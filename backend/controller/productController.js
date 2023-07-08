exports.loginpage = async(req, res) => {
    try {
        res.render('login',{req})
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

exports.homepage = async(req, res) => {
    try {

        res.render('home',{req})
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}