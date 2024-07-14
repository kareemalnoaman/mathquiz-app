const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quizzme',
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Submit login data to the database for validation
const submitLoginData = (username, password) => {
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        if (results.length > 0) {
            console.log('Login successful');
        } else {
            console.log('Invalid username or password');
        }
    });
};

// Usage example
const username = 'john';
const password = 'password123';
submitLoginData(username, password);

// Close the database connection
connection.end((err) => {
    if (err) {
        console.error('Error closing the database connection:', err);
        return;
    }
    console.log('Database connection closed');
});