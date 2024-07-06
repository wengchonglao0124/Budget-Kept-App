
module.exports = {
    client: "mysql2",
    connection: {
        host: "localhost",
        database: "budgetKeeper",
        user: "root",
        password: process.env.SQL_PASSWORD,
    },
};
