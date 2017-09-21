const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');
const  axios = require('axios');
const customer = [
	{id:'1', name:'Rishab'},
	{id:'2', name:'Mehra'}
];

const CustomerType = new GraphQLObjectType({
	name : 'Customer',
	fields:() => ({
		id : { type : GraphQLString	},
		name: { type: GraphQLString }
	})
})
const rootQuery = new GraphQLObjectType({
	name : 'RootQueryType',
	fields:{
			customer : {
			type : CustomerType,
			args : {
				id : {type : GraphQLString}
			},
			resolve(parentValue, args){
				// for(let i=0;i<=customer.length; i++){
				// 	if(customer[i].id === args.id){
				// 		return customer[i];
				// 	}
				// }
				return axios.get('http://localhost:3000/customers/'+args.id).then(res=> res.data);
			}
		},
		customers:{
			type : new GraphQLList(CustomerType),
			resolve(){
				return axios.get('http://localhost:3000/customers/').then(res=> res.data);
			}
		}
	}
})
module.exports = new GraphQLSchema({
	query:rootQuery
});