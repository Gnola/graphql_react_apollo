// npm i axios, grahql

// DEPENDENCIES //
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');

// Launch SCHEMA
const LaunchType = new GraphQLObjectType({
    name:'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType }
    })
})

// Rocket SCHEMA
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
      // Get ALL Launches
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res => res.data);
            }
        },
      // Get a Single Launch
        launch: {
            type: LaunchType,
            args: {
                flight_number: {type: GraphQLInt} // by FLIGHT NUMBER
            },
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then( res => res.data);
            }
        },
      // Get ALL Rockets
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data);
            }
        },
      // Get a Single Rocket
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLString } // by ID
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                    .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

// http://localhost:5000/graphql --> Graphiql

// Get ALL Launches
  // {
  //   launches {
  //     flight_number
  //     mission_name
  //     launch_year
  //     launch_date_local
  //     launch_success
  //     rocket {
  //       rocket_id
  //       rocket_name
  //       rocket_type
  //     }
  //   }
  // }
// Returns { flight_number, mission_name, launch_year, launch_date_local, launch_success } from ALL Launches + { rocket_id, rocket_name, rocket_type } from Rockets involved in each Launch

// Get a Single Launch by FLIGHT NUMBER
  // {
  //   launch(flight_number:1) {
  //     flight_number
  //     mission_name
  //     launch_year
  //     launch_date_local
  //     launch_success
  //     rocket {
  //       rocket_id
  //       rocket_name
  //       rocket_type
  //     }
  //   }
  // }
// Returns { flight_number, mission_name, launch_year, launch_date_local, launch_success } from Launch + { rocket_id, rocket_name, rocket_type } from Rocket involved in Launch with FLIGHT NUMBER 1

// Get ALL Rockets
  // {
  //   rockets {
  //     rocket_id
  //     rocket_name
  //     rocket_type
  //   }
  // }
// Returns { rocket_id, rocket_name, rocket_type } from ALL Rockets

// Get a Single Rocket by ROCKET ID
  // {
  //   rocket(id: "falcon1") {
  //     rocket_id
  //     rocket_name
  //     rocket_type
  //   }
  // }
// Returns { rocket_id, rocket_name, rocket_type } from Rocket with ID of 'falcon1'

