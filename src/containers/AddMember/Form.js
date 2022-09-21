import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerMember } from '../../actions/signupActions'
import { googleLogin } from '../../actions/authActions';
// import Loader from '../../components/Loader/Loader';
import {NotificationManager} from 'react-notifications';
// import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {GOOGLEID} from '../../constants/env.js'
import google_login_icons from '../../assets/images/google-login-icons.png';
// import registerImage from '../../assets/images/register.svg';



class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      password: '',
      invitation_id: new URLSearchParams(this.props.location.search).get('invitation_id') 
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
      email: response.profileObj.email,
      invitation_id: this.state.invitation_id
    }


    this.props.googleLogin(userData)
    .then((res)=> {
      if(res && res.status === 200 && res.status.data !== 200) {
        // NotificationManager.error(res.data.message, 'Error');  
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  componentDidMount(){
    
    NotificationManager.success("Thank you. Please register on Linked Advance Helper.", 'Register');  

  }

  submitForm = (e) => {
    e.preventDefault();
    const { firstname, lastname, password, invitation_id } = this.state;
    const data = {
      user: { 
              firstname,
              lastname, 
              password
            },
      invitation_id
    }
    this.props.registerMember(data)
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
    // const { isLoading } = this.props;

    return (
      <div className="container">
            <div className="" id="signup-page-section">
                <div className="row">
                              
                    {/* <div className="col-md-4 align-self-center"> */}

                                    {/*
                                      <form onSubmit={this.submitForm}>
                                        
                                        {
                                          isLoading ? (
                                            <Loader loading={true} />
                                          ) : (
                                            <div className="form-row">
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
                                          )
                                        }

   

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
                                        </div>
                                        </form>

                                    <div className="mt-3">
                                        <p className="text-center">Already have an account? <Link to="/login">Sign In</Link>
                                        </p>
                                    </div>*/}

                                  {/* </div> */}

                    <div className="col-md-12 align-self-center">
                      <h3 className=" text-center">Welcome To Linked Advance Helper </h3>
                      <p className="text-center">Make the most of your professional life</p>
                      {/* <img src={registerImage} alt="" className="invitations-page-right-section-image"/> */}
                              <div className="">
                                    <GoogleLogin
                                      clientId={GOOGLEID}
                                      render={renderProps => (
                                        <button className="btn btn-custom-secondary btn-block mb-1" onClick={renderProps.onClick}><img src={google_login_icons} className="Sign-In-with-Google-Icons" alt=""/> <strong>Sign Up with Google</strong></button>
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
    registerMember: (data) => dispatch(registerMember(data)),
    googleLogin: (data) => dispatch(googleLogin(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);