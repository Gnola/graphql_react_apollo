// npm i express, express-graphql, cors, concurrently

const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

// Bring in SCHEMA
const schema = require('./schema.js');

// Use Express
const app = express();

// Use CORS
app.use(cors())

// Set up 'graphql' endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

// Set up Port
const PORT = process.env.PORT || 5000

// Run Express
app.listen(PORT, () => console.log(`server started on ${PORT}`))

// npm run dev

// http://localhost:3000/ --> Client Homepage
// http://localhost:5000/graphql --> Graphiql
// https://api.spacexdata.com/v3/launches --> Launches API
// https://api.spacexdata.com/v3/rockets --> Rockets API