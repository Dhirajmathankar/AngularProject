const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const { find } = require('rxjs');

const app = express();
const PORT = 3000;
const dbName = 'Kanban';
let db;


app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017/';

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    app.locals.db = db;
    console.log('MongoDB connected...');
})
.catch(err => console.error(err));



 
app.get("/:id", async (req, res) => {
	try {
	  const collection = db.collection('LandingPage');
	  const GetData = await collection.findOne({ _id: new ObjectId(req.params.id) });
	  if (GetData) {
		res.json(GetData);
	  } else {
		res.status(404).send('Data not found');
	  }
	} catch (err) {
	  console.error(err);
	  res.status(500).send('Internal Server Error');
	}
});


app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
