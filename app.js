const { PORT = 3001 } = process.env
const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser');
var http = require('http');
// var shell = require('shelljs');
var shell = require('child_process');
// shell.exec('echo chiiii')


app.use('/', express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json());

app.post('/newProfile', (req, res, next) => {
    const name = req.body.name
    console.log('hitting endpoint with body: ', req.body);
    // http.createServer(function () {
    //     res.write('<html><head></head><body>');
    //     res.write(`<p>The website of the famous: ${req.body.name}</p>`);
    //     res.end('</body></html>');
    // }).listen(1337);
    const newApp = express();
    newApp.get('/', (request, response) => response.status(200).send('new website with: ' + name))
    newApp.listen(3002, () => console.log('app listening on port 3002!'))
    //shell.exec('cd /Users/Aljosha.novakovic@ibm.com/Dev/worlds-easiest-site/simpleSite')
    // shell.exec('cd /Users/Aljosha.novakovic@ibm.com/Dev/worlds-easiest-site/simpleSite', (code, stdout, stderr) => {
    // shell.exec('cd /Users/Aljosha.novakovic@ibm.com/Dev/worlds-easiest-site/simpleSite', (error, stdout, stderr) => {
    //     console.log('Exit code:', error);
    //     console.log('Program output:', stdout);
    //     console.log('Program stderr:', stderr);
        
        
    //     //shell.exec('up')
    //     //shell.exec('up url --open')
    //   });
    //shell.execSync('echo chiiii')
    // shell.exec('up')
    // shell.exec('up url --open')
    shell.exec("up", {cwd: '/Users/Aljosha.novakovic@ibm.com/Dev/worlds-easiest-site/simpleSite'}, function(error,stdout,stderr){
        console.log('Exit code:', error);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
        
    });
    setTimeout(function(){ 
        shell.exec("up url", {cwd: '/Users/Aljosha.novakovic@ibm.com/Dev/worlds-easiest-site/simpleSite'}, function(error,stdout,stderr){
            console.log('Exit code:', error);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            
        });
     }, 10000);

})

app.listen(PORT, () => console.log('app listening on port 3001!'))