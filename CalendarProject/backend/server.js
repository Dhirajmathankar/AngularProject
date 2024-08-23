const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const { find } = require('rxjs');
const { getDate } = require('date-fns');

const app = express();
const PORT = 3000;
const dbName = 'Kanban';
let db;

app.use(cors());
// app.use(cors());
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



 
  app.get("/calendarData/", async (req, res) => {
	try {
	  const collection = db.collection('projects');
	  const data = await collection.find().toArray();
	  if (data.length > 0) {
		res.json(data);
	  } else {
		res.status(404).send('Data not found');
	  }
	} catch (err) {
	  console.error(err);
	  res.status(500).send('Internal Server Error');
	}
  });

  app.patch('/calendarData/:id', async (req, res) => {
	try {
	  const updates = req.body;
	  const id = req.params.id;
	//   console.log(id, updates.id, updates, " test....................")
	  const collection = db.collection('projects');
	  const GetData = await collection.findOneAndUpdate(
		{
			_id: new ObjectId(id),
			'taskList.eventId': updates.id
		},
		{
			$set: {
				"taskList.$.Due Date": updates.update['Due Date'],
				"taskList.$.End Date": updates.update['End Date']
			}
		}
	);
	  if (GetData > 0) {
		res.json({ message: 'Document updated successfully' });
	  } else {
		res.status(404).send('Document not found');
	  }
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: err.message });
	}
  });
  

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
