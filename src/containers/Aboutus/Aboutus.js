import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Aboutus extends Component {


  render() {
    return (
      <main>
        <section className="page-heading-breadcrumb-section">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active"><Link to="#">About us</Link></li>
              </ol>
            </nav>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card mt-4 mb-4">
                <div className="card-body">

                  <section className="section-default-padding" id="landing-page-banner">
            <div className="row">
							<div className="col-md-12">
                <p>Linked Advance Helper is a LinkedIn automation tool designed and developed to automate the lead generation process. This is developed to help businesses, start-ups, recruiters to find with their prospects. Adding this tool to your Lead generation process will not only ease finding the potential leads but also will direct you in a way to enter the market and connect with the people who are not already in your network.</p>

                <p>Linked Advance Helper is born out of necessity; there was a time when the sales team used to find the prospect manually. They used to set targeted audiences manually, send invitations to each and everyone, take follow-ups and manage their details in the database. Then we came up with an idea to build Linked Advance Helper for automating and easing the lead generation process. It’s easy to find, reach, connect, and make prospects engaged with Linked Advance Helper. Here are uses of Linked Advance Helper</p>

                <p>The startup can find investors</p>

                <p>The sales team can find potential leads</p>

                <p>Recruiters can get ideal candidates and many more.</p>
              </div>
            </div>
          </section>
        
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </main>
    )
  }
}
