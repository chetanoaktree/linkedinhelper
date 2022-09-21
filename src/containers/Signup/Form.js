import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/signupActions'
import { googleLogin } from '../../actions/authActions';
import Loader from '../../components/Loader/Loader';
import {NotificationManager} from 'react-notifications';
import { GoogleLogin } from 'react-google-login';
// import { Link } from 'react-router-dom';
import {GOOGLEID} from '../../constants/env.js'
//import registerImage from '../../assets/images/register_Image.png';

import google_login_icons from '../../assets/images/google-login-icons.png';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      company: '',
      email: '',
      password: ''
    }
  }

  handleFieldChange = (e) => {
    this.setState({[e.target.name] : e.target.value })
  }

  hideSuccess = () => {
    this.setState({success: null})
  }

  hideError = () => {
    this.setState({error: null})
  }

  onChange = (e) => {
    if(e.target.value !== this.state.password) {
      e.target.setCustomValidity("Password confirmation value doesn't match.");
    } else {
      e.target.setCustomValidity("");
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

  submitForm = (e) => {
    e.preventDefault();
    const { firstname, lastname, company, email, password } = this.state;
    const data = {
      firstname,
      lastname, 
      company, 
      email, 
      password
    }
    this.props.registerUser(data)
    .then((res) => {
      if(res.data.status === 200) {
        // this.setState({ success: res.data.message, error: ''})
        NotificationManager.success(res.data.message, 'SignUp');  
        this.props.history.push('/login')
      } else {
        NotificationManager.error(res.data.message, 'Error');
        this.setState({error: res.data.message, success: ''})
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    // const { error, success } = this.state;
    const { isLoading } = this.props;
    if(localStorage.accessToken) {
      this.props.history.push('/')
    }
    return (
      <div className="container">
            <div className="" id="signup-page-section">
                <div className="row">
                              
                    <div className="col-md-4 align-self-center d-none">
                      {/*<div>
                          <button className="btn btn-dark btn-block mb-3">Sign Up with LinkedIn</button>
                      

                      { success ? (
                        <Toast onClose={this.hideSuccess}>
                          <Toast.Header>
                            <strong className="mr-auto">Sucess</strong>
                          </Toast.Header>
                          <Toast.Body>
                            <Alert variant="success">
                              {success}
                            </Alert>
                          </Toast.Body>
                        </Toast>
                      ) : null }

                      { error ? (
                        <Toast onClose={this.hideError}>
                          <Toast.Header>
                            <strong className="mr-auto">Sucess</strong>
                          </Toast.Header>
                          <Toast.Body>
                            <Alert variant="danger">
                              {error}                                              
                            </Alert>
                          </Toast.Body>
                        </Toast>                                       
                        ) : null }
                      </div>*/}
                      {
                        isLoading ? (
                          <Loader loading={true} />
                        ) : (
                        <form onSubmit={this.submitForm}>
                          {/*<div className="form-row">
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label for="first-name">First Name</label>
                                      <input type="text" className="form-control" name="firstname" id="first-name" onChange={this.handleFieldChange} aria-describedby="FirstNameHelp" required />
                                  </div>
                              </div>
                              <div className="col-md-6">                                             
                                  <div className="form-group">
                                      <label for="last-name">Last Name</label>
                                      <input type="text" className="form-control" name="lastname" id="last-name" onChange={this.handleFieldChange} aria-describedby="LastNameHelp" required />
                                  </div>  
                              </div>
                          </div>
                          <div className="form-group">
                              <label for="company-name">Company Name</label>
                              <input type="text" className="form-control" name="company" id="company-name" onChange={this.handleFieldChange} aria-describedby="CompanyNameHelp" />
                          </div>     
            
                          <div className="form-group">
                              <label for="email-address">Email address</label>
                              <input type="email" className="form-control" name="email" id="email-address" onChange={this.handleFieldChange} aria-describedby="EmailHelp" required />
                          </div>


                          <div className="form-row">
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label for="password">Password</label>
                                      <input type="password" name="password" className="form-control" id="password" onChange={this.handleFieldChange} aria-describedby="PasswordHelp" required />
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label for="confirm-password">Confirm Password</label>
                                      <input type="password" name="password-confirmation" onChange={this.onChange} className="form-control" id="confirm-password" aria-describedby="ConfirmPasswordHelp" required />
                                  </div>

                              </div>  
                          </div>
                          <div>
                              <button type="submit" className="btn btn-dark btn-block">Sign Up</button>
                          </div>*/}
                      </form>
                        )
                      }
                      {/*<div className="mt-3">
                        <p className="text-center">Already have an account? <Link to="/login">Sign In</Link>
                          </p>
                      </div>*/}

                    </div>

                    <div className="col-md-12 align-self-center text-center">                      
                      <h3 className="text-center">Welcome To Linked Advance Helper </h3>
                      <p className="text-center mb-3">Make the most of your professional life</p>
                      {/* <img src={registerImage} alt="" className="signup-page-right-section-image"/> */}
                      <div className="">
                        <GoogleLogin
                          clientId={GOOGLEID}
                          render={renderProps => (
                            <button className="main-btn main-btn-2 mt-3" onClick={renderProps.onClick}><img src={google_login_icons} className="Sign-In-with-Google-Icons" alt=""/> <strong>Sign Up with Google</strong></button>
                          )}
                          buttonText="Login"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={'single_host_origin'}
                        />
                      </div>
                    </div>
            </div>

          </div>
      </div>
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
    registerUser: (data) => dispatch(register(data)),
    googleLogin: (data) => dispatch(googleLogin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);