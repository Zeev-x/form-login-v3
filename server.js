const server = require('./app');
const config = require('./config/config.json');

const port = config.port;

// Jalankan server
server.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
