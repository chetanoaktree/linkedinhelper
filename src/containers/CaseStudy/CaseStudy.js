import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class CaseStudy extends Component {


  render() {
    return (
      <main>
        <section className="page-heading-breadcrumb-section">
            <div className="container">
              <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                        <li className="breadcrumb-item active"><Link to="#">Case Study</Link></li>
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
                    <h3>Linked Advance Helper - A LinkedIn automation tool</h3>

                    <p>LinkedIn is a huge network of professionals and a dominating platform in the field of sales and marketing. It helps businesses to connect with a number of potential customers associated with diverse industries and convert them in a lead. This process takes a lot of effort and hours to reach people, make connections, make effective conversation, share useful content, and convert it. Investing this much time and resources is not a great idea for any business to become successful. Work smarter is way better than work Harder and Linked Advance Helper is a tool that makes your work done smartly.</p>

                    <h3>The traditional methods have been used before for generating business leads.</h3>

                    <ul>
                      <li>Searching the audience on LinkedIn using related phrases</li>
                      <li>Sending them invite and follow up message manually</li>
                      <li>Keeping track of acceptance and responses received manually</li>
                      <li>Collecting the email from the company website for sending emails</li>
                      <li>Managing all the info in the database manually</li>
                    </ul>

                    <p>The traditional method for generating sales was very time and resource consuming. We need to sit hours for generating potential leads while compromising the efforts made for other marketing strategies. Then the LinkedIn automation comes in picture to automate all these processes to connect with people and generating sales.</p>

                    <h3>How we are using Linked Advance Helper for generating Potential Leads?</h3>

                    <p><strong>Step 1. </strong>Log into LinkedIn account and search for the targeted audience, we wanted to filter out audience from the USA who are associated with a software firm that works on salesforce technology and positioned at higher designation or authorized level.</p>

                    <p><strong>Step 2. </strong>After filtering with all these criteria we got the browser URL with filtered results which we want to target through Linked Advance Helper. Defining of audience we can do in the following ways – search from sales navigator, filter from recruiter lite, can use already tagged profiles, can manually upload your own list of your profiles, and many more.</p>

                    <p><strong>Step 3. </strong>Entered this URL with specific search results or CSV files in Linked Advance Helper for reaching out to the defined audience to get connected with.</p>

                    <p><strong>Step 4. </strong>Choosing the message template from the available messages to send the invite. There can be a number of message templates for sending to different audience types, you just need to pick one that is the best suit.<br></br>
                      If you just wish to visit profiles, Linked Advance Helper offer that features, it automates profile visits, endorsing skills, keeping track of profile activities, and following them.</p>

                    <p><strong>Step 5. </strong>If any prospect accepts the invitation, automate conversation by introducing products/services. If the invitation does not get accepted it will send a follow-up message. Linked Advance Helper will detect responses from prospects and stop follow up automatically.<br></br>
                      There is also a feature of an automation drip campaign available to ease your work. You can schedule it for specific time duration and it will automatically get stopped when you get a response from prospects.</p>

                    <p><strong>Step 6. </strong>Pushing the conversation to Hubspot for reference and future use. Easy extraction of the email and pushing it to Hubspot with the prospect details. These emails can be used for personalized promotion of products/services or email marketing. The profile details can be downloaded as a CSV file and can export directly to CRM integrated. It also allows you to maintain the list of profiles that get connected with Linked Advance Helper for following up later on.</p>

                    <p>With Linked Advance Helper we have got a number of potential leads in very little time with all automated processes. It also allows adding teammates and prevents sending an invite to the same person which is already connected with your teammates. Blacklisting feature is there to block some people you don’t want to let Linked Advance Helper connect. The time we have saved using Linked Advance Helper has invested in other marketing and development efforts to increase productivity.</p>
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
