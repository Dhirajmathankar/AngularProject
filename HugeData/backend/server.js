const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const { find } = require('rxjs');

const app = express();
const PORT = 3000;

const corsOptions = {
	origin: 'http://192.168.43.124:4200/',
	methods: 'GET,POST,PUT,DELETE'
};


app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// app.get('/', async (req, res) => {

// 	try {
// 		await client.connect();
// 		const database = client.db('Kanban');
// 		const collection = database.collection('processTaskList');

// 		const data = await collection.find({}).toArray();
// 		const objectMap = new Map(data.map(obj => [obj.botId.toString(), obj]));

// 		const stackStoreBotId = new Map();
// 		const manualCategoryObjects = [];

// 		const findManualCategory = (botId, baseBotId) => {
// 			const stack = [{ botId, successorIndex: 0 }];
// 			while (stack.length > 0) {
// 				const current = stack[stack.length - 1];
// 				const currentObject = objectMap.get(current.botId);

// 				console.log(current);

// 				if (!currentObject) {
// 					console.log(`Bot ID ${current.botId} not found in the data`);
// 					stack.pop();
// 					if (stack.length > 0) {
// 						stack[stack.length - 1].successorIndex++;
// 					}
// 					continue;
// 				}

// 				if (currentObject.category === "" || currentObject.category === undefined) {
// 					console.log("------------------- category is empty or undefined");
// 					stack.pop();
// 					if (stack.length > 0) {
// 						stack[stack.length - 1].successorIndex++;
// 					}
// 					continue;
// 				}

// 				if (currentObject.category === "Manual" && currentObject.botId.toString() !== baseBotId) {
// 					manualCategoryObjects.push(currentObject);
// 				}

// 				while (currentObject.successor.length > 0 && current.successorIndex < currentObject.successor.length) {
// 					const nextBotId = currentObject.successor[current.successorIndex].toString();
// 					const nextObject = objectMap.get(nextBotId);

// 					if (!nextObject) {
// 						console.log(`Bot ID ${nextBotId} not found in the data`);
// 						current.successorIndex++;
// 						continue;
// 					}

// 					if (nextObject.category === "Manual") {
// 						manualCategoryObjects.push(nextObject.botId);
// 						stack.pop();
// 						if (stack.length > 0) {
// 							stack[stack.length - 1].successorIndex++;
// 						}
// 						break;
// 					}

// 					stackStoreBotId.set(current.botId, currentObject.successor.map(s => s.toString()));
// 					stack.push({ botId: nextBotId, successorIndex: 0 });
// 					break;
// 				}

// 				if (current.successorIndex >= currentObject.successor.length) {
// 					console.log(stack[stack.length - 1], " -- ");
// 					stack.pop();
// 					if (stack.length > 0) {
// 						stack[stack.length - 1].successorIndex++;
// 					}
// 				}
// 			}

// 			return null;
// 		};

// 		const initialBotId = '1711013654369'; // Update with the starting botId
// 		findManualCategory(initialBotId, initialBotId);

// 		if (manualCategoryObjects.length > 0) {
// 			console.log("Found objects with category 'Manual':", manualCategoryObjects);
// 		} else {
// 			console.log("No objects with category 'Manual' found.");
// 		}

// 		// Log the stackStoreBotId map
// 		console.log("Stack Store BotId Map:", Array.from(stackStoreBotId.entries()));

// 	} catch (err) {
// 		console.error(err);
// 	} finally {
// 		await client.close();
// 	}
// 	res.send({ status: "200", "sms": "this is your server" })
// });

app.get("/GetBotId/:id", async (req, res) => {
	try {
		await client.connect();
		const database = client.db('Kanban');
		const collection = database.collection('processTaskList');
		const data = await collection.find({}).toArray();
		// const objectMap = new Map(data.map(obj => [obj.botId.toString(), obj]));
		// const stackStoreBotId = new Map();
		// const manualCategoryObjects = new Map();
		// const botId = req.params.id;
		// const stack = [{ botId, successorIndex: 0 }];

		// while (stack.length > 0) {
		// 	const current = stack[stack.length - 1];
		// 	const currentObject = objectMap.get(current.botId);

		// 	if (!currentObject) {
		// 		stack.pop();
		// 		if (stack.length > 0) {
		// 			stack[stack.length - 1].successorIndex++;
		// 		}
		// 		continue;
		// 	}

		// 	if (currentObject.category === "" || currentObject.category === undefined) {
		// 		stack.pop();
		// 		if (stack.length > 0) {
		// 			stack[stack.length - 1].successorIndex++;
		// 		}
		// 		continue;
		// 	}

		// 	if (currentObject.category === "Manual" && currentObject.botId.toString() !== botId) {
		// 		manualCategoryObjects.set(currentObject.botId.toString(), {'botId':currentObject.botId.toString(), "statusName":currentObject.statusName.toString()});
		// 	}

		// 	while (currentObject.successor.length > 0 && current.successorIndex < currentObject.successor.length) {
		// 		const nextBotId = currentObject.successor[current.successorIndex].toString();
		// 		const nextObject = objectMap.get(nextBotId);

		// 		if (!nextObject) {
		// 			current.successorIndex++;
		// 			continue;
		// 		}

		// 		if (nextObject.category === "Manual" ) {
		// 			manualCategoryObjects.set(nextObject.botId.toString(), {'botId':nextObject.botId.toString(), "statusName":nextObject.statusName.toString()});
		// 			stack.pop();
		// 			if (stack.length > 0) {
		// 				stack[stack.length - 1].successorIndex++;
		// 			}
		// 			break;
		// 		}

		// 		stackStoreBotId.set(current.botId, currentObject.successor.map(s => s.toString()));
		// 		stack.push({ botId: nextBotId, successorIndex: 0 });
		// 		break;
		// 	}

		// 	if (current.successorIndex >= currentObject.successor.length) {
		// 		stack.pop();
		// 		if (stack.length > 0) {
		// 			stack[stack.length - 1].successorIndex++;
		// 		}
		// 	}
		// }
		// if (manualCategoryObjects.size > 0) {
			// res.send({ data: Array.from(manualCategoryObjects.values()) });
			res.send({ data: data});
		// } else {
		// 	res.status(404).send('Data not found');
		// }
	} catch (err) {
		console.error(err);
		res.status(500).send('An error occurred');
	} finally {
		if (client) {
			client.close();
		}
	}
});



app.put('/data/:id', async (req, res) => {
	try {

		await client.connect();
		const database = client.db('Kanban');
		const collection = database.collection('projects');

		const id = req.params.id;
		const {eventId, columnId, dynamicFiledName} = req.body;
		const statusNameField = `taskList.$.${dynamicFiledName}`;
		const GetData = await collection.findOneAndUpdate(
			{
				'taskList.eventId': eventId
			},
			{
				$set: {
					[statusNameField]: columnId,
				}
			},
			{ returnOriginal: false } 
		);
		if (GetData.length > 0) {
			res.send(JSON.stringify(GetData));
		} else {
			res.status(404).send('Data not found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	} finally {
		await client.close();
	}
});

// option
app.get('/form-options/:id', async (req, res) => {
	try {
		await client.connect();
		const database = client.db('Kanban');
		const collection = database.collection('tasklists');

		const id = req.params.id;
		const pipeline = [
			{
				$match: { 'templateId': `${id}`, }
			}
		];
		const GetData = await collection.aggregate(pipeline).toArray();
		console.log(GetData);
		if (GetData.length > 0) {
			res.send(JSON.stringify(GetData));
		} else {
			res.status(404).send('Data not found');
		}
	} catch (err) {
		res.status(500).send('An error occurred');
	} finally {
		await client.close();
	}

});



app.get('/data/:id', async (req, res) => {
	try {
		await client.connect();
		const database = client.db('Kanban');
		const collection = database.collection('projects');
		const id = req.params.id;
		const objectId = new ObjectId(id);
		const pipeline = [
			// { $match: { _id: objectId } }
		];
		const GetData = await collection.aggregate(pipeline).toArray();
		if (GetData.length > 0) {
			res.json(GetData);
		} else {
			res.status(404).send('Data not found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('An error occurred');
	} finally {
		await client.close();
	}
});

app.get('/data', async(req, res)=>{
	try {
		await client.connect();
		const database = client.db('Kanban');
		const collection = database.collection('projects');
		const pipeline = [
		  { 
			$match: { 
			  Column: { $exists: true, $ne: null } 
			}
		  },
		  {
			$group: {
			  _id: null,
			  uniqueValues: {
				$addToSet: "$Column"
			  }
			}
		  },
		  {
			$project: {
			  _id: 0,            
			  uniqueValues: 1    
			}
		  }
		];
	  
		const GetData = await collection.aggregate(pipeline).toArray();
		if (GetData.length > 0) {
		  res.status(200).send({Data:GetData[0]['uniqueValues']});
		} else {
		  res.status(404).send('Data not found');
		}
	  } catch (err) {
		console.error(err);
		res.status(500).send('An error occurred');
	  } finally {
		await client.close();
	  }	  
})

app.get('/filterFieldName/:fieldName', async (req, res)=>{
	try {
		await client.connect();
		const database = client.db('Kanban');
		const collection = database.collection('projects');
	  
		const FieldName = req.params.fieldName;
	  
		const pipeline = [
			{
			  $match: {
				taskList: {
				  $elemMatch: {
					[FieldName]: { $exists: true, $ne: null } 
				  }
				}
			  }
			},
		  ];
		  
	  
		const GetData = await collection.aggregate(pipeline).toArray();
		if (GetData.length > 0) {
			const newTaskList = GetData.flatMap(item => item.taskList);
		  res.status(200).send({ Data: newTaskList });
		} else {
		  res.status(404).send('Data not found');
		}
	  } catch (err) {
		console.error(err);
		res.status(500).send('An error occurred');
	  } finally {
		await client.close();
	  }	  
})
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
