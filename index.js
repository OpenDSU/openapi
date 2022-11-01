const express = require('express');
const path = require('path');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const app = express();


app.use(express.static("./"));
app.use("/bootstrap", express.static("./node_modules/bootstrap"));
app.get('/openapi/:document', function(req, res) {
    res.sendFile(path.join(__dirname, '/openapi.html'));
});
app.get('/', function(req, res) {
    res.redirect(301, '/openapi/anchoring');
});

app.use(express.static(pathToSwaggerUi))
app.listen(8090);
