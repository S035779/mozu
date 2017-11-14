import express from 'express';
import bodyParser from 'body-parser';
import std from '../utils/stdutils';
const app = express();
const port = process.env.PORT || 8081
const router = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use((res, req, cbk) => {
  console.log('Header:', res.headers);
  console.log('Body:', res.body);
  cbk();
});

router.get('/', (req, res) => {
  res.json({ message: 'Successfully Posted a test message.' });
});

router
  .route('/tokens')
  /*
   * $ curl -H "Accept: application/json" \
   *        -H "Content-type: application/json" \
   *        -X POST \
   *        -d '{"appid":"watch_note!"}' \
   *        http://localhost:8080/api/tokens
   */
  .post((req, res) => {
    const client = { appid: req.body.appid };
    refreshToken(client, (err, obj) => {
      if(err) res.json(err)
      res.json(obj);
    });
  })
  /*
   * $ curl -H "Accept: application/json" \
   *        -H "Content-type: application/json" \
   *        -X GET \
   *        -d '{"appid":"watch_note!"}' \
   *        http://localhost:8080/api/tokens
   */
  .get((req, res) => {
    const client = { appid: req.body.appid };
    fetchTokens(client, (err, objs) => {
      if(err) res.json(err)
      res.json(objs);
    });
  });

router
  .route('/tokens/:code')
  .get((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {});

app.use('/api', router);
app.use(express.static('public'));
app.listen(port);

let tokens = [];
const appid = 'watch_note!'
const fetchTokens = (client, callback) => {
  if(client.appid !== appid) {
    callback({error: 'Unknown AppID!!'}); 
    return;
  }
  callback(null, tokens)
};
const refreshToken = (client, callback) => {
  if(client.appid !== appid) {
    callback({error: 'Unknown AppID!!'}); 
    return;
  }
  const newToken = {
    code:       std.makeRandStr(4)
    , token:    std.makeRandStr(8)
    , id_token: std.makeRandStr(16)
  };
  if(tokens.find(obj => obj.code === client.code)) {
    tokens = tokens.map(obj =>
      obj.code === newToken.code ? newToken : obj);
  } else {
    tokens.push(newToken);
  }
  callback(null, newToken);
};
