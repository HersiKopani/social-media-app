const {ApolloServer} = require ('apollo-server'); 
const gql = require('graphql-tag');
const mongoose = require('mongoose')

    const typeDefs = gql`
    type Query{
            sayHi: String!
        }
    `;
    
     

    const resolvers = {
        Query:{
            sayHi: () => 'Hello world'
        }
    };

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({port:5000})
.then(res=> {
        console.log(`Server runnign at ${res.url}`)
    })

