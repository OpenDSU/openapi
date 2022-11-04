const express = require('express');
const path = require('path');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const app = express();
const definitions = require("./documents.json");


app.use(express.static("./"));
app.use("/bootstrap", express.static("./node_modules/bootstrap"));
app.get('/openapi/:document', function (req, res) {
    res.sendFile(path.join(__dirname, '/openapi.html'));
});
app.get('/', function (req, res) {
    if (Object.keys(definitions).length > 0) {
        const fallbackDefinition = Object.keys(definitions)[0];
        return res.redirect(301, `/openapi/${fallbackDefinition}`);
    }
    res.status(404).sendFile(path.join(__dirname, "/404.html"))

});

app.use(express.static(pathToSwaggerUi))
app.listen(8090);
