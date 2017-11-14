import express from 'express';
import bodyParser from 'body-parser';
import dbs from '../utils/dbsutils';
const app = express();
const port = process.env.PORT || 8081
const router = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use((res, req, cbk) => {
  console.log('header:', res.headers);
  console.log('body:', res.body);
  cbk();
});

router.get('/', (req, res) => {
  res.json({ message: 'Successfully Posted a test message.' });
});

router.route('/tokens')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X POST \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/tokens
 */
.post((req, res) => {
  const client = { id: req.body.appid };
  dbs.createToken(client, (err, obj) => {
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
  const client = { id: req.body.appid };
  dbs.fetchTokens(client, (err, objs) => {
    if(err) res.json(err)
    res.json(objs);
  });
});

router.route('/tokens/:code')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/tokens/[code]
 */
.get((req, res) => {
  const client = { id: req.body.appid, code: req.params.code };
  dbs.fetchToken(client, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
})
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X PUT \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/tokens/[code]
 */
.put((req, res) => {
  const client = { id: req.body.appid ,code: req.params.code };
  dbs.refreshToken(client, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
})
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X DELETE \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/tokens/[code]
 */
.delete((req, res) => {
  const client = { id: req.body.appid, code: req.params.code  };
  dbs.deleteToken(client, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
});

app.use('/api', router);
app.use(express.static('public'));
app.listen(port);
