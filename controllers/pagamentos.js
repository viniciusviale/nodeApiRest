/**
 * Created by mathias on 28/02/17.
 */

module.exports = function (app) {

    var validacoes = function (req) {
        req.assert('forma_de_pagamento', 'forma de pagamento é obrigatório').notEmpty();
        req.assert('valor', 'valor é obrigatório e deve ser decimal').notEmpty().isFloat();
        req.assert('moeda', 'Moeda é obrigatória e deve ter 3 caracteres').notEmpty().len(3, 3);

        return req.validationErrors();

    };

    app.get('/pagamentos', function (req, rep) {
        rep.send('oi');
    });

    app.delete('/pagamentos/pagamento/:id', function (req, res) {

        var id = req.params.id;

        var pagamento = {};
        pagamento.status = 'CANCELADO';
        pagamento.id = id;

        var connection = app.persistence.connectionFactory();
        var PagamentoDAO = new app.persistence.PagamentoDAO(connection);

        PagamentoDAO.atualizar(pagamento, function (erro) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            res.status(202).send(pagamento);


        })

        app.put('/pagamentos/pagamento/:id', function (req, res) {
            var id = req.params.id;

            var pagamento = {};
            pagamento.status = 'CONFIRMADO';
            pagamento.id = id;

            var connection = app.persistence.connectionFactory();
            var PagamentoDAO = new app.persistence.PagamentoDAO(connection);

            PagamentoDAO.atualizar(pagamento, function (erro) {
                if (erro) {
                    res.status(500).send(erro);
                    return;
                }
                res.send(pagamento)
            });

        });

        app.post('/pagamentos/pagamento', function (req, res) {

            var erros = validacoes(req);

            if (erros) {
                console.log('Erros de validação');
                res.status(400).send(erros);
                return;
            }
            var pagamento = req.body;
            //req.assert('forma_de_pagamento', 'valor deve existir').notEmpty();
            pagamento.status = "CRIADO";
            pagamento.data = Date.now();

            var connection = app.persistence.connectionFactory();
            var PagamentoDAO = new app.persistence.PagamentoDAO(connection);

            PagamentoDAO.salva(pagamento, function (err, resultado) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.location('/pagamentos/pagamento/' + resultado.insertId);
                    res.status(201).json(resultado);
                }
            });
        });
    });
}
/*
para testar o post, digite no terminal:

 curl http://localhost:5001/pagamentos/pagamento -X POST -v -H "Content-type: application/json" -d '{"nome":"mathias"}'; echo
ou
 curl http://localhost:5001/pagamentos/pagamento -X POST -v -H "Content-type: application/json" -d @arquivo.json; echo

 */