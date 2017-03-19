/**
 * Created by mathias on 28/02/17.
 */
function PagamentoDAO(connection) {
    this._connection = connection;
}

PagamentoDAO.prototype.salva = function (pagamento, callback) {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
};

PagamentoDAO.prototype.atualizar = function (pagamento, callback) {
    this._connection.query('UPDATE pagamentos SET status = ? WHERE id = ?', [pagamento.status, pagamento.id], callback);
};

PagamentoDAO.prototype.lista = function (callback) {
    this._connection.query('SELECT * FROM pagamentos', callback);
};

PagamentoDAO.prototype.buscaPorID = function (id, callback) {
    this._connection.query('SELECT * FROM pagamentos WHERE id = ? ', id, callback)
};

module.exports = function () {
    return PagamentoDAO;
};