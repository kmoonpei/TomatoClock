var express = require('express');
var router = express.Router();
let user = require('../controller/user.js');



router.post('/login', function(req, res, next) {
    user.login(req, res);
});

/* GET users listing. */
router.post('/register', function(req, res, next) {
    user.register(req, res);
});

router.post('/isloging', function(req, res, next) {
    user.isLoging(req, res);
});

router.get('/session', function(req, res, next) {
    let sess = req.session
    if( !sess.test ) {
        sess.test = "have session"
        res.write("no session")
        res.end()
    }else {
        res.write(sess.test)
        res.end()
    }
})

module.exports = router;
