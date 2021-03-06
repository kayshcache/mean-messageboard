const express = require('express');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = 3000;
const DB_CREDENTIALS = process.env.DB_CREDENTIALS;
const dbName = 'mean-messageboard';
const dbUrl = `mongodb+srv://${DB_CREDENTIALS}@coder-g8zwo.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`
let db;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/message', async (req, res) => {
	const message = req.body;
	
	db.collection('messages').insertOne(message);

	const foundUser = await db.collection('users').findOne({name: message.userName});
	console.log(foundUser);

	if(!foundUser) db.collection('users').insertOne({name: message.userName});

	res.status(200).send();
});

app.get('/api/message', async (req, res) => {
	const docs = await db.collection('messages').find({}).toArray();
	if (!docs) return res.json({error: 'Error getting messages'});
	res.json(docs);
});

MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
	if (err) return console.log('mongodb error', err);
	console.log('Connected successfully to Mongo (Cloud) Atlas');
	db = client.db(dbName);
});

app.listen(port, () => console.log('App running on port', port));

async function getMessages() {
	const docs = await db.collection('messages').find({}).toArray();
	console.log(docs);
}

async function whatever () {

}
