import React,{Component} from 'react';
import { connect } from 'react-redux';
import { saveTemplate,fetchTemplate,updateTemplate } from '../../actions/templateActions';
import FormLoader from '../../components/Loader/FormLoader';
import {NotificationManager} from 'react-notifications';


class TemplateForm extends Component {
	constructor(props){
		super(props)
		this.state = { 
			data: {
				template_name: '',
				// template_subject: '',
				body: '',
				// template_type: 'normal'
			},
			errors: {
			    template_name: '',
				// template_subject: '',
				body: '',
				// template_type: ''	
			},
			submittedOnce: false
		}
		this.onSelect = this.onSelect.bind(this)
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

	onSelect(param,e){
		e.preventDefault()
		let {data} = this.state
		data['body'] = data.body +param
		this.setState({data: data})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.setState({submittedOnce: true})
		// let stopApicall = false;

		let {data} = this.state

		if(this.props.fromUpdate){
			let dataToSend = data
			dataToSend.id = new URLSearchParams(this.props.location.params).get('id')
			let stopApicall = this.checkEmpty(dataToSend)
			!stopApicall && this.props.updateTemplate(dataToSend).then(
			() => {
			    NotificationManager.success('Template Updated', 'Updated');
				this.props.history.push('/templates')
	     	})
		}
		else{
			let dataToSend = data
		    let stopApicall = this.checkEmpty(dataToSend)
			!stopApicall && this.props.saveTemplate(dataToSend).then(
			() => {
				NotificationManager.success('Template Created', 'Created');
				this.props.history.push('/templates')
			})
		}
		
	}

	componentDidMount(){
		// console.log("this.props.location",this.props)
		// console.log("---",new URLSearchParams(this.props.location.params).get('id') )
		if(this.props.fromUpdate){
			this.props.fetchTemplate(new URLSearchParams(this.props.location.params).get('id')).then(
				(res) => {
					if(res.status !== 404){
						let dataFetched = {}
						dataFetched.template_name = res.template_name || ''
						// dataFetched.template_subject = res.template_subject || ''
						dataFetched.body = res.body || ''
						// dataFetched.template_type = res.template_type || 'normal'
						this.setState({data: dataFetched,submittedOnce: true})
					}else{
						NotificationManager.error(res.message, 'Error');
          				this.props.history.push('/templates')
					}
				})
		}
	}


	render(){
		let {data,errors,submittedOnce} = this.state
		let {isLoading,fromUpdate} = this.props

		// const Item = ({ entity: { name, char } }) => <div>{`${name}`}</div>;
		// console.log('data',data)
		return(
				<div className="row pt-4">
					<div className="col-md-2"></div>
					<div className="col-md-8">
						{
							isLoading ? 
							<div className="card">
								<div className="text-center">
									<FormLoader loading={true} />
								</div>
							</div>	
						:
						<form className="">
							<div className="card">
								<div className="card-body">
									<div className="add-campaign-upper-section">
										{/*<div className="form-group row">
											<label htmlFor="template_type" className="col-sm-3"> Type</label>
											<select className="form-control col-sm-3" onChange={this.onChange}  value={data.template_type} name="template_type">
												<option  value="normal"> Normal Template </option>
												<option value="linkedin"> Linkedin Template </option> 
											</select>
										</div>*/}
											<div className="form-group">
												<label htmlFor="template_name" className=""> Name<span className="asterisk">*</span></label>
												<input type="text" className="form-control" name="template_name" defaultValue={data.template_name} 
												onChange={this.onChange} placeholder="Template Name" 
												required/>
																			
											</div>
											<div className="form-group error"> 
												<span className="error_template_form">{submittedOnce && errors.template_name.length > 0 ? 
													errors.template_name: ''}
												</span>
											</div>

										{ /* data.template_type == 'normal' ? 

										<React.Fragment>

											<div className="form-group row">
												<label htmlFor="template_subject" className="col-sm-3"> Subject</label>
												<textarea className="form-control col-sm-9" name="template_subject" defaultValue={data.template_subject} 
													onChange={this.onChange} placeholder="Template Subject" rows={2} required>
												</textarea>
											</div>
											<div className="form-group error"> 
													<span className="error_template_form">{submittedOnce && errors.template_subject.length > 0 ? 
														errors.template_subject: ''}
														</span>
													</div> 
											</React.Fragment>  
											:
											''
											*/}
										<div className="form-group">
											<span className="">
												
												<button className="btn btn-dark" onClick={this.onSelect.bind(this,"_FN_")}>First Name</button>
												<button className="btn btn-dark ml-1" onClick={this.onSelect.bind(this,"_LN_")}>Last Name</button>
												<button className="btn btn-dark ml-1" onClick={this.onSelect.bind(this,"_TI_")}>Title Name</button>
												{/*<button className="btn btn-info ml-1" onClick={this.onSelect.bind(this,"{company | fallback:'ENTER FALLBACK HERE'}")}>Company</button>
												<button className="btn btn-info ml-1" onClick={this.onSelect.bind(this,"{education | fallback:'ENTER FALLBACK HERE'}")}>Education</button>
												<button className="btn btn-info ml-1" onClick={this.onSelect.bind(this,"{industries | fallback:'ENTER FALLBACK HERE'}")}>Industries</button>*/}
												<button className="btn btn-dark ml-1" onClick={this.onSelect.bind(this,"_LO_")}>Location</button>
												<button className="btn btn-dark ml-1" onClick={this.onSelect.bind(this,"_PO_")}>Position</button>
												
											</span>
											{/*<select className="form-control col-sm-3" onChange={this.onSelect}  name="prefield_type">
												<option value=""> Select </option>
												<option value="{fullname | fallback:'ENTER FALLBACK HERE'}"> Full Name </option>
												<option value="{firstname | fallback:'ENTER FALLBACK HERE'}"> First Name </option> 
												<option value="{lastname | fallback:'ENTER FALLBACK HERE'}"> Last Name </option> 
												<option value="{company | fallback:'ENTER FALLBACK HERE'}"> Company </option> 
												<option value="{education | fallback:'ENTER FALLBACK HERE'}"> Education </option> 
												<option value="{industries | fallback:'ENTER FALLBACK HERE'}"> Industries </option> 
												<option value="{location | fallback:'ENTER FALLBACK HERE'}"> Location </option> 
											</select> */}
										</div>   
										<div className="form-group">
											<label htmlFor="body" className=""> Body<span className="asterisk">*</span></label>
											<textarea className="form-control" name="body" value={data.body} 
												onChange={this.onChange} rows={10} placeholder="Template Body" required>
											</textarea>
										</div>    
										<div className="form-group error"> 
												<span className="error_template_form">{submittedOnce && errors.body.length > 0 ? 
													errors.body: ''}
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
										<button type="reset" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/templates')} className="btn btn-custom-primary mb-4 mt-4">
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
    campaigns: state.campaigns,
    template: state.template,
    selectedCampaigns: state.selectedCampaigns,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveTemplate: (data) => dispatch(saveTemplate(data)),
    updateTemplate: (data) => dispatch(updateTemplate(data)),
    fetchTemplate: (id) => dispatch(fetchTemplate(id))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
