const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public/assets"));

require('./assets/routes/apiRoutes')(app);
require('./assets/routes/htmlRoutes')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });