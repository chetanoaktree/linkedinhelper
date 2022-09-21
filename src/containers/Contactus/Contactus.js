import React,{Component} from 'react';
import { connect } from 'react-redux';
import { contactUs } from '../../actions/signupActions'
import FormLoader from '../../components/Loader/FormLoader';
import {NotificationManager} from 'react-notifications';
import { Link } from 'react-router-dom';


class Contactus extends Component {
	constructor(props){
		super(props)
		this.state = { 
			data: {
				full_name: '',
				company: '',
				email: '',
				message: ''
			},
			errors: {
			    full_name: '',
			    company: '',
			    email: '',
			    message: ''
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
		let {data} = this.state

		this.props.contactUs(data).then(
		(res) => {
			// console.log('res',res)
			if(res.data.status === 404){
				NotificationManager.error(res.data.message, 'Error');	
			}else{
				NotificationManager.success(res.data.message, 'Submit');
			}
		})
		
	}

	render(){
		let {data,errors,submittedOnce} = this.state
		let {isLoading} = this.props
		return(
		<main>
              <section className="page-heading-breadcrumb-section">
                  <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                              <li className="breadcrumb-item active"><Link to="#">Contact us</Link></li>
                        </ol>
                    </nav>
                  </div>
              </section> 				
		   <div className="container">
			<div className="row">
				<div className="col-md-2"></div>

				<div className="col-md-8">

				{isLoading ? 
					<div className="card mt-4">
						<FormLoader loading={true} /> 
					</div>
					:
					<form className="pt-4">
						<div className="card">
							<div className="card-body">
								<div className="add-campaign-upper-section">   

									<div className="form-group">
										<label htmlFor="full_name" className=""> Full Name</label>
										<input type="text" className="form-control" name="full_name" defaultValue={data.full_name} 
										onChange={this.onChange} placeholder="Full Name" 
										/>
									</div>
									<div className="row">
										<span className="error_template_form">{submittedOnce && errors.full_name.length > 0 ? 
											errors.full_name: ''}
											</span>
									</div>
									<div className="form-group ">
										<label htmlFor="email" className=""> Email</label>                                  	
										<input type="text" className="form-control" name="email" defaultValue={data.email} 
										onChange={this.onChange} placeholder="Email"
										/>
									</div>
									<div className="row">         
										<span className="error_template_form">{submittedOnce && errors.email.length > 0 ? 
										errors.email: ''}
										</span>                           
									</div>
									<div className="form-group">   
										<label htmlFor="company" className=""> Company Name</label>
										<input type="text" className="form-control" name="company" defaultValue={data.company} 
										onChange={this.onChange} placeholder="Company Name" 
										/>
									</div>	
									<div className="row">
										<span className="error_template_form">{submittedOnce && errors.company.length > 0 ? 
											errors.company: ''}
											</span>
									</div>  
									<div className="form-group ">
										<label htmlFor="message" className=""> Message</label>
										<textarea className="form-control" name="message" value={data.message} 
											onChange={this.onChange} rows={10} placeholder="Message" required>
										</textarea>
									</div>   

									<div className="row">      
										<span className="error_template_form">{submittedOnce && errors.message.length > 0 ? 
										errors.message: ''}
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
										Submit
										</button>
										&nbsp;
										<button type="reset" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/')} className="btn btn-custom-primary mb-4 mt-4">
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
    contactUs: (data) => dispatch(contactUs(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contactus);
