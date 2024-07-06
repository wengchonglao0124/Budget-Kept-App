var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Registration API
router.post('/register', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  // Verify body
  if (!username || !password) {
      console.log("Request body incomplete - username and password needed");
      // HTTP 400 Bad Request
    res.status(400).json({
      error: true,
      message: "Request body incomplete - username and password needed"
    });
    return;
  }

  const queryUsers = req.db.from("Users").select("*").where("username", "=", username);
  queryUsers
      .then((users) => {
        if (users.length > 0) {
          console.log("User already exists");
          // HTTP 409 Conflict response
          res.status(409).json({
            error: true,
            message: "User already exists"
          });
          return;
        }
        // Insert user into DB
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        return req.db.from("Users").insert({ username, hash });
      })
      .then((insertResult) => {
        if (insertResult) {
          console.log("Successfully inserted user");
            // Get user id
            req.db.from("Users").select("*").where("username", "=", username)
                .then((users) => {
                    const userRecord = users[0];
                    // Initialise user financials
                    return req.db.from("UserFinancials").insert({ user_id: userRecord.id });
                })
                .then((insertFinancialsResult) => {
                    if (insertFinancialsResult) {
                        console.log(`Financials initialised for ${username}`);
                        // HTTP 201 Created
                        res.status(201).json({ error: false, message: "User registered and financials initialised" });
                    }
                });
        }
      })
      .catch((err) => {
        console.error(err);
        // HTTP 500 Internal Server Error
        res.status(500).json({ error: true, message: "Internal server error" });
      })
});


// Login API
router.post('/login', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    // Verify body
    if (!username || !password) {
        console.log("Request body incomplete - username and password needed");
        // HTTP 400 Bad Request
        res.status(400).json({
            error: true,
            message: "Request body incomplete - username and password needed"
        });
        return;
    }

    const queryUsers = req.db.from("Users").select("*").where("username", "=", username);
    queryUsers
        .then((users) => {
            if (users.length === 0) {
                console.log("User does not exist");
                // HTTP 404 Not Found
                res.status(404).json({
                    error: true,
                    message: "User does not exist"
                });
                return null;
            }
            // Compare password hash
            const user = users[0];
            return bcrypt.compare(password, user.hash);
        })
        .then((match) => {
            if (match === null)
                return

            if (!match) {
                console.log("Password do not match");
                // HTTP 400 Bad Request
                res.status(400).json({
                    error: true,
                    message: "Password does not match"
                });
                return;
            }

            console.log("Passwords match");
            const secretKey = process.env.SECRET_KEY;
            const expires_in = 60 * 60 * 24; // 1 day
            const exp = Date.now() + expires_in * 1000;
            const token = jwt.sign({ username, exp }, secretKey);
            console.log("Access Token sent");
            // HTTP 200 OK
            res.status(200).json({ token_type: "Bearer", token, expires_in });
        })
        .catch((err) => {
            console.error(err);
            // HTTP 500 Internal Server Error
            res.status(500).json({ error: true, message: "Internal server error" });
        })
});


// Forgot Password API
router.post('/forgot-password', function(req, res, next) {
    const username = req.body.username;

    // Verify body
    if (!username) {
        console.log("Request body incomplete - username is required");
        // HTTP 400 Bad Request
        return res.status(400).json({
            error: true,
            message: "Request body incomplete - username is required"
        });
    }

    const queryUsers = req.db.from("Users").select("*").where("username", "=", username)
    queryUsers
        .then(users => {
            if (users.length === 0) {
                console.log("Attempt to reset password for non-existent account.");
                return res.status(200).json({
                    message: "If an account with that username exists, we have sent a pin to reset the password."
                });
            }

            const user = users[0];
            // Generate a reset pin
            const resetPin = Math.floor(100000 + Math.random() * 900000);  // Generates a six-digit pin

            // Hash the pin for secure storage
            const saltRounds = 10;
            const pinHash = bcrypt.hashSync(resetPin.toString(), saltRounds);
            // PIN expires in 5 minutes from creation
            console.log("Reset PIN will be expire in 5 minutes");
            const expires_in = 5 * 60;
            const exp = new Date(Date.now() + expires_in * 1000);

            req.db.from("ResetPins").select("*").where("user_id", "=", user.id)
                .then(resetPins => {
                    if (resetPins.length === 0) {
                        // No existing pin, create new
                        return req.db.from("ResetPins").insert({
                            user_id: user.id,
                            pin_hash: pinHash,
                            is_used: false,
                            expires_at: exp
                        });
                    } else {
                        // Existing pin found, update
                        return req.db.from("ResetPins").where("user_id", "=", user.id).update({
                            pin_hash: pinHash,
                            is_used: false,
                            expires_at: exp
                        });
                    }
                })
                .then(() => {
                    console.log(`Generated PIN for ${username}: ${resetPin}`);
                    res.status(200).json({
                        message: "If an account with that username exists, we have sent a pin to reset the password."
                    });
                })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: true,
                message: "Internal server error"
            });
        });
});


// Reset Password Function
function resetPassword(req, res, next) {
    const username = req.body.username;
    const pin = req.body.pin;
    const newPassword = req.body.newPassword;

    // Verify username, PIN, and new password
    if (!username || !pin || !newPassword) {
        console.log("Request must include username, pin, and new password");
        return res.status(400).json({
            error: true,
            message: "Request must include username, pin, and new password"
        });
    }

    let user = null;
    req.db.from("Users").select("*").where("username", "=", username)
        .then(users => {
            if (users.length === 0) {
                return [];
            }
            user = users[0];
            return req.db.from("ResetPins").select("*").where({
                user_id: user.id,
                is_used: false
            });
        })
        .then(pins => {
            if (!pins.length) {
                console.log("Invalid or expired PIN.");
                return res.status(400).json({ message: "Invalid or expired PIN." });
            }
            const pinRecord = pins[0];
            // Verify the PIN and check expiry
            if (bcrypt.compareSync(pin, pinRecord.pin_hash) && new Date(pinRecord.expires_at) > new Date()) {
                console.log("Valid PIN is provided");
                // Hash the new password and update in the database
                const saltRounds = 10;
                const hash = bcrypt.hashSync(newPassword, saltRounds);
                return req.db.from("Users").where("id", "=", user.id).update({ hash })
                    .then(() => {
                        // After updating the password successfully, mark the PIN as used
                        return req.db.from("ResetPins").where("user_id", "=", user.id).update({ is_used: true });
                    })
                    .then(() => {
                        console.log("Password has been reset successfully.");
                        next();
                    })
            } else {
                console.log("Invalid or expired PIN.");
                res.status(400).json({ message: "Invalid or expired PIN." });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: true,
                message: "Internal server error"
            });
        });
}


// Middleware to clean up used pins
function cleanupUsedPins(req, res, next) {
    req.db.from("ResetPins").where({ is_used: true }).del()
        .then(() => {
            console.log("Used PINs cleaned up successfully.");
            next();
        })
        .catch(err => {
            console.error("Failed to clean up used PINs: ", err);
            next(err);
        });
}


// Reset Password API
router.post('/reset-password', resetPassword, cleanupUsedPins, function(req, res) {
    res.status(200).json({ message: "Password has been reset successfully." });
});


module.exports = router;