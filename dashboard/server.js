const express = require('express');
const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;

app.get('/', (req, res) => res.render('index'));
app.get('/commands', (req, res) => res.render('commands'));
app.get('/login', (req, res) => res.send('This part is still under development'));
app.get('/invite', (req, res)=>{
    console.log('button pressed')
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=789960873203990598&permissions=8&scope=bot');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is live on port ${port}\n`))