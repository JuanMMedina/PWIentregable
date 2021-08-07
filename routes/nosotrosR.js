const express = require('express');
const router = express.Router();


const aboutUs = (req, res) => {
    res.render('nosotrosV',);
}

router.get('/', aboutUs);

module.exports = router;