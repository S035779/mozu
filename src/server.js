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

router.route('/support')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/support
 */
.get((req, res) => {
  const client = { id: req.body.appid };
  dbs.fetchAuthSupport(client, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
});

router.route('/jwks')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/jwks
 */
.get((req, res) => {
  const client = { id: req.body.appid };
  dbs.fetchAuthJwks(client, (err, objs) => {
    if(err) res.json(err)
    res.json(objs);
  });
});

router.route('/public-keys/:keyid')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/public-keys/[keyid]
 */
.get((req, res) => {
  const client = { id: req.body.appid, keyid: req.params.keyid };
  dbs.fetchAuthPublicKeys(client, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
});

router.route('/token')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X POST \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/token
 */
.post((req, res) => {
  const client = { id: req.body.appid };
  dbs.createAuthToken(client, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
})
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/token
 */
.get((req, res) => {
  const client = { id: req.body.appid };
  dbs.fetchAuthTokens(client, (err, objs) => {
    if(err) res.json(err)
    res.json(objs);
  });
});

router.route('/token/:code')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"watch_note!"}' \
 *        http://localhost:8080/api/token/[code]
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
 *        http://localhost:8080/api/token/[code]
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
 *        http://localhost:8080/api/token/[code]
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
