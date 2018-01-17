const restify = require('restify');
const marklogic = require('marklogic');
const corsMiddleware = require('restify-cors-middleware');
const settings = require('./settings');


const db = marklogic.createDatabaseClient(settings.options.database);
const qb = marklogic.queryBuilder;
const server = restify.createServer();

const cors = corsMiddleware({
  origins: settings.options.rest.whitelist,
});

server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

server.get('/api/characters', (request, response) => {
  db.documents.query(
    qb.where(
      qb.collection('characters')
    ).slice(0, 100)
  ).result()
  .then(documents => response.json(documents))
  .catch(error => console.error(error));
});

server.get('/api/characters/:name', (request, response) => {
  const name = request.params.name;
  const uri = `/characters/${name}`;
  db.documents.read(uri).result()
  .then(document => response.json(document[0]))
  .catch(error => console.error(error));
});

server.get('/image/:name', (request, response) => {
  const data = [];
  const uri = request.url;
  db.documents.read(request.url).stream('chunked')
  .on('data', chunk => data.push(chunk))
  .on('error', error => console.error(error))
  .on('end', () => {
    let buffer = new Buffer(data.length).fill(0);
    buffer = Buffer.concat(data);
    response.writeHead(200, { 'Content-type': 'image/png' });
    response.end(buffer);
  });
});

server.post('/api/search/', (request, response) => {
  const term = request.body;
  db.documents.query(
    qb.where(
      qb.collection('characters'),
      qb.parsedFrom(term)
    ).slice(0, 100)
  ).result()
  .then(searchResults => response.json(searchResults))
  .catch(error => console.error(error));
})

server.listen(settings.options.rest.port, () => console.info(`Server is up on ${settings.options.rest.port}.`));