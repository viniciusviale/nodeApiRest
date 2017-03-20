/**
 * Created by mathias on 19/03/17.
 */
var restify = require('restify');

function  CartoesClient() {
    this._client = restify.createJSONClient({
        url:'http://localhost:3001',
        version:'~1.0'
    });
}

CartoesClient.prototype.autoriza = function (cartao, callback) {
    this._client.post('/cartoes/autoriza', cartao, callback);
};

module.exports = function () {
    return CartoesClient;
}