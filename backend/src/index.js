const http = require('http');
const app = require('./app');
const { initSocket } = require('./sockets/socketManager');
const logger = require('./utils/logger');
require('./events/listeners/orderListener'); // Load listeners

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
