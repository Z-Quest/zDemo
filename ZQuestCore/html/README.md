To have the form data feed into an Excel sheet, you'll need to use server-side technology to handle the form submission and write the data to the Excel sheet. In this example, I'll use Node.js as the server-side runtime and the "xlsx" library to work with Excel files. Please note that this example is a simplified version, and in a demo application, you would need to implement proper error handling and security measures before launching the real application.

1. Install Dependencies:
Make sure you have Node.js installed on your system. Then, create a new directory for your project and initialize it using npm:

```bash
npm init -y
npm install express xlsx
```

2. Create the server file (e.g., `server.js`):

```javascript
const express = require('express');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Store the data in an array (for demonstration purposes)
const items = [];

// Route to handle form submissions
app.post('/add-item', (req, res) => {
  const item = {
    name: req.body.itemName,
    task: req.body.task,
    clue: req.body.clue,
  };
  items.push(item);

  // Save data to Excel file
  saveToExcel();

  res.redirect('/');
});

// Function to save data to Excel
function saveToExcel() {
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(items);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Scavenger Hunt Data');
  xlsx.writeFile(workbook, 'scavenger_hunt_data.xlsx');
}

// Route to serve the form page
app.get('/', (req, res) => {
  const formPage = fs.readFileSync('form.html', 'utf8');
  res.send(formPage);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
```

3. Create the HTML form file (e.g., `form.html`):

```html
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
```

Now, when you run the server (`node server.js`), it will serve the HTML form page on http://localhost:3000, and when you submit the form, it will save the data to an Excel file named `scavenger_hunt_data.xlsx`. Each time you submit the form, the data will be appended to the Excel sheet.

Please note that this is a simple example, and in the real application, you would need to handle edge cases, such as handling file names dynamically, preventing duplicate data, and implementing authentication to ensure secure access to the form and data. Additionally, you might consider using a database for more complex applications to manage the data efficiently. Think about using Firebase Realtime Database.
