const express = require('express');
const app = express()

app.use(express.static(`public`));
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.get('/commands', (req, res) => res.sendFile(__dirname + '/commands.html'));

app.get('/invite', (req, res) => {
    console.log('button pressed')
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=789960873203990598&permissions=8&scope=bot');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is live on port ${port}\n`))