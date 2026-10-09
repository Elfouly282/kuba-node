
const mongoose = require('mongoose');

const dbConnection = () => {
    console.log('DB CONNECTION FUNCTION STARTED');
    console.log('DB_URI exists:', Boolean(process.env.DB_URI));

    if (!process.env.DB_URI) {
        console.error('DB_URI is missing');
        return;
    }

    mongoose
        .connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 10000,
        })
        .then(() => {
            console.log('MONGODB CONNECTED SUCCESSFULLY');
        })
        .catch((error) => {
            console.error(
                'MONGODB CONNECTION FAILED:',
                error.stack || error
            );
        });

    console.log('MONGOOSE CONNECT CALL COMPLETED');
};

module.exports = dbConnection;
