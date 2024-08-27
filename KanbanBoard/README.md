# Important - 
1. In every object within the tasklist, add one more field named ProjectstatusNameArray of type Array. This array should contain unique names of statuses. For example:

For collab pro project:
ProjectstatusNameArray: ["Assign", "Review", "End"]
For lead management project:
ProjectstatusNameArray: ["Lead", "MQL", "SQL", "Win/Loss"]


2. In every object within the tasklist, there should be a botId field. The value of each botId should be defined based on the statusName.


example : 
{
 
  "Column": [],
  "displayColume": [ ],
  "metaData": {},
  "taskList": [
    {
      "eventId": "66851aaf19819e956b1489a1",
      "processId": "662726ff00fbf80a5ac327a0",
      "projectId": "662726ff00fbf80a5ac327d5",
      "statusName": "Review",
      "Created At": "2024-07-03T09:32:31.138Z",
      "Task Creator": "Monalisa Sahoo",
      "Task": "Database Optimization Project",
      "Assignee": "Testin",
      "orchestratorStatus": "inProgress",
      "botId": "1711013654369"  ------------------------------------------------------- 2
    },
  ],
  "isAssignableToUser": false,
  "isReleasable": false,
  "projectName": "Collab Pro",
  "total": 27,
  "ProjectstatusNameArray": ["Assign","Review","End"] -------------------------------- 1
}


# Backend 

Import all dependencies by running:
npm install

Start the backend server, which runs on port 3000:

cd ./backend
nodemon server.js
ng serve


# Database Connectivity

Check database connectivity :
mongodb://localhost:27017/ replace this

Database name:
Kanban - Replace Kanban with your database name.


Check all collection 
Projects collection: This contains the tasklist projects. Replace it with your collection name
processTaskList collection: Replace this with your processTaskList collection name.


Insert both objects (lead management and collab pro project) into the same processTaskList collection 
Set the processTaskList location in the server.js file.


# Kanban

For the frontend, nothing needs to be changed.