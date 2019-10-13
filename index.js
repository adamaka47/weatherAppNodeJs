const express = require('express');
const app = express();
const weathReq = require('./requests/weathreq')
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(express.static('pub'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (request, response) => {
    response.render('index', {weather: null, error: null})
});

app.post('/', async (request, response) => {
    const { reg } = request.body;
    const { weather, error } = await weathReq(reg)
    response.render('index', {weather, error})
});

app.listen(5500, () => {
    console.log('App server has started on port 5500...');
});