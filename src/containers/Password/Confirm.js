import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorizeToken, set_session, updatePassword } from '../../actions/authActions';
import { Button, Modal,Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';

// import error_icons from '../../assets/images/warning.svg';
// import password_unlock from '../../assets/images/password-unlock.svg';


class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      token: null,
      errors: {},
      sucess: false,
      errored: false,
      passwordModal: false
    }
  }

  componentDidMount() {
    let params = window.location.search
    const queryString = require('query-string');
    const parsed = queryString.parse(params);

    const { authorizeToken } = this.props;
    if (parsed.token) {
      authorizeToken(parsed.token)
      .then((res) => {
        if(res.data.status === 200) {
          this.setState({ token: res.data, passwordModal: true })
        } else {
          this.setState({ error: res.data.message, errored: true })
        }
      }).catch((err) => {
        console.log(err.response.data)
      })
    } else {
      this.setState({ error: "Reset url may have been expired or mismatched. Please try again."})
    }
  }

  isValid = () => {
    let { password, password_confirm } = this.state;
    let errors = {};
    if(isEmpty(password)) {
      errors.password = "Please enter password,"
    }
    if(isEmpty(password_confirm)) {
      errors.password_confirm = "Please enter password confirmation."
    }
    if(password_confirm !== password) {
      errors.password_confirm = "Password confirmation doesn't match with new password."
    }
    this.setState({ errors: errors })
    return isEmpty(errors)
  }

  resetPassword = (event) => {
    event.preventDefault()
    if (this.isValid()) {
      const { password, token } = this.state;
      const user = { user:  { password } }
      this.props.updatePassword(user, token.user.id)
      .then((res) => {
        if(res.data.status === 200) {
          this.props.set_session(res)
          this.setState({sucess: true, passwordModal: false})
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  handleSucessClose = () => {
      this.setState({sucess: false, errored: false})
      this.props.history.push('/login')
  };

  handleClose = () => {
      this.setState({passwordModal: false})
      this.props.history.push('/login')
  }; 

  fieldValChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  render() {
    const { error, password, password_confirm, errors } = this.state;
    return (
      <div className="row">
          <div className="col-md-12">
              <div className="card">
                  <div className="card-body">
                      <div className="row">
                          <div className="col-md-3"></div>
                          <p>{error}</p>
                      </div>
                  </div>
              </div>
          </div>
          <Modal show={this.state.sucess}>
            <Modal.Header>
              <Modal.Title>Sucess</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Password has been updated sucessfully, you can return to dashboard and signin.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={this.handleSucessClose.bind(this)}>
                Okay
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.errored} centered>
            <Modal.Body>
              {/* <img src={error_icons} alt="error" className="error-popup-image"/> */}
              <h3 className="text-center">Error</h3>
              <p className="text-center">
                {this.state.error} 
                  <br />
                Something went wrong, please try again later.
              </p>
              <center> 
                <Button className="btn btn-custom-primary" onClick={this.handleSucessClose.bind(this)}>
                  Close
                </Button>
              </center>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.passwordModal} onHide={this.handleClose.bind(this)} className="set-new-password-popup" centered>
            <Modal.Body>

              {/* <img src={password_unlock} alt="password" className="set-new-password-popup-image mb-2"/> */}

              <h3 className="text-center">Change Password</h3>
              <p className="text-center">It's a good idea to use a strong password that you don't use elsewhere.</p>

              { !isEmpty(errors) ? (
                <div className="alert alert-danger" role="alert">
                  {errors.password || errors.password_confirm}
                </div>
                ) : null}

              <Row>
                <Col xs={12} md={1}>

                </Col>
                <Col xs={12} md={10}>
                  <div className="form-group">
                      {/* <label htmlFor="email-address">New Password</label> */}
                      <input type="password" name="password" className="form-control" value={password} onChange={this.fieldValChange} aria-describedby="EmailHelp" placeholder="New Password" required />
                  </div>

                  <div className="form-group">
                      {/* <label htmlFor="email-address">Confirm Password</label> */}
                      <input type="password" name="password_confirm" className="form-control" value={password_confirm} onChange={this.fieldValChange} aria-describedby="EmailHelp" placeholder="Confirm Password" required />
                  </div>
                </Col>
                <Col xs={12} md={1}>

                </Col>
              </Row>

              <center> 
              <Button className="btn btn-custom-primary mr-1" onClick={this.resetPassword.bind(this)}>
                Save Changes
              </Button>
              <Button className="btn btn-custom-secondary-small-border-radius" onClick={this.handleClose.bind(this)}>
                Close
              </Button>
              </center> 
            </Modal.Body>

          </Modal>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    authorizeToken: (data) => dispatch(authorizeToken(data)),
    set_session: (data) => dispatch(set_session(data)),
    updatePassword: (data, id) => dispatch(updatePassword(data, id))
  };
};

export default connect(null, mapDispatchToProps)(Confirm);