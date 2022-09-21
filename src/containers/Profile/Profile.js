import React,{Component} from 'react';
import { connect } from 'react-redux';
import { saveHunter, set_session } from '../../actions/authActions';
import FormLoader from '../../components/Loader/FormLoader';
import {NotificationManager} from 'react-notifications';
import { Link } from 'react-router-dom';


class Profile extends Component {
	constructor(props){
		super(props)
		const userDetails =	JSON.parse(localStorage.userDetail)
		this.state = { 
			data: {
				firstname: userDetails.firstname,
				lastname: userDetails.lastname,
				company: userDetails.company,
				email: userDetails.email,
				uuid: userDetails.uuid
			},
			errors: {
			    firstname: '',
			    lastname: '',
			    company: '',
			    email: ''
			},
			submittedOnce: false
		}
	}


	checkEmpty = (dataToCheck) => {
		let {errors} = this.state
		let stopApicall = false

		for (var key in dataToCheck) {
				if(dataToCheck && dataToCheck[key].length === 0){
					errors[key] = "Field can't be blank"
					this.setState({errors})
					stopApicall = true
				}
				else{
					errors[key] = ""
					this.setState({errors})
				}
			}

	return stopApicall
	}
	

	onChange =(e) => {
		let {data} = this.state 
		data[e.target.name] = e.target.value
		//this.checkEmpty(data)
		this.setState({data: data})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.setState({submittedOnce: true})
		// let stopApicall = false;

		let {data} = this.state

		let dataToSend = data
	    //stopApicall = this.checkEmpty(dataToSend)

		//!stopApicall && 
		this.props.saveHunter(dataToSend).then(
		(res) => {
			// console.log('res',res)
			if(res.data.status === 404){
				NotificationManager.error(res.data.message, 'Error');	
			}else{
				NotificationManager.success('Profile is updated.', 'Update');	
				this.props.set_session(res)
				this.props.history.push('/')
			}
			
			// 
		})
		
	}

	render(){
		let {data,errors,submittedOnce} = this.state
		let {isLoading} = this.props
		return(
		<main >
			{/* <section className="page-heading-breadcrumb-section">
				<div className="container">
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
							<li className="breadcrumb-item active"><Link to="#">Edit Profile</Link></li>
					</ol>
				</nav>
				</div>
			</section> 				 */}
		   <div className="container">
			<div className="row">
				<div className="col-md-2">

				</div>
				<div className="col-md-8">
					{isLoading ? 

					<div className="card mt-4">
						<FormLoader loading={true} /> 
					</div>	

					:
					<form className="">
							<div className="edit-profile-form-container">
								<div className="card">
							<div className="card-body">
								<div className="add-campaign-upper-section">      
									<div className="form-group">
										<div className="">
										<label htmlFor="firstname" > First Name<span className="asterisk">*</span></label>
										</div>
										<div className="">
										<input type="text" className="form-control" name="firstname" defaultValue={data.firstname} 
										onChange={this.onChange} placeholder="First Name" 
										/>
										</div>  
									</div>
									<div className="row">
										<span className="error_template_form">{submittedOnce && errors.firstname.length > 0 ? 
											errors.firstname: ''}
											</span>
									</div>
									<div className="form-group ">
										<div className="">
										<label htmlFor="lastname" > Last Name<span className="asterisk">*</span></label>
										</div>
										<div className="">
										<input type="text" className="form-control" name="lastname" defaultValue={data.lastname} 
										onChange={this.onChange} placeholder="Last Name" 
										/>  
										</div>
									</div>
									<div className="row">      
										<span className="error_template_form">{submittedOnce && errors.lastname.length > 0 ? 
										errors.lastname: ''}
										</span>                           
									</div>
								
									<div className="form-group ">
										<div className="">
										<label htmlFor="email" > Email</label>
										</div>
										<div className="">
										<input type="text" className="form-control" name="email" defaultValue={data.email} 
										onChange={this.onChange} placeholder="Email" readOnly
										/>  
										</div>
									</div>
									<div className="row">         
										<span className="error_template_form">{submittedOnce && errors.email.length > 0 ? 
										errors.email: ''}
										</span>                           
									</div>
									<div className="form-group ">   
										<div className="">
										<label htmlFor="company" > Company Name</label>
										</div>   
										<div className="">
										<input type="text" className="form-control" name="company" defaultValue={data.company} 
										onChange={this.onChange} placeholder="Company Name" 
										/>
										</div>
									</div>	
									<div className="row">
										<span className="error_template_form">{submittedOnce && errors.company.length > 0 ? 
											errors.company: ''}
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
										Save
										</button>
										&nbsp;
									<button type="reset" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/campaign')} className="btn btn-custom-primary mb-4 mt-4">
										Cancel
									</button>
									</div>       
							</div>

					</form>
					}
				</div>

			<div className="col-md-2">

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
    set_session: (data) => dispatch(set_session(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
