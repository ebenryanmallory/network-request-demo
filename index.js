const express = require('express')
const path = require('path')
// Apparently body-parser is included in Express 4+, opportunity to refactor and uninstall module
const bodyParser = require('body-parser')
const formidable = require('formidable')
const PORT = process.env.PORT || 5000

const app = express()

const HTMLObject = { fullwidthCard: `<div class="card col-xs-12"><span class="glyphicon glyphicon-ok"></span><p>Updated card text</p></div>`,
thirdCard: `<div class="card"><span class="glyphicon glyphicon-ok"></span><p>Updated card text</p></div>` };

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .get('/', (req, res) => res.render('pages/index'))
  .use('/api/card', (req, res) => {
    res.json(HTMLObject);
  })
  .post('/api/form', (req, res) => {
    new formidable.IncomingForm().parse(req, (err, fields) => {
      if (err) {
        console.error('Error', err)
        throw err
      }
      if (req) { res.json([HTMLObject, fields]) };
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
