// Import express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of express
const app = express();
const PORT = 3000;
const database = require("./database")
// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(function (req, res, next) {
    database.getConnection(function (err, connection) {
        if (err) {
            res.render('index/404')
        } else {
            req.db = connection
            next()
        }
    })
})

// Route to handle POST request

app.get('/', (req, res) => {

    const results = req.db.query('SELECT * FROM user_names', function (err, results, fields) {

        if (err) {
            console.log(err)
            res.send('404')
        } else {
            console.log(results)
            res.send(results)
        }


    })

})


app.post('/signup', (req, res) => {
    // Extract form data from request body
    console.log('Received registration data:', req.body);

    const { username, email, password } = req.body;
    // Simple validation (In real scenarios, you should do more comprehensive validation)
    if (!username || !email || !password) {
        res.status(400).send('All fields are required.');
    } else {
        res.status(201).send('User registered successfully.');
    }
    // Process the data (e.g., save to database)
    console.log('Received registration data:', req.body);

    // Respond to the client

});




app.post('/signup', function (req, res) {

    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var email = req.body.email
    var password = req.body.password

    var permittedNames = new RegExp(/^[a-zA-Z]+$/)
    var permittedEmails = new RegExp(/^[._A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@gmail|hotmail|yahoo|outlook.com$/i)
    var permittedPasswords = new RegExp(/\s/g)

    if (permittedNames.test(firstName + lastName) &&
        permittedEmails.test(email) &&
        !permittedPasswords.test(password) && password.length > 0) {
        var saltRounds = 6 // regular user
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {

                req.db.query(`INSERT INTO Users(userFirstName, userLastName, userEmail, userPassword) VALUES('${firstName}', '${lastName}', '${email}', '${hash}')`, function (err, result, fields) {
                    if (err) {
                        console.log(err)
                        res.send('400')
                    } else {

                        crypto.randomBytes(24, (err, buf) => {

                            if (err) {
                                console.log(err)
                                res.send('404')

                            } else {

                                const algorithm = 'aes-192-cbc';
                                const key = buf
                                const iv = buf.slice(0, 16)
                                const cipher = crypto.createCipheriv(algorithm, key, iv);

                                let encrypted = '';
                                cipher.on('readable', () => {
                                    let chunk;
                                    while (null !== (chunk = cipher.read())) {
                                        encrypted += chunk.toString('hex');
                                    }
                                })

                                cipher.on('end', () => {

                                    req.db.query(`UPDATE Users SET loginSessionKey = "${buf.toString('hex')}" WHERE userID = ${result.insertId}`, function (err, result2, fields) {
                                        if (err) {
                                            console.log(err)
                                            res.send('404')
                                        } else {
                                            res.cookie('User', {
                                                "userID": result.insertId,
                                                "sessionToken": encrypted
                                            }, {
                                                expires: new Date(Date.now() + 7 * 24 * 3600000),
                                                httpOnly: true
                                            })
                                            res.send('200')
                                        }
                                    })
                                })

                                cipher.write(result.insertId.toString());
                                cipher.end();
                            }
                        })
                    }
                })
            })
        })
    } else {
        console.log('didnt pass validation')
        res.send('404')
    }
})





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});