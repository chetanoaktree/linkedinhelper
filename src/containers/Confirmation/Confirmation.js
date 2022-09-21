import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import {REACT_API_URL} from '../../constants/env.js'
import { getConfirmation } from '../../actions/authActions';
import {NotificationManager} from 'react-notifications';
import { Link } from 'react-router-dom';


import banner from '../../assets/images/banner.svg';
import email_campaign from '../../assets/images/email_campaign.svg';
import to_do_list from '../../assets/images/to_do_list.svg';
import mobile_marketing from '../../assets/images/mobile_marketing.svg';

import step1 from '../../assets/images/step1.png';
import step2 from '../../assets/images/step2.png';
import step3 from '../../assets/images/step3.png';
import step4 from '../../assets/images/step4.png';

class Home extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      check: 1
    }
  }

  componentDidMount() {
    var token = new URLSearchParams(this.props.location.search).get('token') 
      this.props.getConfirmation(REACT_API_URL + `/confirmation?token=${token}`)
      .then((response) => {
        if(response.status === 200){
           NotificationManager.success(response.message, 'Success');  
        }else{
          NotificationManager.error(response.message, 'Error');  
        }
        // console.log(response.data.last_page_number,'did')
      })
  }

  render() {
    return (
      <main>
          <div className="container">
              <section className="section-default-padding" id="landing-page-banner">
                <div className="row">
                    <div className="col-md-6 align-self-center">

                        <h3>Linkedin Outreach <br /> Automation Platform</h3>
                        <p>Automate your lead generation efforts with personalized multiple Followups.</p>
                        <p>Sync prospect details to Hubspot automatically with a click</p>
                        <button type="button" className="btn btn-custom-secondary">Get Started for Free</button> <button type="button" className="btn btn-custom-primary">Chrome Extension</button>

                    </div>
                    <div className="col-md-6">

                      <img src={banner} alt="" className="landing-page-banner-image"/>
                    
                    </div>                  
                </div>
              </section>
              {/* Banner End */}

              <section className="section-default-padding" id="landing-page-banner">
                <div className="row">
                  <div className="col-md-12" >

                      <h3 className= "text-center How-It-Works-heading mb-5">Automated Personalized <br /> Invitations and Followups</h3>

                      <div className="row bs-wizard" >
                        <div className="col-md-3 col-xs-12 bs-wizard-step complete pl-0 pr-0">
                            <img src={step1} alt="" className="How-It-Works-Steps-Image"/>
                                <div className="text-center bs-wizard-stepnum">
                                  1
                                </div>
                                <div className="progress">
                                  <div className="progress-bar"></div>
                                </div>
                                <Link className="bs-wizard-dot"></Link>

                                <h3 className="text-center">Define your audience</h3>

                                <div className="bs-wizard-info text-center">
                                    Use linkedin search (Basic/Sales Navigator) OR upload CSV to define your target audience. Tool will use same search query for automation.
                                </div>
                        </div>
                        
                        <div className="col-md-3 col-xs-12 bs-wizard-step complete pl-0 pr-0">
                          <img src={step2} alt="" className="How-It-Works-Steps-Image"/>
                            <div className="text-center bs-wizard-stepnum">
                              2
                            </div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <Link className="bs-wizard-dot"></Link>

                            <h3 className="text-center">Setup Invite Message</h3>
                            <div className="bs-wizard-info text-center">
                                Setup personalized message with placeholders to send upto 100 new invitations
                            </div>
                        </div>
                        
                        <div className="col-md-3 col-xs-12 bs-wizard-step complete pl-0 pr-0">
                          <img src={step3} alt="" className="How-It-Works-Steps-Image"/>
                            <div className="text-center bs-wizard-stepnum">
                              3
                            </div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link className="bs-wizard-dot"></Link>

                            <h3 className="text-center">Get Work Done</h3>
                            <div className="bs-wizard-info text-center">
                              Collaborate and Communicate with your Cloud Experts directly and get your work done faster.
                            </div>
                        </div>
                        
                        <div className="col-md-3 col-xs-12 bs-wizard-step complete pl-0 pr-0">
                          <img src={step4} alt="" className="How-It-Works-Steps-Image"/>
                            <div className="text-center bs-wizard-stepnum">
                              4
                            </div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link className="bs-wizard-dot"></Link>

                            <h3 className="text-center">Pay Securely</h3>
                            <div className="bs-wizard-info text-center">
                              Pay your Cloud Experts securely as milestones are met for a job well done.
                            </div>
                        </div>
                      </div>

                  </div>
                </div>
              </section>
              {/* section 1st End */}

              <section className="section-default-padding" id="landing-page-banner">
                <div className="row">
                    <div className="col-md-6">

                      <img src={email_campaign} alt="" className="landing-page-banner-image"/>

                    </div> 
                    <div className="col-md-6 align-self-center">

                        <h3>Send your connection requests <br /> & follow-ups</h3>
                        <p>Automatically, but one by one as if you were sending them manually.</p>
                        <p>Use Blacklist functionality to avoid sending the request to people your teammates are already reaching out.</p>
                        <button type="button" className="btn btn-custom-primary">Find out how</button>

                    </div>
                 
                </div>
              </section>
              {/* section 2nd End */}

              <section className="section-default-padding" id="landing-page-banner">
                <div className="row">

                    <div className="col-md-6 align-self-center">

                        <h3>Synchronize Prospect details <br /> and activity to hubspot <br />with a click.</h3>
                        <p>Automatically, but one by one as if you were sending them manually.</p>
                        <p>Use Blacklist functionality to avoid sending the request to people your teammates are already reaching out.</p>
                        <button type="button" className="btn btn-custom-primary">Find out how</button>

                    </div>
                    <div className="col-md-6">

                      <img src={to_do_list} alt="" className="landing-page-banner-image"/>

                    </div>                     
                 
                </div>
              </section>
              {/* section 3rd End */}              

              <section className="section-default-padding" id="landing-page-banner">
                <div className="row">
                    <div className="col-md-6">

                        <img src={mobile_marketing} alt="" className="landing-page-banner-image"/>

                    </div> 

                    <div className="col-md-6 align-self-center">

                        <h3>Find Business emails <br />with ease.</h3>
                        <p>Linked Advance Helper Integration with Findthatlead, Hunter.io, anymailfinder etc makes it easy to find email right inside Linkedin interface and lets you push this data to Hubspot easily.</p>
                        <button type="button" className="btn btn-custom-primary">Find out how</button>

                    </div>
                    
                 
                </div>
              </section>
              {/* section 4th End */}  

              <section className="section-footer-padding" id="call-to-action">
                <div className="container">
                  <div className="row dark-call-to-action-box">

                      <div className="col-md-9">
                          <h3>Free Trial</h3>
                          <p>Gain access to a free trial of Linked Advance Helper today.</p>

                      </div>
                      <div className="col-md-3 align-self-center">
                          <button type="button" className="btn btn-custom-light">Get Started for Free</button>
                      </div>

                  </div>
                  <div className="row light-call-to-action-box mt-3">

                      <div className="col-md-9">
                          <h3>Book a Demo</h3>
                          <p>Online Session with A Linked Advance Helper expert.</p>

                      </div>
                      <div className="col-md-3 align-self-center">
                          <button type="button" className="btn btn-custom-primary">Book a Demo</button>
                      </div>

                  </div>                
                </div>
              
              </section>
              {/* section 4th End */}               

          </div>
      </main>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    isLoading: state.applicationIsLoading
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    getConfirmation: (url) => dispatch(getConfirmation(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
