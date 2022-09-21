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
                <li className="breadcrumb-item active"><Link to="#">FAQ</Link></li>
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
                <h3>For using Linked Advance Helper do I need to have LinkedIn premium account?</h3>
                <p>Linked Advance Helper works perfectly with LinkedIn free account, there is no need to have LinkedIn account premium subscription. It is recommended to have sales navigator premium subscription to reach a number of potential customers as Linked advance helper uses the browser URL for the results you have searched from LinkedIn.</p>

                <h3>What benefits I will get if I subscribe for Linked Advance Helper premium?</h3>
                <p>The benefits are not limited to making good connections. You will get maximum profile visits, sending lots of invitation, endorsing skills, keeping track of profile activities, follow ups, multiple connections with business professionals and a CRM for managing prospect details.</p>

                <h3>How many invitations and messages linked advance helper can send per day?</h3>
                <p>Keeping your LinkedIn account safety in mind, we have limited the invitation and messages Linked Advance Helper send per day.</p>

                <h3>Can I keep the records of manual visits?</h3>
                <p>Yes, Linked Advance Helper also lets you record the details of manual visits. it also allows list out the prospects get connected automatically through Linked Advance Helper for manual making follow ups.</p>

                <h3>How I can share any lead with my team?</h3>
                <p>You can download the prospect details as a CSV file and can share it with your teammate or export it to Hubspot so they can view it directly there. It also designed with notes and tags feature that allows making note on any prospect directly over LinkedIn profile. The context about any particular profile can be shared directly with your team for better understanding of conversion status.</p>

                <h3>Can I cancel my Linked Advance Helper subscription?</h3>
                <p>Yes, you can anytime discontinue our services by just Unsubscribing the premium plan you were using for you business or organization. You can unsubscribe it directly from your account dashboard or can contact Linked Advance Helper executive for any help.</p>
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
