import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './route.css';

class NoRouteFound extends Component {


  render() {
    return (
      <div className="grid-container">
        <div className="grid-x grid-padding-x align-center">
          <div className="cell large-8">
            <div id="notfound">
              <div className="notfound">
                <div className="notfound-404">
                  <h1>Oops!</h1>
                  <h2>404 - The Page can't be found</h2>
                </div>
                <Link to="/">Go TO Homepage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoRouteFound;
