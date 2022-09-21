import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSalesforceCode } from '../../actions/authActions';
import {NotificationManager} from 'react-notifications';

class SalesforceRedirection extends Component {
  componentDidMount() {
    if(this.props.history.location.search) {
      const urlParams = new URLSearchParams(this.props.history.location.search);
      this.props.updateSalesforceCode(urlParams.get('code'))
      .then((res) => {
        if(res.status === 200) {
          NotificationManager.success("Authenticated Successfully.", 'Success');
        }
      }).catch((err) => {
        NotificationManager.error(err.message, 'Error');
      })
    } else {
      NotificationManager.error("No Authentication Code found. Please retry login to salesforce account.", 'Error');      
    }
    this.props.history.push('/integration')
  }

  render() {
    return (
      <div>
        <p>Salesforce Redirection.</p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSalesforceCode: (code) => dispatch(updateSalesforceCode(code))
  }
}

export default connect(null, mapDispatchToProps)(SalesforceRedirection);