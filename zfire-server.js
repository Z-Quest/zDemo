const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require('./path/to/your/serviceAccountKey.json'); // Replace with your own service account key

const app = express();
const PORT = 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const scavengerHuntCollection = db.collection('scavenger_hunt');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle form submissions
app.post('/add-item', (req, res) => {
  const item = {
    name: req.body.itemName,
    task: req.body.task,
    clue: req.body.clue,
  };

  // Save data to Firebase Firestore
  scavengerHuntCollection.add(item);

  res.redirect('/');
});

// Route to serve the form page
app.get('/', (req, res) => {
  const formPage = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Scavenger Hunt Form</title>
    </head>
    <body>
      <h1>Add Items, Tasks, and Clues</h1>
      <form action="/add-item" method="post">
        <div>
          <label for="itemName">Item Name:</label>
          <input type="text" name="itemName" required>
        </div>
        <div>
          <label for="task">Task:</label>
          <input type="text" name="task" required>
        </div>
        <div>
          <label for="clue">Clue:</label>
          <input type="text" name="clue" required>
        </div>
        <button type="submit">Add Item</button>
      </form>
    </body>
    </html>
  `;
  res.send(formPage);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
