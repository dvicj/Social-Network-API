const router = require('express').Router(); 
const {} = require('../../controllers/user-controller');

router
    .route('/')
    .get()
    .post()

router
    .route('/:id')
    .get()
    .put()
    .delete()

module.exports = router; 