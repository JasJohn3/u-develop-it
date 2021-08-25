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
    password: 'JSPlasmo2@',
    database: 'election'
  },
);
console.log('Connected to database');
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.use((req, res) =>{
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
