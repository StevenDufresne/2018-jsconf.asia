const marklogic = require('marklogic');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  origins: ['http://localhost:4200'],
});

const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

const db = marklogic.createDatabaseClient({
  host: '52.211.64.104',
  port: 8000,
  user: 'meetup-user',
  password: 'm33tup',
});

const qb = marklogic.queryBuilder;

server.get('/api/characters', (req, res) => {
  db.documents.query(
    qb.where(qb.collection('characters')).slice(0, 60)).result()
      .then(documents => res.json(documents))
      .catch(error => console.error(error)
  );
})

server.get('/api/characters/:name', (req, res) => {
  const uri = `/characters/${req.params.name}`;

  db.documents.read(uri).result()
    .then(doc => res.json(doc[0]))
    .catch(error => console.error(error));
})

server.get('/image/:name', (request, response) => {
  const data = [];
  const uri = request.url;
  db.documents.read(uri).stream('chunked')
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


server.listen(3002, () => console.info('Server online'));