import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PrivacyPolicy extends Component {


  render() {
    return (
      <main>
          <section className="page-heading-breadcrumb-section">
              <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                          <li className="breadcrumb-item active"><Link to="#">Privacy Policy</Link></li>
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
                  <div className="col-md-12" >
                    <p>Linked Advance Helper Google Chrome Extension (Linked Advance Helper) does not collect any personal data of its users from their LinkedIn account. Linked Advance Helper stores all information locally in your Chrome browser user data storage.</p>
                    <p>Linked Advance Helper does not send any of your or LinkedIn data to its or 3rd party servers, but in the future we can add Google Analytics or other tracking services to analyze anonymous & aggregated usage of Linked Advance Helper.</p>
                    <p>We store only your Linked Advance Helper account information (email, name, company details for enterprise accounts) on our servers</p>
                    <p>We use SSL (Secure Sockets Layer) for connections between client side (website & app) and our servers to protect your data</p>
                    <p>Linked Advance Helper is distributed “AS IS”.</p>
                    <p>Linked Advance Helper paid license is non refundable.</p>
                    <p>Linked Advance Helper does not collect any payment information of any kind.</p>
                    <p>Linked Advance Helper is not a LinkedIn product. You understand that like any third-party software or tools, LinkedIn Corporation does not endorse the use of Linked Advance Helper nor does LinkedIn Corporation have any association with Linked Advance Helper.</p>
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


