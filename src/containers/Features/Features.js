import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Features extends Component {


  render() {
    return (
      <main>
        <section className="page-heading-breadcrumb-section">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active"><Link to="#">Features</Link></li>
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
                <p><strong>Linked Advance Helper</strong> is easy to use and effective LinkedIn automation software for boosting sales through B2B lead generation. It is developed with a number of features to ease the lead generation process and for taking it to the advanced level of marketing.</p>

                <h3>Easy signup</h3>
                <p>This is a 2-steps sign up process; enter your first name, last name, company name, and your email address. It will need your email address confirmation for further use.</p>

                <h3>Less spam more read</h3>
                <p>Linked Advance Helper sends messages to a number of people at once and that also on scheduled timings. The messages will look more likely to a manually sent message.</p>

                <h3>Notes & Tags</h3>
                <p>It allows leaving notes and tags over profiles for later use, the context associated with any profile can be shared with the team for easy understanding. Auto Tag feature is there to tag profiles even if you are not connected with them.</p>

                <h3>Vast Search options</h3>
                <p>There are multiple ways you can define your audience with as searching from Sales Navigator, finding from Recruiter Lite, using previously tagged profiles, or uploading of your own list of profiles CSV.</p>

                <h3>Auto-visit</h3>
                <p>Linked Advance Helper if, for profile visits, it will automate profile view, keeping track over profile activities, endorsing skills, and following up profiles.</p>

                <h3>Automate conversation</h3>
                <p>As the invite gets accepted Linked Advance Helper will start a conversation with the prospects, you just need to provide it with message templates. This conversation will be saved to Hubspot.</p>

                <h3>Acceptance and ignorance</h3>
                <p>Linked Advance Helper keeps track of all the accepted connections and the invitations which are ignored. If the connections not get accepted, it will follow up on scheduled time and stop automatically after getting a response.</p>

                <h3>Synced CRM</h3>
                <p>Hubspot is synced for customer relationship management; all the details of prospects will be pushed to Hubspot and can be accessed anytime whenever there is a need. Download the profile details as CSV and upload it directly to the CRM.</p>

                <h3>Pay safe</h3>
                <p>It is developed with highly secure payment methods; make your payment leaving all your worries aside. Pay easy and start getting hot business leads.</p>

                <h3>Google extension</h3>
                <p>Linked Advance Helper is enriched with Google extension, install it to your browser, and create your first campaign to outreach prospects at a single click.</p>
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
