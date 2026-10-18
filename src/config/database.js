const dns = require('dns');
const mongoose = require('mongoose');

// Resolve MongoDB SRV records via Google & Cloudflare DNS (fixes querySrv ECONNREFUSED)
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
    console.warn('Could not set custom DNS servers:', e.message);
}

const dbConnection = () => {
    console.log('DB CONNECTION FUNCTION STARTED');
    console.log('DB_URI exists:', Boolean(process.env.DB_URI));

    const targetUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/kuba';

    mongoose
        .connect(targetUri, {
            serverSelectionTimeoutMS: 5000,
        })
        .then(() => {
            console.log('MONGODB CONNECTED SUCCESSFULLY TO:', targetUri.includes('@') ? 'MongoDB Atlas (Cloud)' : targetUri);
        })
        .catch((error) => {
            console.error('PRIMARY MONGODB CONNECTION FAILED:', error.message || error);

            // If Atlas failed, try fallback to Local MongoDB
            if (targetUri.includes('mongodb+srv://') || targetUri !== 'mongodb://127.0.0.1:27017/kuba') {
                const localUri = 'mongodb://127.0.0.1:27017/kuba';
                console.log('ATTEMPTING FALLBACK TO LOCAL MONGODB:', localUri);

                mongoose
                    .connect(localUri, {
                        serverSelectionTimeoutMS: 3000,
                    })
                    .then(() => {
                        console.log('MONGODB CONNECTED SUCCESSFULLY TO LOCAL DATABASE:', localUri);
                    })
                    .catch((localErr) => {
                        console.warn('LOCAL MONGODB ALSO UNAVAILABLE:', localErr.message);
                        console.log('NOTICE: Server is still active. Local Admin Login is available without database dependency.');
                    });
            }
        });

    console.log('MONGOOSE CONNECT CALL COMPLETED');
};

module.exports = dbConnection;
