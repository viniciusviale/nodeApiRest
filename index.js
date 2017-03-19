var app = require('./config/common-express')();

app.listen(5001, function(){
	console.log('servidor rodando');
});
