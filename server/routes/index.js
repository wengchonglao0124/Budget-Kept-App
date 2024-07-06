var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const authorize = (req, res, next) => {
  const authorization = req.headers.authorization;
  let token = null;

  // Retrieve token
  if (authorization && authorization.split(" ").length === 2) {
    token = authorization.split(" ")[1];
    console.log("Token is retrieved");
  } else {
    console.log("Unauthorised user");
    res.status(401).json({ error: true, message: "Unauthorised" });
    return;
  }

  // Verify JWT and check expiration date
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.exp < Date.now()) {
      console.log("Token has expired");
      res.status(401).json({ error: true, message: "Token has expired" });
      return;
    }

    console.log("Token is verified");
    req.username = decoded.username;
    // Permit user to advance to route
    next();
  } catch (err) {
    console.log("Token is not valid: ", err);
    res.status(401).json({ error: true, message: err })
  }
}


router.get('/verify-token', authorize, function(req, res, next) {
    res.status(200).json({ error: false, message: "Token is verified" });
});


const retrieveUserId = (req, res, next) => {
  const username = req.username;

  // Verify body
  if (!username) {
    console.log("Request body incomplete - username is not defined");
    // HTTP 400 Bad Request
    res.status(400).json({
      error: true,
      message: "Request body incomplete - username is not defined"
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
          return;
        }
        const user_id = users[0].id;
        req.user_id = user_id;
        next();
      })
}


router.get("/transactions", [authorize, retrieveUserId], function(req, res) {
    const userId = req.user_id;

    req.db.from('Transactions').where({user_id: userId}).select('id', 'date', 'type', 'amount', 'category', 'description')
        .orderBy([
            { column: 'date', order: 'desc' }, // Adjusted to sort by date in ascending order
            { column: 'id', order: 'desc' }    // Additionally sort by id in ascending order
        ])
        .then((transactions) => {
            if (transactions.length === 0) {
                console.log("No transactions for this user yet");
                res.status(200).json({
                    error: false,
                    transactions: []
                });
                return;
            }
            console.log("Transactions have been retrieved and sorted by date and ID");
            res.status(200).json({
                error: false,
                transactions: transactions
            });
        })
        .catch((en) => {
            console.error('Error fetching transactions:', err);
            res.status(500).json({
                error: true,
                message: 'An error occurred while fetching transactions'
            });
        });
});


const addTransaction = (req, res, next) => {
    const userId = req.user_id;
    const { type, amount, category, description, date } = req.body;

    // Validate the necessary fields
    if (!type || !amount) {
        return res.status(400).json({
            error: true,
            message: "Missing required transaction fields (type and amount are required)."
        });
    }

    // Obtain the highest numerical ID from Transactions, assuming IDs as strings with leading zeros
    req.db.from('Transactions').orderBy('id', 'desc').first()
        .then(result => {
            let newId;
            if (result && result.id) {
                const numericId = parseInt(result.id.substring(0, 8)) + 1;
                newId = String(numericId).padStart(8, '0');
            } else {
                newId = "00000001";
            }

            // Define the transaction object to be inserted
            const newTransaction = {
                id: newId,
                user_id: userId,
                type,
                amount,
                category: category || 'Uncategorized',
                date: new Date(date) || new Date(),
                description: description || ''
            };

            // Insert the new transaction into the database
            return req.db('Transactions').insert(newTransaction);
        })
        .then(() => {
            console.log('Transaction added successfully.');
            req.updateAmount = type === 'income' ? +amount : -amount;
            next();
        })
        .catch((err) => {
            console.error('Error adding transaction:', err);
            res.status(500).json({
                error: true,
                message: 'Failed to add transaction'
            });
        });
}


const getBalance = (req, res, next) => {
    const userId = req.user_id;
    req.db.from('UserFinancials').where({user_id: userId}).select('current_balance')
        .then((result) => {
            if (result.length === 0) {
                console.log("Balance not found for this user.");
                res.status(404).json({
                    error: true,
                    message: 'User balance not found'
                });
                return;
            }
            console.log("Current balance has been retrieved.");
            req.balance = parseFloat(result[0].current_balance);
            next();
        })
        .catch((err) => {
            console.error('Error fetching current balance:', err);
            res.status(500).json({
                error: true,
                message: 'An error occurred while fetching the current balance'
            });
        });
}


const updateBalance = (req, res, next) => {
    const userId = req.user_id;
    const current_balance = req.balance;
    const updateAmount = req.updateAmount;
    const newBalance = current_balance + updateAmount;
    req.db.from('UserFinancials').where({user_id: userId}).update({current_balance: newBalance})
        .then(() => {
            console.log('Update balance successfully.');
        })
        .catch((err) => {
            console.error('Error updating balance: ', err);
            res.status(500).json({
                error: true,
                message: 'Failed to update balance'
            });
        });
    next();
}


router.post("/add-transaction", [authorize, retrieveUserId, addTransaction, getBalance, updateBalance], function(req, res) {
    res.status(201).json({
        error: false,
        message: 'Transaction successfully added'
    });
});


router.get("/balance", [authorize, retrieveUserId, getBalance], function(req, res) {
  res.status(200).json({
    error: false,
    current_balance: req.balance,
      username: req.username,
  });
});


const removeTransaction = (req, res, next) => {
    const userId = req.user_id;
    const transactionId = req.body.transactionId;

    // Validate the necessary fields
    if (!transactionId) {
        console.log("Transaction id is required.");
        return res.status(400).json({
            error: true,
            message: "Transaction id is required."
        });
    }

    // Check if the transaction exists and belongs to the user
    req.db.from('Transactions').where({id: transactionId, user_id: userId}).first()
        .then((transaction) => {
            if (!transaction) {
                // No transaction found or not owned by the user
                console.log("No transaction found or not authorised to delete this transaction");
                res.status(404).json({
                    error: true,
                    message: "Transaction not found or not authorised"
                });
                return false;
            }
            const amount = -transaction.amount;
            req.updateAmount = transaction.type === 'income' ? amount : -amount;
            // Proceed with deletion
            return req.db.from('Transactions').where({id: transactionId}).del();
        })
        .then((delResult) => {
            if (!delResult) {
                return;
            }
            next();
        })
        .catch((err) => {
            console.error("Error deleting transaction:", err);
            res.status(500).json({
                error: true,
                message: "An error occurred while deleting the transaction"
            });
        });
}


router.delete("/remove-transaction", [authorize, retrieveUserId, removeTransaction, getBalance, updateBalance], function(req, res) {
    console.log("Transaction deleted successfully");
    res.status(200).json({
        error: false,
        message: "Transaction successfully deleted"
    });
});


const updateTransaction = (req, res, next) => {
    const userId = req.user_id;
    const { transactionId, type, amount, category, description, date } = req.body;

    // Validate the necessary fields
    if (!transactionId || !type || !amount) {
        console.log("Missing required transaction fields (transactionId, type and amount are required).");
        return res.status(400).json({
            error: true,
            message: "Missing required transaction fields (transactionId, type and amount are required)."
        });
    }

    // Check if the transaction exists and belongs to the user
    req.db.from('Transactions').where({ id: transactionId, user_id: userId }).first()
        .then(transaction => {
            if (!transaction) {
                res.status(404).json({
                    error: true,
                    message: "Transaction not found or you do not have permission to edit this transaction."
                });
                return false;
            }

            // Prepare the update object
            const updateData = {};
            updateData.type = type;
            updateData.amount = amount;
            if (category) updateData.category = category;
            updateData.date = new Date(date) || new Date();
            if (description) updateData.description = description;

            const oldAmount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
            const newAmount = type === 'income' ? amount : -amount;
            req.updateAmount = newAmount - oldAmount;
            // Perform the update
            return req.db.from('Transactions').where({ id: transactionId }).update(updateData);
        })
        .then((updateResult) => {
            if (updateResult) {
                next()
            }
        })
        .catch(err => {
            console.error('Error updating transaction:', err);
            res.status(500).json({
                error: true,
                message: 'Failed to update transaction due to an internal error'
            });
        });
}


router.put("/update-transaction", [authorize, retrieveUserId, updateTransaction, getBalance, updateBalance], (req, res) => {
    res.status(200).json({
        error: false,
        message: 'Transaction updated successfully'
    });
});


module.exports = router;
