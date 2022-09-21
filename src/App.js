import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Dashboard from './containers/Dashboard/Dashboard';
import CampaignDashboard from './containers/Campaign/Dashboard';
import CampaignPlay from './containers/Campaign/CampaignPlay';
// import CampaignEmail from './containers/Campaign/CampaignEmail';
import Invitation from './containers/Campaign/Invitation';
// import Scraping from './containers/Campaign/Scraping';
import Member from './containers/Members/Member';
import SearchResult from './containers/Search/Result';
import CampaignForm from './containers/Campaign/Form';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginForm from './containers/Login/LoginForm';
import PasswordReset from './containers/Password/Reset';
import PasswordRecovery from './containers/Password/Recovery';
import Template from './containers/Template/index';
import CreateTemplate from './containers/Template/CreateTemplate';
import UpdateTemplate from './containers/Template/UpdateTemplate';
import BlackList from './containers/BlackList/index';
import CreateBlackList from './containers/BlackList/CreateBlackList';
import UpdateBlackList from './containers/BlackList/UpdateBlackList';
import Listings from './containers/Listings/index';
import CreateListings from './containers/Listings/CreateListings';
import UpdateListings from './containers/Listings/UpdateListings';
import ListingMember from './containers/Listings/Member';
import Hunter from './containers/Hunter/Hunter';
import Profile from './containers/Profile/Profile';
import Plans from './containers/Plans/Plans';
import Invite from './containers/Invite/Invite';
import InviteMember from './containers/Invite/InviteMember';
import RecoveryConfirmation from './containers/Password/Confirm';
import SingupForm from './containers/Signup/Form';
import AddMember from './containers/AddMember/Form';
import Aboutus from './containers/Aboutus/Aboutus';
import Settings from './containers/Settings/Settings';
import Features from './containers/Features/Features';
import CaseStudy from './containers/CaseStudy/CaseStudy';
import Contactus from './containers/Contactus/Contactus';
import PrivacyPolicy from './containers/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from './containers/TermsOfUse/TermsOfUse';
import FAQ from './containers/FAQ/FAQ';
import History from './containers/History/History';
import NoRouteFound from './components/NoRoute/NoRoute';
import SalesforceRedirection  from './components/Integration/SalesforceRedirection';
import HubspotRedirection  from './components/Integration/SalesforceRedirection';

// import './App.css';
// import './assets/common.css';

import './assets/scss/style.css';
import './assets/css/plugins/animate.css';
import './assets/css/plugins/flaticon.css';
import './assets/css/plugins/fontawesome.min.css';
import './assets/css/plugins/swiper-bundle.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';


class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <div className="app-frame">{this.props.children}</div>
    )
  }
}


function PublicOnlyRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => (!localStorage.accessToken)
        ? <Component {...props} />
        : <Redirect to={{pathname: '/campaign', state: {from: props.location}}} />}
    />
  )
}

function PrivateRoute ({component: Component, authed, ...rest}) {

  console.log(rest)
  return (
    <Route
      {...rest}
      render={(props) => localStorage.accessToken
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

const App = class App extends Component {

  render() {
    let { location, history, auth } = this.props;
    
    return (
      <ScrollToTop location={this.props.location}>
          <NotificationContainer/>
          <Header location={this.props.location} history={history}/>
          <Switch>
            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/login" exact component={LoginForm} />

            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/edit/password" exact component={RecoveryConfirmation} />
            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/recover" exact component={PasswordRecovery} />
            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/invitations/add_member" exact component={AddMember} />
            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/password-reset" exact component={PasswordReset} />
            <PublicOnlyRoute history={history} location={location} path="/about-us" exact component={Aboutus} />
            <PublicOnlyRoute history={history} location={location} path="/feature" exact component={Features} />
            <PublicOnlyRoute history={history} location={location} path="/contact-us" exact component={Contactus} />
            <PublicOnlyRoute history={history} location={location} path="/case-study" exact component={CaseStudy} />
            <PublicOnlyRoute history={history} location={location} path="/privacy-policy" exact component={PrivacyPolicy} />
            <PublicOnlyRoute history={history} location={location} path="/terms" exact component={TermsOfUse} />
            <PublicOnlyRoute history={history} location={location} path="/faq" exact component={FAQ} />

            <PublicOnlyRoute history={history} location={location} path="/plan" exact component={Plans} />
            
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/" exact component={Dashboard} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/campaign" exact component={CampaignDashboard} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/campaign/new" exact component={CampaignForm} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/campaign/update/:id" exact component={CampaignForm} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/campaign/play/:id" exact component={CampaignPlay} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/campaigns/:id/members" exact component={Member} />
            
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/invitation" exact component={Invitation} />
            
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/templates" exact component={Template} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/templates/new" exact component={CreateTemplate} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/templates/update/:id" exact component={UpdateTemplate} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/blacklist" exact component={BlackList} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/blacklist/new" exact component={CreateBlackList} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/blacklist/update/:id" exact component={UpdateBlackList} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/listing" exact component={Listings} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/listing/new" exact component={CreateListings} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/listing/update/:id" exact component={UpdateListings} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/listing/:id/members" exact component={ListingMember} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/integration" exact component={Hunter} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/profile" exact component={Profile} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/invite" exact component={Invite} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/settings" exact component={Settings} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/historys" exact component={History} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/search" exact component={SearchResult} /> 

            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/members" exact component={InviteMember} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/salesforce/callback" exact component={SalesforceRedirection} /> 
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/hubspot/callback" exact component={HubspotRedirection} /> 
            <Route component={NoRouteFound} />
          </Switch>
          <Footer location={location} authenticated={auth.isAuthenticated}/>
      </ScrollToTop>
    )
  }

// )
}

function mapStateToProps(state) {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(App);
