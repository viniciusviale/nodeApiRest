/**
 * Created by mathias on 28/02/17.
 */

var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {
    var app = express();

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    consign()
        .include('controllers')
        .then('persistence')
        .then('servicos')
        .into(app);

    // var home = require('../controllers/home.js')(app);
    // var pagamentos = require('../controllers/pagamentos.js')(app);

    // app.use(function (req, res, next) {
    //     res.status(404).send('erro, essa pagina nao existe');
    //     next();
    // });

    return app;
};

/*
 consign()
     .include('controllers')
     .into(app);

Esse código é um middleware usado pelo express para carregar automaticamente
todos os arquivos que estão na pasta /controllers. Caso eu não usar esse middleware
e mesmo assim quiser isolar as configurações das rotas eu teria que colocar em prática
o common.js, sendo assim precisaria fazer esse código aqui logo após a criação da variavel
app:

 var home = require('../controllers/home.js')(app);
 var pagamentos = require('../controllers/pagamentos.js')(app);

para cada rota que eu criasse eu teria que fazer essa configuração. Repara que eu estou
fazendo um monte de coisas na funcao app.


 */