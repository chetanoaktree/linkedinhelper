import React, { Component } from 'react';
import { connect } from 'react-redux';

import banner from '../../assets/images/banner.svg';
import email_campaign from '../../assets/images/email_campaign.svg';
import to_do_list from '../../assets/images/to_do_list.svg';
import mobile_marketing from '../../assets/images/mobile_marketing.svg';
import { Link } from 'react-router-dom';
import step1 from '../../assets/images/step1.png';
import step2 from '../../assets/images/step2.png';
import step3 from '../../assets/images/step3.png';
import step4 from '../../assets/images/step4.png';

import testimonial_background_image from '../../assets/images/testimonial-bg.jpg';
import author1 from '../../assets/images/author/author-1.jpg';
import author2 from '../../assets/images/author/author-2.jpg';
import author3 from '../../assets/images/author/author-3.jpg';
import author4 from '../../assets/images/author/author-4.jpg';
import author5 from '../../assets/images/author/author-5.jpg';
import author6 from '../../assets/images/author/author-6.jpg';
import author7 from '../../assets/images/author/author-7.jpg';
import author8 from '../../assets/images/author/author-8.jpg';

import shape1 from '../../assets/images/shape/shape-1.png';
import shape2 from '../../assets/images/shape/shape-2.png';

import shape5 from '../../assets/images/shape/shape-5.png';

import dots from '../../assets/images/shape/dots.png';
import banner_app from '../../assets/images/banner-app.png';
import powerful_app from '../../assets/images/powerful-app.png';




class Home extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      check: 1
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <main>
          <div className="">





{/* 


              <section className="section-default-padding" id="landing-page-banner">
                  <div className="container">      

                    <div className="row">
                        <div className="col-md-6 align-self-center">
                            <h3>Linked Advance Helper <br /> A LinkedIn automation tool developed to connect with prospect from LinkedIn</h3>
                            <p>Start outreaching ideal customers and boost your business sales with Linked Advance Helper,</p>
                            <p>an easy to use and effective lead generation tool.</p>
                            <div className="d-flex landing-page-banner-link">
                              <Link to="/signup" className="btn btn-custom-secondary">Get Started for Free</Link>
                              <a href="https://chrome.google.com/webstore/detail/linked-advance-helper/nhedpplmamepjelnjjofmgieaolahiig?hl=en-GB" rel="noopener noreferrer" target="_blank" className="btn btn-custom-primary">Chrome Extension</a>
                            </div>

                        </div>
                        <div className="col-md-6">

                          <img src={banner} alt="" className="landing-page-banner-image"/>
                        
                        </div>                  
                    </div>
                  </div>

              </section>
               */}








{/* 
              <section className="section-default-padding" id="landing-page-banner">
                <div className="container">
                  <div className="row">
									<div className="col-md-12" >

                      <h3 className= "text-center How-It-Works-heading mb-5">Automate Outreaching Lead Generation</h3>

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
                                <h3 className="text-center">Filter out your audience</h3>

                                <p className="bs-wizard-info text-center">
                                    Enter the phrases associated with your search to refine the search results from your LinkedIn account. Set the search based on location, industry, designation, skills, company name and many more.
                                </p>
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
												    <p className="bs-wizard-info text-center">
                                Write a strong and effective message that can deliver the information you want to share with your prospect. Linked Advance Helper will help you by sending it to a number of prospects.
                            </p>
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

												    <h3 className="text-center">Setup follow up message</h3>
												    <p className="bs-wizard-info text-center">
                              After invite message sent, if didn’t get any response this will take follow up. You just need to setup a follow up message; it will send follow up message a number of times you set.
                            </p>
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

												    <h3 className="text-center">Sync with Hubspot</h3>
												    <p className="bs-wizard-info text-center">
                              The prospect details like name, contact, and the conversation can be saved automatically as it is synced with Hubspot, a customer relationship management tool.
                            </p>
												</div>
											</div>

									</div>
								</div>
                </div>
              
              </section>
              */}


            <section id="home" class="banner-area">
                  <div class="banner-shape-1">
                      <img src={shape2} alt="Shape" />
                  </div>
                  <div class="banner-shape-2">
                      {/* <img src={shape1} alt="Shape" />  */}
                  </div>
                  <div class="banner-shape-3">
                      <img src={dots} alt="Shape" />
                  </div>

                  <div class="banner-content-wrapper">
                      <div class="container">
                          <div class="row align-items-center">
                              <div class="col-lg-6">
                                  <div class="banner-content">
                                      <h2 class="title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">Linked Advance Helper A LinkedIn automation tool developed to connect with prospect from LinkedIn</h2>
                                      <p class="wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.6s">Start outreaching ideal customers and boost your business sales with Linked Advance Helper, an easy to use and effective lead generation tool.</p>

                                      <ul class="download-btn">
                                          <li>
                                              <Link class="google-play wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.9s" to="/signup">
                                                  <i class="fas fa-play"></i>
                                                  {/* <span class="text-1">Get in</span> */}
                                                  <span class="text-2">Get Started for Free</span>
                                              </Link>
                                          </li>
                                          <li>
                                              <Link class="apple-store wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="1.2s" to="#" target="_blank">
                                                  <i class="fab fa-chrome"></i>
                                                  {/* <span class="text-1">Get in</span> */}
                                                  <span class="text-2">Chrome Extension</span>
                                              </Link>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                              <div class="col-lg-6">
                                  <div class="banner-image wow fadeInRightBig" data-wow-duration="1.3s" data-wow-delay="0.8s">
                                      <div class="image">
                                          {/* <img src={banner_app} alt="App" /> */}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </section>








              <section id="features" className="features-area">
                  <div className="container">
                      <div className="row justify-content-center">
                          <div className="col-lg-6">
                              <div className="section-title text-center">
                                  <p className="sub-title">Providing Best Services</p>
                                  <h2 className="title">Our Features List</h2>
                              </div>
                          </div>
                      </div>
                      <div className="features-wrapper">
                          <div className="row">
                              <div className="col-lg-4">
                                  <div className="single-features features-1 wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.2s">
                                      <span className="features-number">01</span>
                                      <div className="features-icon">
                                          <i className="flaticon-smartphone-2"></i>
                                      </div>
                                      <div className="features-content">
                                          <h4 className="features-title"><a href="#">Send Invite & Follow Ups</a></h4>
                                          <p>This will send invitation and follow ups to 1st degree connections you have filtered out from LinkedIn search. This is also designed with blacklist feature; the person you don’t want to connect with will get blocked.</p>
                                      </div>
                                      <div className="features-btn">
                                      <Link to="/signup"><i className="fal fa-arrow-right"></i></Link>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-lg-4">
                                  <div className="single-features features-2 wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.5s">
                                      <span className="features-number">02</span>
                                      <div className="features-icon">
                                          <i className="flaticon-smartphone"></i>
                                      </div>
                                      <div className="features-content">
                                          <h4 className="features-title"><a href="#">Sync with Hubspot</a></h4>
                                          <p>Get rid off managing the prospect details in your database manually. Linked Advance Helper is available with Hubspotsynced for managing potential Lead's details automatically. Saved info can be used whenever in need.</p>
                                      </div>
                                      <div className="features-btn">
                                        <Link to="/signup"><i className="fal fa-arrow-right"></i></Link>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-lg-4">
                                  <div className="single-features features-3 wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.8s">
                                      <span className="features-number">03</span>
                                      <div className="features-icon">
                                          <i className="flaticon-smartphone-1"></i>
                                      </div>
                                      <div className="features-content">
                                          <h4 className="features-title"><a href="#">Email extraction</a></h4>
                                          <p>It will easily extract the prospect email address from LinkedIn. This email address will be saved through Hubspot and can be used for sending personalized emails later on.</p>
                                      </div>
                                      <div className="features-btn">
                                        <Link to="/signup"><i className="fal fa-arrow-right"></i></Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>






              

              <section id="powerful" class="powerful-tools-area">
                  <div class="powerful-shape shape-1"></div>
                  <div class="powerful-shape shape-2">
                      <img src={shape5} alt="" />
                  </div>

                  <div class="container">
                      <div class="powerful-tools-wrapper">
                          <div class="row">
                              <div class="col-lg-6">
                                  <div class="powerful-image mt-50 wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.3s">
                                      <div class="image">
                                          <img src={powerful_app} alt="" />
                                      </div>
                                  </div>
                              </div>
                              <div class="col-lg-6">
                                  <div class="powerful-tools-content mt-50">
                                      <div class="section-title">
                                          <p class="sub-title">Providing Best Services</p>
                                          <h2 class="title">Round the Clock Expert Assistance</h2>
                                      </div>
                                      <div class="powerful-content-wrapper">
                                          <p>Use Linked Advance Helper flawless, our executives are available 24*7 to support and guide you. The experts are available whenever you need us, either any query you have or need technical assistance.</p>
                                          <Link  to="/contact-us" class="main-btn main-btn-2">Contact us</Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>






                <section id="pricing" class="pricing-area">
                    <div class="pricing-shape shape-1">
                        <img src="assets/images/shape/dots-3.png" alt="" />
                    </div>

                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-6">
                                <div class="section-title text-center">
                                    <p class="sub-title">Providing Best Services</p>
                                    <h2 class="title">Our Features List</h2>
                                </div>
                            </div>
                        </div>
                        <div class="pricing-wrapper">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="single-pricing pricing-1 text-center wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.4s">
                                        <div class="pricing-icon">
                                            <i class="flaticon-send"></i>
                                        </div>
                                        <div class="pricing-price">
                                            <h5 class="sub-title">BASIC</h5>
                                            <span class="price">Free</span>
                                        </div>
                                        <div class="pricing-body">
                                            <ul class="pricing-list">
                                                <li><i class="fas fa-check"></i> 300 Profile Visit Per day limit</li>
                                                <li><i class="fas fa-check"></i> 5 Invitations Per day limit</li>
                                                <li><i class="fas fa-check"></i> 5 Messages Per day limit to your 1st connection</li>
                                            </ul>
                                            <a href="#" class="main-btn">Sign Up For Free</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="single-pricing pricing-2 text-center wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.4s">
                                        <div class="pricing-icon">
                                            <i class="flaticon-shuttle"></i>
                                        </div>
                                        <div class="pricing-price">
                                            <h5 class="sub-title">ADVANCE</h5>
                                            <span class="price">$50/Mon</span>
                                        </div>
                                        <div class="pricing-body">
                                            <ul class="pricing-list">
                                                <li><i class="fas fa-check"></i> 300 Profile Visit Per day limit</li>
                                                <li><i class="fas fa-check"></i> 10 Invitations Per day limit</li>
                                                <li><i class="fas fa-check"></i> 10 Messages Per day limit to your 1st connection</li>
                                            </ul>
                                            <a href="#" class="main-btn main-btn-2">Ready To Pay</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="single-pricing pricing-3 text-center wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.4s">
                                        <div class="pricing-icon">
                                            <i class="flaticon-plane"></i>
                                        </div>
                                        <div class="pricing-price">
                                            <h5 class="sub-title">PREMIUM</h5>
                                            <span class="price">$100/Mon</span>
                                        </div>
                                        <div class="pricing-body">
                                            <ul class="pricing-list">
                                                <li><i class="fas fa-check"></i> 300 Profile Visit Per day limit</li>
                                                <li><i class="fas fa-check"></i> 15 Invitations Per day limit</li>
                                                <li><i class="fas fa-check"></i> 15 Messages Per day limit to your 1st connection</li>
                                            </ul>
                                            <a href="#" class="main-btn">Ready To Pay</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>








              <section id="testimonial" class="testimonial-area bg_cover" style={{backgroundImage: `url(${testimonial_background_image})`}}>
                  <div class="testimonial-shape shape-1"></div>
                  <div class="testimonial-shape shape-2"></div>

                  <div class="testimonial-wrapper">
                      <div class="author-1">
                          <img src={author1} alt="" />
                      </div>
                      <div class="author-2">
                          <img src={author2} alt="" />
                      </div>
                      <div class="author-3">
                          <img src={author3} alt="" />
                      </div>
                      <div class="author-4">
                          <img src={author4} alt="" />
                      </div>

                      <div class="author-5">
                          <img src={author5} alt="" />
                      </div>
                      <div class="author-6">
                          <img src={author6} alt="" />
                      </div>
                      <div class="author-7">
                          <img src={author7} alt="" />
                      </div>
                      <div class="author-8">
                          <img src={author8} alt="" />
                      </div>
                  </div>

                  <div class="container">
                      <div class="row justify-content-center">
                          <div class="col-lg-6">
                              <div class="section-title text-center">
                                  <p class="sub-title">Check Our Client Feedbacks</p>
                                  <h2 class="title">What they are saying</h2>
                              </div>
                          </div>
                      </div>
                      <div class="row justify-content-center">
                          <div class="col-xl-8 col-lg-10">
                              <div class="testimonial-bg">
                                  <div class="testimonial-active swiper-container">
                                      <div class="swiper-wrapper">
                                          <div class="swiper-slide single-testimonial text-center">
                                              <p>This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                              <h5 class="author-name">Shirley Smith</h5>
                                          </div>
                                          <div class="swiper-slide single-testimonial text-center">
                                              <p>This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                              <h5 class="author-name">Jon Smith</h5>
                                          </div>
                                          <div class="swiper-slide single-testimonial text-center">
                                              <p>This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                              <h5 class="author-name">Rose Smith</h5>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>







{/* 
              <section className="section-default-padding" id="landing-page-banner">
                <div className="row">
                    <div className="col-md-6">

                      <img src={email_campaign} alt="" className="landing-page-banner-image"/>

                    </div> 
                    <div className="col-md-6 align-self-center">

                        <h3>Send Invite  & Follow Ups</h3>
                        <p>This will send invitation and follow ups to 1st degree connections you have filtered out from LinkedIn search. This is also designed with blacklist feature; the person you don’t want to connect with will get blocked.</p>
                        <Link to="/signup" className="btn btn-custom-primary">Find out how</Link>

                    </div>
                 
                </div>
              </section>
               */}

{/* 
              <section className="section-default-padding" id="landing-page-banner">
                <div className="row">

                    <div className="col-md-6 align-self-center">

                        <h3>Sync with Hubspot</h3>
                        <p>Get rid off managing the prospect details in your database manually. Linked Advance Helper is available with Hubspotsynced for managing potential Lead's details automatically. Saved info can be used whenever in need.</p>
                        <Link to="/signup" className="btn btn-custom-primary">Find out how</Link>

                    </div>
                    <div className="col-md-6">

                      <img src={to_do_list} alt="" className="landing-page-banner-image"/>

                    </div>                     
                 
                </div>
              </section>
               */}
{/* 
              <section className="section-default-padding" id="landing-page-banner">
                <div className="row">
                    <div className="col-md-6">

                        <img src={mobile_marketing} alt="" className="landing-page-banner-image"/>

                    </div> 

                    <div className="col-md-6 align-self-center">

                        <h3>Email extraction</h3>
                        <p>It will easily extract the prospect email address from LinkedIn. This email address will be saved through Hubspot and can be used for sending personalized emails later on.</p>
                        <Link to="/signup" className="btn btn-custom-primary">Find out how</Link>

                    </div>
                    
                 
                </div>
              </section>
               */}
{/* 
              <section className="section-footer-padding" id="call-to-action">
                <div className="container">
                  <div className="row dark-call-to-action-box">

                      <div className="col-md-9">
                          <h3>Free Trial</h3>
                          <p>Gain access to a free trial of Linked Advance Helper today.</p>

                      </div>
                      <div className="col-md-3 align-self-center">
                          <Link to="/signup"  className="btn btn-custom-light">Get Started for Free</Link>
                      </div>

                  </div>
                  <div className="row light-call-to-action-box mt-3">

                      <div className="col-md-9">
                          <h3>Book a Demo</h3>
                          <p>Online Session with A Linked Advance Helper expert.</p>

                      </div>
                      <div className="col-md-3 align-self-center">
                          <Link to="/contact-us"  className="btn btn-custom-primary">Book a Demo</Link>
                      </div>

                  </div>                
                </div>
              
              </section>
                         */}

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
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
