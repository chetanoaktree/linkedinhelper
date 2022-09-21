import React,{Component} from 'react';
import { connect } from 'react-redux';
import { saveBlacklist,fetchBlacklist,updateBlacklist } from '../../actions/blacklistActions';
import FormLoader from '../../components/Loader/FormLoader';
import {NotificationManager} from 'react-notifications';


class BlackListForm extends Component {
	constructor(props){
		super(props)
		this.state = { 
			data: {
				profile_url: '',
				// template_subject: '',
				description: '',
				// template_type: 'normal'
			},
			errors: {
			    profile_url: '',
				// template_subject: '',
				description: '',
				// template_type: ''	
			},
			submittedOnce: false
		}
	}


	checkEmpty = (dataToCheck) => {
		let {errors} = this.state
		let stopApicall = false

		for (var key in dataToCheck) {
				if(dataToCheck && dataToCheck[key].length === 0){
					// if(key !== 'template_subject' ){
						errors[key] = "Field can't be blank"
						this.setState({errors})
						stopApicall = true
					// }
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
		// if(e.target.name === "template_type"){
	 //        data.template_subject = ''
		// } 
		data[e.target.name] = e.target.value
		this.checkEmpty(data)
		this.setState({data: data})
	}

	
	handleSubmit = (e) => {
		e.preventDefault()
		this.setState({submittedOnce: true})
		// let stopApicall = false;

		let {data} = this.state

		if(this.props.fromUpdate){
			let dataToSend = data
			dataToSend.id = this.props.location.state.templateId
			let stopApicall = this.checkEmpty(dataToSend)
			!stopApicall && this.props.updateBlacklist(dataToSend).then(
			() => {
			    NotificationManager.success('Blacklist Updated', 'Updated');
				this.props.history.push('/blacklist')
	     	})
		}
		else{
			let dataToSend = data
		    let stopApicall = this.checkEmpty(dataToSend)
			!stopApicall && this.props.saveBlacklist(dataToSend).then(
			(res) => {
				NotificationManager.success(res.data.message, 'Created');
				this.props.history.push('/blacklist')
			})
		}
		
	}

	componentDidMount = () => {
		if(this.props.fromUpdate){
			this.props.fetchBlacklist(this.props.location.state.templateId).then(
				(res) => {
					let dataFetched = {}
					dataFetched.profile_url = res.profile_url || ''
					// dataFetched.template_subject = res.template_subject || ''
					dataFetched.description = res.description || ''
					// dataFetched.template_type = res.template_type || 'normal'
					this.setState({data: dataFetched,submittedOnce: true})
				})
		}
	}


	render(){
		let {data,errors,submittedOnce} = this.state
		let {isLoading,fromUpdate} = this.props

		// const Item = ({ entity: { name, char } }) => <div>{`${name}`}</div>;
		// console.log('data',data)
		return(
			<div className="row">
				<div className="col-md-2"></div>
				<div className="col-md-8">
					{isLoading ? 
						<div className="card mt-4">
							<FormLoader loading={true} /> 
						</div>	   
						:
						<form className="pt-4">
							<div className="card mb-3 mt-3">
								<div className="card-body">
									<div className="add-campaign-upper-section">
										
											<div className="form-group">
												<label htmlFor="profile_url" className=""> Linkedin Profile URL<span className="asterisk">*</span></label>
												<input type="text" className="form-control" name="profile_url" defaultValue={data.profile_url} 
												onChange={this.onChange} placeholder="Linkedin Profile URL" 
												required/>
																			
											</div>
											<div className="form-group error"> 
												<span className="error_template_form">{submittedOnce && errors.profile_url.length > 0 ? 
													errors.profile_url: ''}
												</span>
											</div>

										<div className="form-group ">
											<label htmlFor="description" className=""> Description<span className="asterisk">*</span></label>
											<textarea className="form-control" name="description" value={data.description} 
												onChange={this.onChange} rows={10} placeholder="Description" required>
											</textarea>
										</div>    
										<div className="form-group error">
												<span className="error_template_form">{submittedOnce && errors.description.length > 0 ? 
													errors.description: ''}
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
									{ fromUpdate  ? 'Update' : 'Save'}
									</button>
									&nbsp;
								<button type="reset" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/blacklist')} className="btn btn-custom-primary mb-4 mt-4">
								Cancel
								</button>
							</div>
							
						</form>
						}
				</div>
				<div className="col-md-2"></div>

			</div>
		)
	}
} 


const mapStateToProps = (state) => {
  return {
    selectedCampaigns: state.selectedCampaigns,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveBlacklist: (data) => dispatch(saveBlacklist(data)),
    updateBlacklist: (data) => dispatch(updateBlacklist(data)),
    fetchBlacklist: (id) => dispatch(fetchBlacklist(id))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlackListForm);
