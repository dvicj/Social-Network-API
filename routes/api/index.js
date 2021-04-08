const router = require('express').Router(); 

const apiRoutes = require('./api');

router.use('/api', apitRoutes);

router.use((req,res) => {
    res.status(404).send('<h1>404! Wrong way!</h1>');
});

module.exports = router; 