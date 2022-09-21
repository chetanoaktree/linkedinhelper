import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSalesforceCode } from '../../actions/authActions';
import {NotificationManager} from 'react-notifications';

class HubspotRedirection extends Component {
  componentDidMount() {
    if(this.props.history.location.search) {
      NotificationManager.success("Authenticated Successfully.", 'Success');
      const urlParams = new URLSearchParams(this.props.history.location.search);
      this.props.updateSalesforceCode(urlParams.get('code'));
    } else {
      NotificationManager.error("No Authentication Code found. Please retry login to hubspot account.", 'Error');      
    }
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <p>Hubspot Redirection.</p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSalesforceCode: (code) => dispatch(updateSalesforceCode(code))
  }
}

export default connect(null, mapDispatchToProps)(HubspotRedirection);