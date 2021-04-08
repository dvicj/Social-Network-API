const router = require('express').Router(); 
const {} = require('../../controllers/thought-controller');

router.route('/:userId').post(); 

router
    .route('/:userId/:thoughtId')
    .put()
    .delete();

router.route('/:userId/:thoughtId/:reactionId').delete(); 

module.exports = router; 