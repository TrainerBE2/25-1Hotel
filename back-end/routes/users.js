var express = require('express');
var router = express.Router();
const {createUser, getAllUsers, deleteUsers, restoreUsers, updateUser} = require('../controller/UserController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/user', createUser);
router.get('/user', getAllUsers);
router.put('/user/delete/:id', deleteUsers);
router.put('/user/restore/:id', restoreUsers);
router.put('/user/edit/:id', updateUser);
module.exports = router;
