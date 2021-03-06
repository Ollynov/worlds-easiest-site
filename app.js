const { PORT = 3001 } = process.env
const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

// var shell = require('shelljs');
var shell = require('child_process');
// shell.exec('echo chiiii')


app.use('/', express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json());

function buildHtml(name, description, image) {

    return `<!DOCTYPE html> 
    <html lang="en-US"> 
      <head> 
        <meta charset="UTF-8"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <title>Creative CV</title> 
        <meta name="description" content="Creative CV is a HTML resume template for professionals. Built with Bootstrap 4, Now UI Kit and FontAwesome, this modern and responsive design template is perfect to showcase your portfolio, skils and experience."/> 
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet"> 
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet"> 
        <link href="css/aos.css" rel="stylesheet"> 
        <link href="css/bootstrap.min.css" rel="stylesheet"> 
        <link href="styles/main.css" rel="stylesheet"> 
      </head> 
      <body id="top"> 
        <header> 
          <div class="profile-page sidebar-collapse"> 
            <nav class="navbar navbar-expand-lg fixed-top navbar-transparent bg-primary" color-on-scroll="400"> 
              <div class="container"> 
                <div class="navbar-translate"><a class="navbar-brand" href="#" rel="tooltip">Creative CV</a> 
                  <button class="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-bar bar1"></span><span class="navbar-toggler-bar bar2"></span><span class="navbar-toggler-bar bar3"></span></button> \
                </div> 
                <div class="collapse navbar-collapse justify-content-end" id="navigation"> 
                  <ul class="navbar-nav"> 
                    <li class="nav-item"><a class="nav-link smooth-scroll" href="#about">About</a></li> 
                    <li class="nav-item"><a class="nav-link smooth-scroll" href="#skill">Skills</a></li> 
                    <li class="nav-item"><a class="nav-link smooth-scroll" href="#portfolio">Portfolio</a></li> 
                    <li class="nav-item"><a class="nav-link smooth-scroll" href="#experience">Experience</a></li> 
                    <li class="nav-item"><a class="nav-link smooth-scroll" href="#contact">Contact</a></li> 
                  </ul> 
                </div> 
              </div> 
            </nav> 
          </div> 
        </header> 
        <div class="page-content"> 
          <div>
    <div class="profile-page"> 
      <div class="wrapper"> 
        <div class="page-header page-header-small" filter-color="green"> 
          <div class="page-header-image" data-parallax="true" style="background-image: url('images/cc-bg-1.jpg');"></div> 
          <div class="container"> 
            <div class="content-center"> 
              <div class="cc-profile-image"><a href="#"><img src="${image}" alt="Image"/></a></div>
              <div class="h2 title">${name}</div>
              <p class="category text-white">Web Developer, Graphic Designer,  Photographer</p><a class="btn btn-primary smooth-scroll mr-2" href="#contact" data-aos="zoom-in" data-aos-anchor="data-aos-anchor">Hire Me</a><a class="btn btn-primary" href="#" data-aos="zoom-in" data-aos-anchor="data-aos-anchor">Download CV</a>
            </div>
          </div>
          <div class="section">
            <div class="container">
              <div class="button-container"><a class="btn btn-default btn-round btn-lg btn-icon" href="#" rel="tooltip" title="Follow me on Facebook"><i class="fa fa-facebook"></i></a><a class="btn btn-default btn-round btn-lg btn-icon" href="#" rel="tooltip" title="Follow me on Twitter"><i class="fa fa-twitter"></i></a><a class="btn btn-default btn-round btn-lg btn-icon" href="#" rel="tooltip" title="Follow me on Google+"><i class="fa fa-google-plus"></i></a><a class="btn btn-default btn-round btn-lg btn-icon" href="#" rel="tooltip" title="Follow me on Instagram"><i class="fa fa-instagram"></i></a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section" id="about">
      <div class="container">
        <div class="card" data-aos="fade-up" data-aos-offset="10">
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="card-body">
                <div class="h4 mt-0 title">About</div>
                <p>Hello! I am ${name}. ${description}</p>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        <script src="js/core/jquery.3.2.1.min.js"></script>
        <script src="js/core/popper.min.js"></script>
        <script src="js/core/bootstrap.min.js"></script>
        <script src="js/now-ui-kit.js?v=1.1.0"></script>
        <script src="js/aos.js"></script>
        <script src="scripts/main.js"></script>
      </body>
    </html>`;
};

app.post('/newProfile', (req, res, next) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.photo
    console.log('hitting endpoint with body: ', req.body);
    // http.createServer(function () {
    //     res.write('<html><head></head><body>');
    //     res.write(`<p>The website of the famous: ${req.body.name}</p>`);
    //     res.end('</body></html>');
    // }).listen(1337);
    // const newApp = express();
    // newApp.get('/', (request, response) => response.status(200).send('new website with: ' + name))
    // newApp.listen(3002, () => console.log('app listening on port 3002!'))
    

    var fileName = './styled-v1/index.html';
    var stream = fs.createWriteStream(fileName);

    stream.once('open', function(fd) {
        var html = buildHtml(name, description, image);
        console.log('our built html: ', html)
        stream.end(html);
    });

    setTimeout(function() {
        shell.exec("up", {cwd: '/Users/Aljosha.novakovic@ibm.com/Dev/worlds-easiest-site/styled-v1'}, function(error,stdout,stderr){
            console.log('Exit code:', error);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
        });
    }, 5000)
    
    setTimeout(function(){ 
        shell.exec("up url", {cwd: '/Users/Aljosha.novakovic@ibm.com/Dev/worlds-easiest-site/styled-v1'}, function(error,stdout,stderr){
            console.log('Exit code:', error);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            
        });
     }, 12000);

})

app.listen(PORT, () => console.log('app listening on port 3001!'))