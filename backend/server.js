const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.text());

app.post('/api/message', (req, res) => {
	console.log(req.body);
	res.status(200);
});

app.listen(port, () => console.log('App running on port', port));

