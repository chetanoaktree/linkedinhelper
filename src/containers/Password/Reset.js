import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/authActions';
import { Alert, Toast } from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import { Link } from 'react-router-dom';


class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sucess: null,
      error: null,
      email: ''
    }
  }

  fieldValChange = (e) => {
    this.setState({[e.target.name] : e.target.value })
  }

  submitForm = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const data = {
      email
    }

    this.props.resetPassword(data)
    .then((res) => {
      if(res.data.success) {
        this.setState({ success: res.data.message, error: ''})
        NotificationManager.success(res.data.message, 'Sucess');
      } else {
        this.setState({error: res.data.error, success: ''})
        NotificationManager.error(res.data.message, 'Error');
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    const { email, success, error } = this.state;

    return (
      <div className="row">
          <div className="col-md-12">
              <div className="card">
                  <div className="card-body">
                      <div className="row">
                          <div className="col-md-3"></div>
                          <div className="col-md-6">
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
                                  <strong className="mr-auto">Error</strong>
                                </Toast.Header>
                                <Toast.Body>
                                  <Alert variant="danger">
                                    {error}                                              
                                  </Alert>
                                </Toast.Body>
                              </Toast>                                       
                              ) : null }
                              <form onSubmit={this.submitForm}>
                                  <h3 className="text-center">Sign In</h3>
                                  <p className="text-center">Please fill in this form to Login on account</p>

                                  <div className="form-group">
                                      <label htmlFor="email-address">Email address</label>
                                      <input type="email" name="email" className="form-control" id="email-address" value={email} onChange={this.fieldValChange} aria-describedby="EmailHelp" required />
                                  </div>

                                  <div>
                                      <button type="submit" className="btn btn-dark btn-block">Sign In</button>
                                  </div>
                              </form>
                              <div className="mt-3">
                                  <p className="text-center"><Link to="#">Forget your password?</Link></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (data) => dispatch(resetPassword(data))
  };
};

export default connect(null, mapDispatchToProps)(Form);