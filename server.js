const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const schema = require('./schema.js')
app.use('/graphiql', expressGraphQL({
	schema : schema,
	graphiql : true
}));
app.listen(4000, () => {
	console.log('server is runing on 4000');
});