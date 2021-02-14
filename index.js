const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDb Connected');
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server runnign at ${res.url}`)
    })




