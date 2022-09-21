import React,{Component} from 'react';
import { connect } from 'react-redux';
import { users, saveHunter, searchEmail } from '../../actions/authActions';
import Loader from '../../components/Loader/Loader';
import {NotificationManager} from 'react-notifications';
import { Link } from 'react-router-dom';
import { consumerKey, callbackUrl, hubspotClientKey, hubspotRedirectUrl } from '../../constants/env.js'
import ContentLoader from 'react-content-loader'
import './style.scss';

const EmailFinderLoader = (props) => (
     <ContentLoader 
        speed={2}
        width={'100%'}
        height={100}
        title="Please wait, fetching emails."
        backgroundColor="#f3f3f3"
        foregroundColor="#C8BFBD"
        {...props}
      >
        <rect x="0" y="20" rx="2" ry="2" width="95%" height="10" /> 
        <rect x="0" y="40" rx="2" ry="2" width="95%" height="10" /> 
        <rect x="0" y="60" rx="2" ry="2" width="95%" height="10" /> 
        <rect x="0" y="80" rx="2" ry="2" width="95%" height="10" /> 
      </ContentLoader>
)

class Hunter extends Component {
	constructor(props){
		super(props)
		this.state = { 
			finderData: {
				fullname: "",
				domain: ""
			},
			data: {
				hunter_api_key: '',
				aeroleads_api_key: '',
				prospect_api_key: '',
				anymail_api_key: '',
				uuid: ''
			},
			errors: {
			    hunter_api_key: ''	
			},
			submittedOnce: false
		}
	}


	checkEmpty = (dataToCheck) => {
		let newState = Object.assign({}, this.state);
		let stopApicall = false

		for (var key in dataToCheck) {
				if(dataToCheck && (key === 'hunter_api_key') && dataToCheck[key].length === 0){
					newState.errors[key] = "Field can't be blank"
					stopApicall = true
				}
				else{
					newState.errors[key] = ""
				}
		}
		this.setState(newState)
		return stopApicall
	}
	

	onChange =(e) => {
		let newState = Object.assign({}, this.state);
		newState.data[e.target.name] = e.target.value
		this.setState(newState)
	}

	handleSubmit = (e) => {
		e.preventDefault()
		let stopApicall = false;

		let {data} = this.state

		let dataToSend = data
	    stopApicall = this.checkEmpty(dataToSend)
		if(!stopApicall) {
			this.props.saveHunter(dataToSend).then(
			(res) => {
				// console.log('res',res)
				if(res.data.status === 404){
					NotificationManager.error(res.data.message, 'Error');	
				}else{
					NotificationManager.success('Integration keys has been updated successfully.', 'Save');	
					this.props.history.push('/campaign')
				}
				this.setState({submittedOnce: true})				
				// 
			})			
		} 
		
	}

	componentDidMount = () => {
		const userDetails =	JSON.parse(localStorage.userDetail)
		this.props.users(userDetails.uuid).then(
		(res) => {
			if (res.status === 200) {
				// let dataFetched = {}
				let newState = Object.assign({}, this.state);
				newState.data.hunter_api_key = res.user.hunter_api_key || ''
				newState.data.aeroleads_api_key = res.user.aeroleads_api_key || ''
				newState.data.prospect_api_key = res.user.prospect_api_key || ''
				newState.data.anymail_api_key = res.user.anymail_api_key || ''
				newState.data.uuid = res.user.uuid || ''
				newState.submittedOnce = true
				this.setState(newState)
			}
		});
	}

	changeFinderFields = (e) => {
		let newState = Object.assign({}, this.state);
		newState.finderData[e.target.name] = e.target.value
		this.setState(newState)
	}

	validateEmailFinder = () => {
		const {finderData} = this.state;
		let validate = false
		const regex = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i;
		if(regex.test(finderData.domain)) {
			validate = true
		} else {
			NotificationManager.error("Domain name is incorrect.", 'Error');
		}
		return validate
	}

	findEmail = (e) => {
		e.preventDefault();
		if(this.validateEmailFinder()) {
			this.props.searchEmail(this.state.finderData)
			.then((res) => {
				if(res.status !== 200) {
					NotificationManager.error(res.statusText, 'Error');					
				}
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		}
	}

	hubspotLogin = () => {
		const url = `https://app.hubspot.com/oauth/authorize?client_id=${hubspotClientKey}&redirect_uri=${hubspotRedirectUrl}&scope=oauth`
		window.location.href = url;
	}

	salesforceLogin = () => {
		const url = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${consumerKey}&redirect_uri=${callbackUrl}&scope=api&full_access`
		window.location.href = url;
	}

	render(){
		let {data , errors, submittedOnce} = this.state
		let {isLoading} = this.props
		return(
		<main>
          <section className="page-heading-breadcrumb-section">
            <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item active"><Link to="#">Integration</Link></li>
              </ol>
            </nav>
            </div>
          </section>				
		   <div className="container">
			<div className="row integration-tabs">
			  <div className="col-xs-12 col-md-12 ">
			    <nav>
			      <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
			        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Email Services</a>
			        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Email Finder</a>
			        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">CRM Integration</a>
			      </div>
			    </nav>

			    <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
			      <div className="tab-pane fade show active clearfix" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
					<div>
					  {isLoading ? 
					  	 <EmailFinderLoader loading={true} /> 
					       :
					        <form>
			                  <div className="mb-3 mt-3">
			                      <div className="card-body">
			                          <div className="add-campaign-upper-section">
			                                <div className="form-group row">
			                                      <label htmlFor="hunter_api_key" className="col-sm-3"> Hunter API Key</label>
				                                  <input type="text" className="form-control col-sm-9" name="hunter_api_key" value={data.hunter_api_key} 
				                                  onChange={this.onChange} placeholder="Hunter API Key" 
				                                  />
				                            </div>
				                            {
				                            	(submittedOnce && errors.hunter_api_key.length > 0) ? (
						                            <div className="row"> 
						                              <div className="col-sm-3"> </div>
						                             <span className="error_template_form">{errors.hunter_api_key}
						                             </span>
						                            </div>
				                            	) : null
				                            }

			                          </div>
			                          <div className="add-campaign-upper-section">
			                                <div className="form-group row">
			                                      <label htmlFor="aeroleads_api_key" className="col-sm-3"> Aeroleads API Key</label>
				                                  <input type="text" className="form-control col-sm-9" name="aeroleads_api_key" value={data.aeroleads_api_key} 
				                                  onChange={this.onChange} placeholder="Aeroleads API Key" 
				                                  />
				                                                             
				                            </div>
				                            

			                          </div>
			                          <div className="add-campaign-upper-section">
			                                <div className="form-group row">
			                                      <label htmlFor="prospect_api_key" className="col-sm-3"> Prospect API Key</label>
				                                  <input type="text" className="form-control col-sm-9" name="prospect_api_key" value={data.prospect_api_key} 
				                                  onChange={this.onChange} placeholder="Prospect API Key" 
				                                  />
				                            </div>
				                            

			                          </div>
			                          <div className="add-campaign-upper-section">
			                                <div className="form-group row">
			                                      <label htmlFor="anymail_api_key" className="col-sm-3"> Anymail finder API Key</label>
				                                  <input type="text" className="form-control col-sm-9" name="anymail_api_key" value={data.anymail_api_key} 
				                                  onChange={this.onChange} placeholder="Anymail finder API Key" 
				                                  />
				                                                             
				                            </div>
				                            

			                          </div>
			                          
			                      </div>
			                  </div>
			                  <div className="save-cancel-button-container pull-right mr-3">
			                      <button 
			                          type="submit" 
			                          name="save-new-campaign-button" 
			                          onClick={this.handleSubmit} 
			                          className="btn btn-dark mb-3">
			                          Save
			                        </button>
			                         &nbsp;
			                       <button type="reset" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/campaign')} className="btn btn-custom-primary mb-3">
			                       Cancel
			                       </button>
			                  </div>
		                   </form>
		                  }
					</div>
			      </div>
			      <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
	                   <div className="mb-3 mt-3">
     	                  <div className="card-body">
			                <h3 className="head text-center">Welcome to Email Finder<sup></sup></h3>
		                    <p className="narrow text-center">
		                      Please enter your Full name & Email, and click on search, this will search the more relevant email possible with the provided information. 
		                      <br />Example Domain: <strong>app.linkedadvancedhelper.com</strong>
		                    </p>
							<section className="search-sec">
							    <div className="container">
							        <form onSubmit={this.findEmail}>
							            <div className="row">
							                <div className="col-lg-12">
							                    <div className="row">
							                        <div className="col-lg-5 col-md-5 col-sm-12 p-0">
							                            <input type="text" name="fullname" onChange={this.changeFinderFields} className="form-control search-slt" placeholder="Enter Fullname" required/>
							                        </div>
							                        <div className="col-lg-5 col-md-5 col-sm-12 p-0">
							                            <input type="text" name="domain" onChange={this.changeFinderFields} className="form-control search-slt" placeholder="Enter Domain" required/>
							                        </div>
							                        <div className="col-lg-2 col-md-2 col-sm-12 p-0">
							                            <button type="submit" className="btn btn-custom-primary wrn-btn">Search</button>
							                        </div>
							                    </div>
							                </div>
							            </div>
							        </form>
							    </div>
							</section>
        	              </div>
	                    </div>
			      </div>
			      <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
	                <div className="mb-3 mt-3">
	                    <div className="card-body">
			                <h3 className="head text-center">Welcome to Integration Services<sup></sup></h3>
		                    <p className="narrow text-center">
		                      Please select your configuration method, authenticate and sync data to your web platform smoothly.
		                    </p>
							<div className="mt-3 text-center">
							    <button className="btn btn-custom-primary" onClick={this.salesforceLogin}>Salesforce Login</button>
					 		    <button className="btn btn-dark ml-1" onClick={this.hubspotLogin}>Hubspot Login</button>
								<button className="btn btn-custom-primary" onClick = {this.zapierLogin}>Zapier Login</button>
							</div>
	                    </div>
	                </div>
			      </div>
			    </div>
			  </div>
			</div>
		   </div>
		</main>   
		)
	}
} 


const mapStateToProps = (state) => {
  return {
    hunter: state.hunter,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveHunter: (data) => dispatch(saveHunter(data)),
    searchEmail: (data) => dispatch(searchEmail(data)),
    users: (uuid) => dispatch(users(uuid))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Hunter);
