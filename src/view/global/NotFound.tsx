import React from 'react';
import { Link } from 'react-router-dom';
class NotFound extends React.Component{
    render(){
        return <div>
            <p>Not found pages</p>
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
    }
}
export default NotFound;