import React,{Component} from 'react';
import { connect } from 'react-redux';
import { inviteUser } from '../../actions/authActions';
import Loader from '../../components/Loader/Loader';
import FormLoader from '../../components/Loader/FormLoader';
import {NotificationManager} from 'react-notifications';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import { Link } from 'react-router-dom';


class Invite extends Component {
	constructor(props){
		super(props)
		this.state = { 
			emails: [],
			submittedOnce: false,
			errors: ''
		}
		this.onTagsChanged = this.onTagsChanged.bind(this)
	}


	checkEmpty = (dataToCheck) => {
		// let {errors} = this.state
		let stopApicall = false

		for (var key in dataToCheck) {
				if(dataToCheck && dataToCheck[key].length === 0){
					this.setState({errors: "Field can't be blank"})
					stopApicall = true
				}
				else{
					this.setState({errors: ''})
				}
			}

	return stopApicall
	}

	onTagsChanged(emails) {
      	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      	var arg = []
        for (var key in emails) {
        	if (reg.test(emails[key]) === false) {
        		NotificationManager.error("Email is Not Correct", 'Error');
        		return false;
        	}else{
        		arg.push(emails[key])
        	}
        }
        this.setState({emails: arg})
    }

	handleSubmit = (e) => {
		e.preventDefault()

		this.setState({submittedOnce: true})
		// let stopApicall = false;

		let {emails} = this.state
		if(emails.length > 0){
			let dataToSend = emails
	
			this.props.inviteUser(dataToSend).then(
			(res) => {
				if(res.data.status === 404){
					NotificationManager.error(res.data.message, 'Error');	
				}else{
					NotificationManager.success(res.data.message, 'Sent');	
					this.setState({emails: []})
					this.props.history.push('/members')
				}
				
				// 
			})
		}else{
			NotificationManager.error("Please enter valid email id", 'Error');
			this.setState({submittedOnce: false})
		}
		
		
	}

	render(){
		let {errors, submittedOnce} = this.state
		let {isLoading} = this.props
		return(
		<main>
          <section className="page-heading-breadcrumb-section">
            <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item active"><Link to="#">Invite</Link></li>
              </ol>
            </nav>
            </div>
          </section>				
		   <div className="container">
			<div className="row">
				<div className="col-md-2"></div>
				<div className="col-md-8">
					{isLoading ? (
							<div className="card mt-4">
								<FormLoader loading={true} />
							</div>	
						)
						:
							<form className="invite-user-form pt-3">
							<div className="card">
								<div className="card-body">
									<div className="add-campaign-upper-section">      
										<div className="form-group">
											<div className="">
											<label htmlFor="email" > Email</label>
											</div>
											<div className=""> 
											<TagsInput 
												value={this.state.emails}  
												onChange={this.onTagsChanged}
												addOnBlur={this.onTagsChanged}
												inputProps={{placeholder: "Please press enter or tab after giving your email address."}}
												/>
											</div>
										</div>
										<div className="row">         
											<span className="error_template_form">{submittedOnce && errors ? 
											errors : ''}
											</span>                           
										</div>
									
									</div>
								</div>
							</div>
							<div className="save-cancel-button-container text-center">
								<button 
									type="submit" 
									name="save-new-campaign-button" 
									onClick={this.handleSubmit} 
									className="btn btn-dark mb-4 mt-4">
									Send Invitation
								</button>
									&nbsp;
								<button type="reset" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/members')} className="btn btn-custom-primary mb-4 mt-4">
									Cancel
								</button>
							</div>       
						</form>
						}
				</div>
				<div className="col-md-2"></div>

			</div>
		   </div>	
		</main>   
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
    inviteUser: (data) => dispatch(inviteUser(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
