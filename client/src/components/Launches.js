// npm i graphql-tag, react-apollo

// DEPENDENCIES //
import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag'; // from graphql
import { Query } from 'react-apollo'; // Component takes in prop of query and arrow function

// COMPONENTS & ASSETS //
import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'

// QUERY made with GQL --> Define query schema (from schema.js) and data wanted
const LAUNCHES_QUERY = gql`
query LaunchesQuery {
    launches {
        flight_number
        mission_name
        launch_date_local
        launch_success
    }
  }
`;
// Gets ALL Launches and their data

export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-5 my-3">Launches</h1>
        <MissionKey />
        <Query query={LAUNCHES_QUERY}>
          {
            ({ loading, error, data}) => {
              if (loading) return <h4>Loading...</h4>
              if (error) console.log(error);
              return <Fragment>
                {
                  data.launches.map(launch => (
                    <LaunchItem key={launch.flight_number} launch={launch} />
                  ))
                }
              </Fragment>
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default Launches;
