// npm i classnames, moment, react-moment, react-router-dom

// DEPENDENCIES //
import React from 'react';
import classNames from 'classnames'; // Conditional ClassNames
import Moment from 'react-moment'; // Re-format Date
import { Link } from 'react-router-dom'; // Link(s) to React Route

export default function LaunchItem( { launch : {flight_number, mission_name, launch_date_local, launch_success} } ) { // Destructured from Launch props coming from Launches Component
  
  return (
    <div className='card card-body mb-3'>
      <div className="row">
        <div className="col-md-9">
          <h4>Mission: <span className={classNames({
            'text-success': launch_success,
            'text-danger': !launch_success
          })}>{mission_name}</span></h4>
          <p> 
            Date: <Moment format='YYYY-MM-DD HH:mm'>{launch_date_local}</Moment>
          </p>
        </div>
        <div className="col-md-3">
          <Link to={`/launch/${flight_number}`} className='btn btn-secondary'>Launch Details</Link>
        </div>
      </div>
    </div>
  )
}
