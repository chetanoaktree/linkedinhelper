import React,{Component} from 'react';
import { connect } from 'react-redux';
import { saveListing,fetchListing,updateListing } from '../../actions/listingActions';
import { fetchTemplates } from '../../actions/templateActions';
import FormLoader from '../../components/Loader/FormLoader';
import {NotificationManager} from 'react-notifications';
import {REACT_API_URL} from '../../constants/env.js'



class ListingsForm extends Component {
	constructor(props){
		super(props)
		this.state = { 
			data: {
				name: '',
				description: '',
				template_id: '',
				campaignMessage: ''
			},
			errors: {
			    name: '',
				description: ''
			},
			submittedOnce: false
		}
	}


	checkEmpty = (dataToCheck) => {
		let {errors} = this.state
		let stopApicall = false

		for (var key in dataToCheck) {
				if(dataToCheck && dataToCheck[key].length === 0){
					if(key === 'name' || key === 'description'){
						errors[key] = "Field can't be blank"
						this.setState({errors})
						stopApicall = true
					}
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

		const value = e.target.value

		const { templates } = this.props;
		console.log(e.target)
	    if(e.target.name === "template_id" && (templates.data.templateslength > 0 || typeof templates.data !== 'undefined')) {
	      templates.data.templates.map((row, index) => {

	        if(row.id === parseInt(value)){
			  // console.log("row",row)
			  
			data.campaignMessage = row.body;
	          this.setState({data: data})
	        }
	        return null
	      })
	    }
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
			!stopApicall && this.props.updateListing(dataToSend).then(
			(res) => {
			    NotificationManager.success(res.data.message, 'Updated');
				this.props.history.push('/listing')
	     	})
		}
		else{
			let dataToSend = data
		    let stopApicall = this.checkEmpty(dataToSend)
			!stopApicall && this.props.saveListing(dataToSend).then(
			(res) => {
				NotificationManager.success(res.data.message, 'Created');
				this.props.history.push('/listing')
			})
		}
		
	}

	componentDidMount = () => {
		if(this.props.fromUpdate){
			this.props.fetchListing(new URLSearchParams(this.props.location.params).get('id')).then(
				(res) => {
					if(res.status !== 404){
						let dataFetched = {}
						dataFetched.name = res.name || ''
						// dataFetched.template_subject = res.template_subject || ''
						dataFetched.description = res.description || ''
						dataFetched.template_id = res.template_id || ''
						dataFetched.campaignMessage = res.campaignMessage || ''
						// dataFetched.template_type = res.template_type || 'normal'
						this.setState({data: dataFetched,submittedOnce: true})
					}else{
						NotificationManager.error(res.message, 'Error');
          				this.props.history.push('/listing')
					}
				})
		}
		this.props.getTemplates(REACT_API_URL + `/templates`)
	}


	render(){
		let {data,errors,submittedOnce} = this.state
		let {template_id,campaignMessage} = this.state.data;
		let {isLoading, fromUpdate, templates} = this.props

		// const Item = ({ entity: { name, char } }) => <div>{`${name}`}</div>;
		console.log('data',this.state)
		return(
			<div className="row">
				<div className="col-md-2"></div>

				<div className="col-md-8">
						{isLoading ? 
								<div className="card mt-4">
									<FormLoader loading={true} /> 
								</div>

							:
								<form className="pt-4 pb-4">
								<div className="card">
									<div className="card-body">
										<div className="add-campaign-upper-section">
											
												<div className="form-group">
													<label htmlFor="name" className=""> Name aaa<span className="asterisk">*</span></label>
													<input type="text" className="form-control" name="name" defaultValue={data.name} 
													onChange={this.onChange} placeholder="Name" 
													required/>
																				
												</div>
												<div className="form-group error"> 
												<div className=""> </div>
												<span className="error_template_form">{submittedOnce && errors.name.length > 0 ? 
													errors.name: ''}
													</span>
												</div>

											<div className="form-group">
												<label htmlFor="description" className=""> Description<span className="asterisk">*</span></label>
												<textarea className="form-control" name="description" value={data.description} 
													onChange={this.onChange} rows={6} placeholder="Description" required>
												</textarea>
											</div>    
											<div className="form-group error"> 
												<div className=""> </div>
													<span className="error_template_form">{submittedOnce && errors.description.length > 0 ? 
														errors.description: ''}
														</span>
												</div>
										</div>

										<div className="form-group">
											<label htmlFor="template_id" className=""> Template</label>
											<select className="form-control" onChange={this.onChange} value={template_id}  name="template_id">
											<option value=""> Select </option>
											{(templates.length > 0 || typeof templates.data !== 'undefined') && templates.data.templates.map((row, index) => {
												return(
													<option key={index} value={row.id}> {row.template_name} </option>
												)
												})
											}
											</select>
											
										</div>
										<div className="form-group">
											<label htmlFor="campaignMessage" className=""> Connection Message</label>
											<textarea className="form-control" rows={6} name="campaignMessage" value={campaignMessage} onChange={this.onChange} placeholder="Connection Message"/>
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
											<button type="reset" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/listing')} className="btn btn-custom-primary mb-4 mt-4">
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
    isLoading: state.applicationIsLoading,
    templates: state.templates,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveListing: (data) => dispatch(saveListing(data)),
    updateListing: (data) => dispatch(updateListing(data)),
    fetchListing: (id) => dispatch(fetchListing(id)),
    getTemplates: (url) => dispatch(fetchTemplates(url))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsForm);
