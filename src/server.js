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
 *        -d '{"appid":"[appid]"}' \
 *        http://localhost:8080/api/support
 */
.get((req, res) => {
  const options = { id: req.body.appid };
  dbs.fetchAuthSupport(options, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
});

router.route('/jwks')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"[appid]"}' \
 *        http://localhost:8080/api/jwks
 */
.get((req, res) => {
  const options = { id: req.body.appid };
  dbs.fetchAuthJwks(options, (err, objs) => {
    if(err) res.json(err)
    res.json(objs);
  });
});

router.route('/public-keys')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"[appid]","keyid","[keyid]"}' \
 *        http://localhost:8080/api/public-keys/[keyid]
 */
.get((req, res) => {
  const options = { id: req.body.appid, keyid: req.body.keyid };
  dbs.fetchAuthPublicKeys(options, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
});

router.route('/tokens')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"[appid]"}' \
 *        http://localhost:8080/api/tokens
 */
.get((req, res) => {
  const options = { id: req.body.appid };
  dbs.fetchAuthTokens(options, (err, objs) => {
    if(err) res.json(err)
    res.json(objs);
  });
});

router.route('/token')
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X POST \
 *        -d '{"appid":"[appid]","code":"[code]"}' \
 *        http://localhost:8080/api/token
 */
.post((req, res) => {
  const options = { id: req.body.appid, code: req.body.code };
  dbs.createAuthToken(options, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
})
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X GET \
 *        -d '{"appid":"[appid]","code":"[code]"}' \
 *        http://localhost:8080/api/token
 */
.get((req, res) => {
  const options = { id: req.body.appid, code: req.body.code };
  dbs.fetchAuthToken(options, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
})
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X PUT \
 *        -d '{"appid":"[appid]","code":"[code]"}' \
 *        http://localhost:8080/api/token
 */
.put((req, res) => {
  const options = { id: req.body.appid ,code: req.body.code };
  dbs.refreshAuthToken(options, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
})
/*
 * $ curl -H "Accept: application/json" \
 *        -H "Content-type: application/json" \
 *        -X DELETE \
 *        -d '{"appid":"[appid]","code":"[code]"}' \
 *        http://localhost:8080/api/token
 */
.delete((req, res) => {
  const options = { id: req.body.appid, code: req.body.code  };
  dbs.deleteAuthToken(options, (err, obj) => {
    if(err) res.json(err)
    res.json(obj);
  });
});

app.use('/api', router);
app.use(express.static('public'));
app.listen(port);
