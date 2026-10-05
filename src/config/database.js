const dns = require('dns');
const mongoose = require('mongoose');

/**
 * Some Windows/ISP resolvers refuse Node's querySrv for mongodb+srv.
 * Prefer public DNS so Atlas SRV lookup works reliably.
 */
const ensureDns = () => {
  try {
    const servers = dns.getServers();
    if (!servers.includes('8.8.8.8') && !servers.includes('1.1.1.1')) {
      dns.setServers(['8.8.8.8', '1.1.1.1', ...servers]);
    }
  } catch (_) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }
};

const dbConnection = () => {
  if (mongoose.connection.readyState !== 0) return;

  ensureDns();

  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => console.error('MongoDB connection error:', err));
};

module.exports = dbConnection;
module.exports.ensureDns = ensureDns;
