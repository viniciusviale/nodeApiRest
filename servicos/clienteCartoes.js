/**
 * Created by mathias on 19/03/17.
 */

var restify = require('restify');

var cliente = restify.createJSONClient({
    url:'http://localhost:3001'
});

cliente.post('/cartoes/autoriza', function (erro, req, res, retorno) {
   console.log('consumindo serviço de cartões');
   console.log(retorno);
});