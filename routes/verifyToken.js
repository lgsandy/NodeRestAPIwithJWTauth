const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
	//check token in heder
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');
	// invalid token - synchronous
	try {
		const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verifiedToken;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
};
