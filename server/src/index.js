const { GraphQLServer } = require('graphql-yoga');


// The typeDefs defines the schema of GraphQL which 
// specifies what queries we are providing and the return type of each query.
const typeDefs = `
  type Query {
    name: String!
    age: Int!
    isSingle: Boolean
  }
`;

// Then we added resolvers which provide the implementation for those queries
const resolvers = {
    Query: {
        name() {
            return 'Dan';
        },
        age() {
            return 50;
        },
        isSingle() {
            return null;
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

const options = {
    port: 4000,
    endpoint: '/graphql'
};

server.start(options, ({ port }) =>
    console.log(`server started on port ${port}.`)
);