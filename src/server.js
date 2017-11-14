import express from 'express';
const app = express();

//app.get('/', (req, res) => res.send('WatchNote!'));
app.use(express.static('public'));
app.listen(8081);
