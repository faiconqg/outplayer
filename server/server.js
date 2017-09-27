require('dotenv').config();

const next = require('next');

const loopback = require('loopback');
const boot = require('loopback-boot');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = module.exports = loopback();

app.prepare()
.then(() => {
  server.get('*', (req, res, monther) => {
    if (req.url.indexOf("/api") === 0) {
      return monther();
    } else {
      return handle(req, res);
    }
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
})

server.start = function() {
    return server.listen(server.get('port'), function() {
      server.emit('started');
      var baseUrl = server.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl);
      if (server.get('loopback-component-explorer')) {
        var explorerPath = server.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });
  };

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(server, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    server.start();
})