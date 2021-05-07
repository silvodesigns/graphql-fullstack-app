const { GraphQLServer } = require('graphql-yoga');
const { v4: uuidv4 } = require('uuid');

//Returning array of objects from the query result
const users = [
    {
        id: 1,
        name: 'John',
        age: 30,
        location: {
            state: 'New York',
            city: 'Albany'
        }
    },
    {
        id: 2,
        name: 'Mike',
        age: 35,
        location: {
            state: 'North Karelia',
            city: 'Ylitornio'
        }
    },
    {
        id: 3,
        name: 'Jessica',
        age: 25,
        location: {
            state: 'Roraima',
            city: 'Formosa'
        }
    }
];

// The typeDefs defines the schema of GraphQL which 
// specifies what queries we are providing and the return type of each query.
const typeDefs = `
  type Query {
    name: String!
    age: Int!
    isSingle: Boolean
    numbers: [Int!]!
    location: Location
    users: [Users!]!
  }

  type Location {
    state: String!
    city: String!
  }

  type Users {
      id: ID!
      name: String!,
      age: Int!,
      location: Location
  }

  type Mutation {
      addUser(name: String!, age:Int!): [Users!]!
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
        },
        numbers() {
            return [10, 20, 30, 40];
        },
        location() {
            return {
                state: "Massachusetts",
                city: "Lynn"
            };
        },
        users() {
            return users;
        }
    },
    Mutation: {
        addUser(parent, args, ctx, info) {
            const { name, age } = args;

            users.push({
                id: uuidv4(),
                name,
                age
            });

            return users;
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