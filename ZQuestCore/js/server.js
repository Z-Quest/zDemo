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
  
