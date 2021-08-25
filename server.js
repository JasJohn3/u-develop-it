require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'election'
  },
);
console.log('Connected to database');
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

// GET a single candidate
app.get('/api/candidate/:id',(req,res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({
        error: err.message
      });
      return;
    }
    res.json({
      message:'success',
      data: row
    });
  });
});
// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});


// Get all candidates
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.use((req, res) =>{
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
