// server.js
// where your node app starts

// https://stackoverflow.com/questions/7445328/check-if-a-string-is-a-date-value
// init project
var express = require('express');
var app = express();

// https://zellwk.com/blog/local-mongodb/
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));



// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp', (req, res) => {
  let date = new Date(Date.now());
  res.json({ unix: Date.now(), utc: date.toUTCString() })
})


app.get('/api/timestamp/:date_string', (req, res) => {
  let dateparam = req.params.date_string;

  if(/\d{5,}/.test(dateparam)){
    let dateInt = parseInt(dateparam);
    let date = new Date(dateInt)

    res.json({unix : date.getTime(), utc : date.toUTCString()})
  }

  let dateObject = new Date(dateparam);
  
  if(dateObject.toString() === 'Invalid Date'){
    res.json({error : "Invalid Date"})
  }
  else{
    res.json({unix : dateObject.valueOf(), utc : dateObject.toUTCString()})
  }

})



// listen for requests :)
// change the port
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});