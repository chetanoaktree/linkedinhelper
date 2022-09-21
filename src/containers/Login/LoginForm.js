import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, resetPassword, googleLogin, getConfirmation } from '../../actions/authActions';
import Loader from '../../components/Loader/Loader';
import { GoogleLogin } from 'react-google-login';
import {GOOGLEID, REACT_API_URL} from '../../constants/env.js'
import {NotificationManager} from 'react-notifications';
import { Button, Modal,Row,Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
//import loginImage from '../../assets/images/login-bg.png';
// import forgot_password from '../../assets/images/forgot-password.svg';
// import forgot_password_succes from '../../assets/images/email-sent.svg';

import google_login_icons from '../../assets/images/google-login-icons.png';

import logo from '../../assets/images/logo.svg';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      error1: null,
      show: '',
      errors: {
        email: '',
        password: ''
      },
      submittedOnce: false
    }
    this.checkEmpty = this.checkEmpty.bind(this)
  }

  fieldValChange = (e) => {
    this.setState({[e.target.name] : e.target.value,error1: null})
    this.checkEmpty();
  }

  checkEmpty(){
    const { email, password, errors } = this.state;
    // console.log("email",email)
    if(email === ""){
      errors['email'] = "Please enter email"
      this.setState({errors})
      return false
    }else{
      errors['email'] = ""
      this.setState({errors})
    }
    if(password === ""){
      errors['password'] = "Please enter password"
      this.setState({errors})
      return false
    }else{
      errors['password'] = ""
      this.setState({errors})
    }
    return true
  }

  login = (e) => {
    e.preventDefault();    
    this.setState({submittedOnce: true})
    if(this.checkEmpty()){
      const { email, password } = this.state;

      var userData = {}
      userData = {
        email,
        password
      }
      this.props.userLogin(userData)
      .then((res)=> {console.log("res",res)
        if(res && res.status !== 200) {
           NotificationManager.error(res.data.error && res.data.error.user_authentication, 'Error');  
          this.setState({
            error: res.data.error && res.data.error.user_authentication
          })
        }
      })
    }
  }

  componentDidMount(){

    if(this.props.location.search !== ""){
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
      // var code = new URLSearchParams(this.props.location.search).get('code')
      // // Simple POST request with a JSON body using fetch
      // var bodyData = {}
      // bodyData = {
      //   "provider": 'linkedin',
      //   "code": code
      // }
      // this.props.userLogin(bodyData)
      // .then((res)=> {
      //   if(res && res.status !== 200) {
      //     this.setState({
      //       error: res.data.error.user_authentication
      //     })
      //   }
      // }) 
    }
  }

  responseGoogle = (response) => {
    // console.log(response,'ress');
    var userData = {}
    userData = {
      provider: 'google',
      uid: response.googleId,
      first_name: response.profileObj.givenName || '',
      last_name: response.profileObj.familyName || '',
      email: response.profileObj.email
    }

    this.props.googleLogin(userData)
    .then((res)=> {
      if(res && res.status !== 200) {
        this.setState({
          error: res.data.error.user_authentication
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  /*requestProfile = () => {
    var oauthUrl = LINKEDIN_URL+RIDIRECT_URL
    window.location.replace(oauthUrl);
  };*/

  handleShow = () => {
      this.setState({show: true})
  }; 

  handleSucessClose = () => {
      this.setState({sucess: false})
  }; 

  handleClose = () => {
      this.setState({show: false})
  }; 

  forgotPassword = (e) => {
      e.preventDefault();    
      const { email } = this.state;
      if (email) {
        this.props.resetPassword(email)
        .then((res) => {
          if(res.data.status === 400) {
            this.setState({ email_error: res.data.message })     
            NotificationManager.error(res.data.message, 'Error');
          } else {
            NotificationManager.success(res.data.message, 'Success');
            this.setState({ show: false, email: '', sucess: true })
          }
        }).catch((e) => {
          this.setState({ show: false })
        })
      } else {
        NotificationManager.error('Please enter email.', 'Error');
        this.setState({ email_error: 'please enter email.' })
      }
  }; 

  render() {
    const { email_error } = this.state;
    const { isLoading } = this.props;
    if(localStorage.accessToken) {
      this.props.history.push('/')
    }
    // disabled={renderProps.disabled}
    return (
            <section class="fxt-template-animation fxt-template-layout1 loaded">
              <div className="container-fluid">
                <div className="" id="login-page-section">

                  <div className="row">

                      <div class="col-md-6 col-12 fxt-bg-color"> 
                        <img src={logo} alt="logo" className="site-main-logo"/>                   
                        <h3 className="text-center">Welcome To <br />Linked Advance Helper </h3>
                        <p className="text-center mb-3">Don't miss your next opportunity.<br /> Sign in to stay updated on your professional world.</p>
                      
                      
                        <React.Fragment>
                              
                          <div>
                            <GoogleLogin
                              clientId={GOOGLEID}
                              disabled={isLoading}
                              render={renderProps => (
                                <button className="main-btn main-btn-2 mt-3" onClick={renderProps.onClick}><img src={google_login_icons} className="Sign-In-with-Google-Icons" alt=""/><strong>Sign In with Google</strong></button>
                              )}
                              buttonText="Login"
                              onSuccess={this.responseGoogle}
                              onFailure={this.responseGoogle}
                              cookiePolicy={'single_host_origin'}
                            />
                              
                          </div>
                        </React.Fragment>
                      </div>

                      <div class="col-md-6 col-12 fxt-none-767 fxt-bg-img"></div>


                  </div>

                </div>


                      <Modal show={this.state.sucess} className="forgot-password-succes-popup" centered>
                        <Modal.Body>
                            {/* <img src={forgot_password_succes} alt="success" className="forgot-password-succes-popup-image"/> */}
                            <h3 className="text-center">Success</h3>
                            <p className="text-center">Password reset link has been sent successfully. <br />You can check your inbox.</p>

                          <center> 
                            <Button variant="btn btn-custom-primary mr-2" onClick={this.handleSucessClose.bind(this)}>
                              Close
                            </Button>
                          </center> 

                        </Modal.Body>
                      </Modal>



                      <Modal show={this.state.show} onHide={this.handleClose.bind(this)} className="Reset-Your-Password-Popup" centered >
                            <Modal.Body>

                              {/* <img src={forgot_password} alt="forgot password" className="forgot-password-popup-image"/> */}

                              <h3 className="text-center">Reset Your Password</h3>
                              <p className="text-center">Please enter the Email address which is registered with us.<br />We will send a new password to that address.</p>
                              
                              <Row>
                                <Col xs={12} md={1}>

                                </Col>
                                <Col xs={12} md={10}>
                                { email_error ? (
                                <div className="alert alert-danger" role="alert">
                                  {email_error}
                                </div>
                                ) : null
                                }

                              <input type="text" name="email" className="form-control" placeholder="Enter Your Email Address" id="email" value={this.state.email} onChange={this.fieldValChange} required />
                              
                              <span>{this.state.error1}</span>

                                </Col>                                
                                <Col xs={12} md={1}>

                                </Col>
                              </Row>



                              <center> 
                              <Button className="btn btn-custom-primary mr-2 mt-4" onClick={this.forgotPassword.bind(this)}>
                                Send
                              </Button>
                              <Button className="btn btn-custom-secondary-small-border-radius mt-4" onClick={this.handleClose.bind(this)}>
                                Cancel
                              </Button>
                            </center> 

                            </Modal.Body>
                            {/* <Modal.Footer>


                            </Modal.Footer> */}
                      </Modal>
                      {/* </div> */}
                      {/* </div> */}
                </div>  {/* Container End */}
          </section>
          
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
    userLogin: (data) => dispatch(login(data)),
    resetPassword: (data) => dispatch(resetPassword(data)),
    googleLogin: (data) => dispatch(googleLogin(data)),
    getConfirmation: (url) => dispatch(getConfirmation(url))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);