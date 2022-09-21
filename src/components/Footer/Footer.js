import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { subcribtion } from '../../actions/authActions';
import {NotificationManager} from 'react-notifications';
import footer_background_image from '../../assets/images/footer-bg.jpg';

class Footer extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
          show: false,
          email: '',
          error: ""
        }
    }
    fieldValChange = (e) => {
        this.setState({email: e.target.value})
    } 

    handleClose = () => {
        this.setState({show: false})
    }

    subcribe = () => {
        if(this.state.email){
            this.props.subcribtion(this.state.email)
            .then((res) => {
              if(res.data.status === 200) {
                NotificationManager.success(res.data.message, 'Success');  
                this.setState({show: false})
                // this.props.history.push('/campaign')
              } else {
                NotificationManager.error(res.data.message, 'Error');  
                this.setState({
                  error: "something went wrong."
                })
              }
            })

        }else{
            NotificationManager.error("Please enter valid email address", 'Error');  
        }
    }

  render() {
    const { authenticated, location } = this.props;
    if((!authenticated) && location.pathname !== '/')
        return null
    return (
        <footer id="footer" className="footer-area bg_cover" style={{backgroundImage: `url(${footer_background_image})`}}>
          <div className="footer-shape shape-1"></div>

            <div className="container">
              <div className="footer-widget">
                <div className="row">
                  
                        <div className="col-md-3">
                            <h4 className="footer-title">GET STARTED</h4>
                            <ul className="link">
                                <li><Link to="/plan">Pricing</Link></li>
                                <li><Link to="/feature">Features</Link></li>
                                <li><Link to="/case-study">Case study</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h4 className="footer-title">ABOUT US</h4>
                            <ul className="link">
                                <li><Link to="/contact-us">Contact Us</Link></li>
                                <li><Link to="/about-us">About Us</Link></li>
                                <li><Link to="/terms">Terms Of Use</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h4 className="footer-title">SUPPORT</h4>
                            <ul className="link">
                                <li><Link to="/faq">FAQ</Link></li>
                                <li><Link to="/contact-us">Schedule a Demo</Link></li>
                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-3 footer-newsletter">
                            <h4 className="footer-title">NEWSLETTER</h4>
                            <div className="newsletter-form">
                                <form action="#">
                                    <input type="text" placeholder="Email address" />
                                    <button><i className="fas fa-envelope"></i></button>
                                </form>
                            </div>
                        </div>                                                         


                      <div className="container">
                          <hr className="footer-hr"/>
                              <h4 className="footer-title">Disclaimer: </h4>
                              <p>The Linked Advance Helper for LinkedIn browser extension is not endorsed or certified by LinkedIn. All LinkedIn(tm) logos and trademarks displayed on this tool are property of LinkedIn. The Linked Advance Helper is distributed AS IS. Your use of Linked Advance Helper is at your own risk.</p>
                          <hr className="footer-hr"/>
                      </div>

                </div>

                <div className="footer-bottom-bar">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-12">
                              <p className="copyright-text text-center">&copy; Copyright 2020 Linked Advance Helper. All Rights Reserved.</p>
                          </div>
                      </div>
                  </div>
                </div>


              </div>      
            </div>


            <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter email address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  
                  <input type="email" name="email" className="form-control" id="email" value={this.state.email} onChange={this.fieldValChange} required />
                  <span>{this.state.errorMsg}</span>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button variant="info" onClick={this.subcribe}>
                    Subscribe
                  </Button>
                </Modal.Footer>
            </Modal>
        </footer>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state',state)
  return {
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subcribtion: (email) => dispatch(subcribtion(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);