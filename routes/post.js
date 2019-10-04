const express = require('express');
const router = express.Router();
//import verify token for this route
const verify = require('./verifyToken');
//create get post route
router.get('/', verify, (req, res) => {
	res.json({ posts: { title: 'sandy Post', desc: 'Authencated data' } });
});
//export router
module.exports = router;
