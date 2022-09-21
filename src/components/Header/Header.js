import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.svg';


class Header extends Component {

  constructor(props){
    super(props)
    this.state = { 
      search: ''
    }
  }

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/')
  }

  searchMembers = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push({
        pathname: "/search",
        state: { 'search': this.state.search },
    });
  }


  render() {
    const { auth } = this.props;
    
    var route = this.props.location.pathname
    var path = route.split('/');

    var isActive = ""
    var isActive1 = ""
    var isActive2 = ""
    var isActive3 = ""
    var isActive4 = ""
    var isActive5 = ""
    var isActive6 = ""
    var isActive7 = ""
    var searchPage = false;
    // var isActive8 = ""

    if(path[1] === "campaign"  || path[1] === "campaigns"){
      isActive1 = "active"
    }else if(path[1] === "templates"){
      isActive2 = "active"
    }else if(path[1] === "profile" || path[1] === "integration" || path[1] === "plan" || path[1] === "settings"){
      isActive3 = "active"
    }else if(path[1] === "login"){
      isActive4 = "active"
    }else if(path[1] === "signup"){
      isActive5 = "active"
    }else if(path[1] === "blacklist"){
      isActive6 = "active"
    }else if(path[1] === "listing"){
      isActive7 = "active"
    }else if(path[1] === "members"){
      // isActive8 = "active"  
    }else if(path[1] === "dashboard"){
      isActive = "active"  
    } else if(path[1] === "search"){
      searchPage = true      
    }else{
      isActive = ""
    }
    
    if(!auth.isAuthenticated) return null;
    return (
        <header className="">
            <nav className="navbar navbar-light navbar-expand-lg">
                <div className="container">
                {
                  auth.isAuthenticated && (
                    <Link className="navbar-brand" to="/"><img src={logo} alt="logo" className="site-main-logo"/> <span className="logo-text ">Linked Advance Helper</span></Link>
                 
                  
                      )
      }
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* {localStorage.PlanName && <div className="ribbon ribbon-top-left"><span>{localStorage.PlanName}</span></div>} */}
                    
                
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        {/*<ul className="nav navbar-nav ">
                            {
                              auth.isAuthenticated ? (
                                <React.Fragment>
                                  <li className="nav-item active">
                                      <Link className="nav-link" to="/campaign">Campaign <span className="sr-only">(current)</span></Link>
                                  </li>
                                  {<li className="nav-item active">
                                  <Link className="nav-link" to="/templates">Templates</Link>
                                  </li>}
                                </React.Fragment>
                              ) : null
                            }

                        </ul>*/}
                        {
                          auth.isAuthenticated && (
                           <form className="form-inline ml-auto" onSubmit={this.handleSubmit}>
                              <div className="input-group">
                                  <div className="input-group-btn" id="global-search-input-box-search-icon-container">
                                      <i className="fa fa-search" aria-hidden="true" id="global-search-input-box-search-icon"></i>
                                  </div>
                                  <input className="form-control" 
                                      type="text" placeholder="Search" 
                                      name="search"
                                      disabled={searchPage}
                                      value={searchPage ? '' : this.state.search}  
                                      onChange={this.searchMembers}
                                      onBlur={this.handleSubmit}
                                    aria-label="Search" id="global-search-input-box"/>

                              </div>
                          </form>) 
                        }

                        <ul className="nav navbar-nav ml-auto">
                            {
                              auth.isAuthenticated ? (
                                <React.Fragment>
                                  <li className={"nav-item " + isActive1 }>
                                      <Link className="nav-link" to="/campaign">Campaigns <span className="sr-only">(current)</span></Link>
                                  </li>
                                  <li className={"nav-item " + isActive2 }>
                                      <Link className="nav-link" to="/templates">Templates</Link>
                                  </li>
                                  <li className={"nav-item " + isActive6 }>
                                      <Link className="nav-link" to="/blacklist">Blacklist</Link>
                                  </li>
                                  <li className={"nav-item " + isActive7 }>
                                      <Link className="nav-link" to="/listing">List</Link>
                                  </li>
                                  {/*<li className={"nav-item " }>
                                      <Link className="nav-link" to="/members">Invite</Link>
                                  </li>*/}
                                  <li className={"nav-item dropdown " + isActive3 }>
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Hi {localStorage.firstName}
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link className="dropdown-item" to="/profile"><i className="fa fa-user" aria-hidden="true"></i> Edit Profile</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="/members"><i className="fa fa-users" aria-hidden="true"></i> Invite</Link>
                                                 <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="/integration"><i className="fas fa-database"></i> Integration</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="/plan"><i className="fa fa-tasks" aria-hidden="true"></i> Upgrade Plans</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="/historys"><i className="fa fa-history" aria-hidden="true"></i> History</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="/settings"><i className="fa fa-cog" aria-hidden="true"></i> Settings</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="#" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link>
                                    </div>
                                  </li>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  {/* <li className={"nav-item dropdown " + isActive4 }>
                                        <Link className="nav-link" to="/login"><i className="fa fa-user" aria-hidden="true"></i> Sign In</Link>
                                  </li> 
                                  
                                  <li className={"nav-item dropdown " + isActive5 }>
                                    <Link className="nav-link" to="/signup"> <i className="fa fa-sign-out" aria-hidden="true"></i> Sign Up</Link>
                                  </li> */}

                                  {/*<li className="nav-item dropdown">
                                      <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          
                                      </Link>
                                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                              <Link className="dropdown-item" to="/"><i className="fa fa-user" aria-hidden="true"></i> Login</Link>
                                              <div className="dropdown-divider"></div>
                                              <Link className="dropdown-item" to="/signup"> <i className="fa fa-sign-out" aria-hidden="true"></i> Signup</Link>
                                      </div>
                                  </li>*/}
                                </React.Fragment>
                              )
                            }
                        </ul>

                    </div>
                </div>
              </nav>
        </header>
    )
  }
}

Header.contextTypes = {
    router: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

function mapStateToProps(state) {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);