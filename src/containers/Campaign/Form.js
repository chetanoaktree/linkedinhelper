import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaign, submitCampaign, updateCampaign } from '../../actions/campaignActions';
import { fetchTemplates } from '../../actions/templateActions';
import { uniq } from 'lodash';
import FollowUp from '../../components/FollowUp/FollowUp';
import {NotificationManager} from 'react-notifications';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import {REACT_API_URL} from '../../constants/env.js'
import FormLoader from '../../components/Loader/FormLoader'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      campaignType: 'connect',
      campaignUrl: '',
      campaignMessage: '',
      is_only_premium: false,
      is_skip_without_avatar_profile: false,
      template_id: '',
      followUpsCount: 0,
      limit: 0,
      campaign_messages_attributes: [],
      errors: {
        title: '', 
        campaignUrl: '', 
        template_id: ''
      },
      tags: [],
      submittedOnce: false,
      setlimit: '',
      UpdateForm: false
    }
    this.validate = this.validate.bind(this)
    this.onTagsChanged = this.onTagsChanged.bind(this)
    this.onSelect = this.onSelect.bind(this)

    
  }

  componentDidMount() {
    // console.log("=====",this.props)
    if(typeof this.props.match.params.id !== 'undefined'){
      this.props.fetchCampaign(this.props.match.params.id)
      .then((res) => {
        if(res.status !== 404){
          // console.log('res',res.data.id)
          let newState = Object.assign(this.state, {});
          newState.title = res.campaign.title
          newState.description = res.campaign.description
          newState.campaignType = res.campaign.campaign_type
          newState.campaignUrl = res.campaign.url
          newState.template_id = res.campaign.template_id
          newState.campaignMessage = res.campaign.connection_message
          // newState.followUpsCount = res.data.campaign.campaign_messages.length
          // newState.is_skip_without_avatar_profile = res.data.campaign.is_skip_without_avatar_profile
          // newState.is_only_premium = res.data.campaign.is_only_premium
          // newState.campaign_messages_attributes = res.data.campaign.campaign_messages
          // newState.tags = res.data.tags
          // newState.limit = (res.data.campaign.is_start && res.data.campaign.is_end) ? 0 : res.data.campaign.limit || 0
          
          // newState.setlimit = res.data.campaign.limit || 0  

          // if(res.data.campaign.is_start && res.data.campaign.is_end){
            // if(res.data.campaign.campaign_type === 'connect'){
            //   newState.limit = (res.data.campaign.limit <= connectRLimit ) ? res.data.campaign.limit : 0
            // }else if(res.data.campaign.campaign_type === 'visit'){
            //   newState.limit = (res.data.campaign.limit <= visitRLimit ) ? res.data.campaign.limit : 0
            // }else{
            //   newState.limit = (res.data.campaign.limit <= messageRLimit ) ? res.data.campaign.limit : 0
            // }
            // newState.limit = 0  
          // }else{
            // newState.limit = 0  
          // }

          
          // newState.limit = res.data.campaign.limit || 0  

          this.setState(newState)
          this.setState({UpdateForm: true})
        }else{
          NotificationManager.error(res.message, 'Error');
          this.props.history.push('/campaign')
        }
      });
    }
    this.props.getTemplates(REACT_API_URL + `/templates`)
  }

  addFolloup = (e) => {
    e.preventDefault();
    const data = {
      number_of_days: 1,
      description: '',
      template_id: ''
    }

    let newState = Object.assign(this.state);
    newState.followUpsCount = newState.followUpsCount + 1
    newState.campaign_messages_attributes.push(data)
    this.setState(newState)
  }

  removeFolloup = (index, e) => {
    e.preventDefault();
    let newState = Object.assign(this.state);
    newState.campaign_messages_attributes.splice(index, 1)
    newState.followUpsCount = newState.campaign_messages_attributes.length
    this.setState(newState)
  }

  validate () {
    
    const { campaignUrl, errors } = this.state; 
    if(campaignUrl  === ''){
      errors.campaignUrl = "Field can't be blank"
      this.setState({errors})
      return false
    }else{
      errors.campaignUrl = ""
      this.setState({errors})
    }
    // if(campaignType === ''){
    //   errors.campaignType = "Select campaign type"
    //   this.setState({errors})
    //   return false
    // }else{
    //   errors.campaignType = ""
    //   this.setState({errors})
    // }
    return true
  }

  onTagsChanged(tags) {
      tags = uniq(tags)
      console.log("tags",tags)
      this.setState({tags})
  }

  goSubmit = (e) => {
    e.preventDefault();
    this.setState({submittedOnce: true})
    // console.log(this);
    const { title, description, campaignMessage, campaignUrl, campaignType, template_id } = this.state;

    if(this.validate()){
      const campaignData = {
        title: title,
        description: description,
        url: campaignUrl,
        campaign_type: campaignType, 
        connection_message: campaignMessage, 
        template_id: template_id
      }
      
      if(this.state.UpdateForm){
        campaignData.id = this.props.location.state.campaignId

        this.props.updateCampaign(campaignData)
        .then((res) => {
          if(res.data.status === 200) {
            NotificationManager.success(res.data.message, 'Success');  
            this.props.history.push('/campaign')
          } else {
            NotificationManager.error(res.data.message, 'Error');  
            this.setState({
              error: "something went wrong."
            })
          }
        })
      }else{
        this.props.submitCampaign(campaignData)
        .then((res) => {
          if(res.data.status === 201) {
            NotificationManager.success(res.data.message, 'Success');  
            this.props.history.push('/campaign')
          } else {
            NotificationManager.error(res.data.message, 'Error');  
            this.setState({
              error: "something went wrong."
            })
          }
        })
      }
    }  
  }

  onChange = (e) => { 
    // console.log("e",e.target.name)
    // e.preventDefault();
    const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value
    console.log("value",value)
    this.setState({[e.target.name] : value})
    
    this.validate();
    const { templates } = this.props;
    if(e.target.name === "template_id" && (templates.length > 0 || typeof templates.data !== 'undefined')) {
      templates.data.templates.map((row, index) => {
        if(row.id === parseInt(value)){
          // console.log("row",row)
          this.setState({"campaignMessage": row.body})
        }
        return row
      })
    }
  }

  handleValueChange = (index, e) => {
     e.preventDefault();
    let newState = Object.assign(this.state);
    let currentFollowUp = newState.campaign_messages_attributes[index]
    currentFollowUp[e.target.name] = e.target.value

    const { templates } = this.props;
    if(e.target.name === "template_id" && (templates.length > 0 || typeof templates.data !== 'undefined')) {
      templates.data.templates.map((row, index) => {
        if(row.id === parseInt(e.target.value)){
          // console.log("row",row)
          currentFollowUp["description"] = row.body
        }
        return row
      })
    }

    this.setState(newState);
  }

  onSelect(index, param, e){
    e.preventDefault();
    let newState = Object.assign(this.state);
    let currentFollowUp = newState.campaign_messages_attributes[index]
    currentFollowUp["description"] = currentFollowUp["description"] +param
    this.setState(newState);
  }

  render() {
    const { isLoading, templates } = this.props;
    const { title, description, followUpsCount, campaign_messages_attributes, campaignMessage, campaignUrl, template_id, campaignType, submittedOnce, errors, UpdateForm } = this.state;
    const followUpAry = Array(followUpsCount).fill(0).map((x, y) => x + y)
    // console.log('state',this.state)
    var userDetail = JSON.parse(localStorage.userDetail)
    var connectLimit = userDetail.plan.invitations_per_day_limit 
    var visitLimit = userDetail.plan.profiles_visit_per_day_limit 
    var messageLimit = userDetail.plan.follow_up_messages_per_day_limit 

    var connectRLimit = localStorage.remaining_invitations
    var visitRLimit = localStorage.remaining_visits
    var messageRLimit = localStorage.remaining_follow_up_messages
    return (
      <main>
          <div className="container">
            <div className="row">
              <div className="col-md-2">
              </div> 

              <div className="col-md-8">
                  {
                    isLoading ? (
                      <div className="card pt-4 mt-4">
                        <FormLoader />
                      </div>

                      ) : (
                        <form className="pt-4">
                            <div className="card mb-4">
                    
                                <div className="card-body">
                                    <div className="add-campaign-upper-section">

                                        <div className="form-group">
                                            <label htmlFor="title" className=""> Campaign Title<span class="asterisk">*</span></label>
                                            <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Campaign Title" required/>                                 
                                        </div>

                                        <div className="form-group"> 
                                          <div className=""> </div>
                                              <span className="error_template_form">{submittedOnce && errors.title.length > 0 ? 
                                              errors.title: ''}
                                              </span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="description" className=""> Description</label>
                                            <textarea className="form-control" rows={6} name="description" value={description} onChange={this.onChange} placeholder="Description" required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="campaignType" className=""> Campaign Type</label>
                                            <select className="form-control" onChange={this.onChange} value={campaignType}  name="campaignType" disabled={UpdateForm} className="custom-select">
                                            <option value="connect"> Connect </option>
                                              <option value="visit"> Visit </option>
                                              <option value="message"> Message </option>
                                                 
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="campaignUrl" className=""> Campaign URL<span class="asterisk">*</span></label>
                                            <input type="text" className="form-control" name="campaignUrl" value={campaignUrl} onChange={this.onChange} placeholder="Campaign URL" required/>
                                        </div>

                                        <div className="form-group error">
                                              <span className="error_template_form">{submittedOnce && errors.campaignUrl.length > 0 ? 
                                              errors.campaignUrl: ''}
                                              </span>
                                        </div>

                                      {
                                      campaignType !== "visit" &&
                                        <React.Fragment>
                                        <div className="form-group">
                                            <label htmlFor="template_id" className=""> Template</label>
                                            <select className="form-control" onChange={this.onChange} value={template_id}  name="template_id" className="custom-select">
                                              <option value=""> Select </option>
                                              {(templates.length > 0 || typeof templates.data !== 'undefined') && templates.data.templates.map((row, index) => {
                                                  return(
                                                    <option key={index} value={row.id}> {row.template_name} </option>
                                                  )
                                                })
                                              }
                                            </select>
                                            <span className="error_template_form">{submittedOnce && errors.template_id.length > 0 ? 
                                              errors.template_id: ''}
                                              </span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="campaignMessage" className=""> Connection Message</label>
                                            <textarea className="form-control" rows={6} name="campaignMessage" value={campaignMessage} onChange={this.onChange} placeholder="Connection Message" required/>
                                        </div>

                                        </React.Fragment>
                                      }
                                      <div className="form-group row d-none">
                                        <label htmlFor="Tags" className="col-sm-3">Tags</label>
                                        <div className="col-sm-9 no-padding tags">
                                        <TagsInput value={this.state.tags}  onChange={this.onTagsChanged} />
  
                                        </div>
                                      </div>
                                      <div className="form-group row d-none">
                                        <label htmlFor="Limit" className="col-sm-3">Limit</label>
                                        <div className="no-padding col-sm-9">
                                          {campaignType === "connect" ?
                                            (
                                              <React.Fragment>
                                                <InputRange
                                                  step={1}
                                                  maxValue={connectRLimit}
                                                  minValue={0}
                                                  value={this.state.limit}
                                                  onChange={value => this.setState({ limit: value })} />
                                                <span className="ml-3 text-muted">According to your plan you daily limit is {connectLimit}</span>
                                              </React.Fragment>  
                                              )
                                            : campaignType === "visit" ?
                                            (
                                              <React.Fragment>
                                                <InputRange
                                                  step={1}
                                                  maxValue={visitRLimit}
                                                  minValue={0}
                                                  value={this.state.limit}
                                                  onChange={value => this.setState({ limit: value })} />
                                                  <span className="ml-3 text-muted">According to your plan you daily limit is {visitLimit}</span>
                                              </React.Fragment> 
                                             )
                                            :
                                            (
                                              <React.Fragment>
                                                <InputRange
                                                  step={1}
                                                  maxValue={messageRLimit}
                                                  minValue={0}
                                                  value={this.state.limit}
                                                  onChange={value => this.setState({ limit: value })} />
                                                  <span className="ml-3 text-muted">According to your plan you daily limit is {messageLimit}</span>
                                              </React.Fragment> 
                                            )
                                          }
                                        </div>
                                      </div>
                                      {
                                        this.state.UpdateForm ? (
                                          <div className="form-group row d-none">
                                            <label htmlFor="Limit" className="col-sm-3"></label>
                                            <label htmlFor="Limit" className="col-sm-3">Your last selected limit was {this.state.setlimit}</label>
                                          </div>
                                        ) : null
                                      }
                                        <div className="form-group form-check d-none">
                                             <label className="col-sm-3"></label>
                                             <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="is_only_premium"
                                                name="is_only_premium"
                                                checked={this.state.is_only_premium}
                                                onChange={this.onChange}
                                              />
                                              <label htmlFor="is_only_premium" className="col-sm-3">Connect Premium Users Only</label>
                                          </div>
                                        {/*<div className="form-check">
                                             <label htmlFor="campaignMessage" className="col-sm-3 no-padding"></label>
                                             <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="is_skip_without_avatar_profile"
                                                checked={this.state.is_skip_without_avatar_profile}
                                                onChange={this.onChange}
                                              />
                                              <label htmlFor="campaignMessage" className="col-sm-3">Connect User those have logo</label>
                                          </div>*/}
                                    </div>
                                </div>
                            </div>
                            
                            {campaignType === "connect"  &&
                              <div className="d-none">
                                  <button type="button" name="add-new-campaign-button"  onClick={this.addFolloup} id="add-new-campaign-button" className="btn btn-dark mb-3"><i className="fa fa-plus-circle ml-auto" aria-hidden="true"></i> Add Follow Up</button>
                              </div>
                            }

                            { campaignType === "connect"  &&
                              followUpAry.map((val, index) => {
                                return <FollowUp key={val} index={val} removeFolloup={this.removeFolloup.bind(this, val)} data={campaign_messages_attributes[val]} templates={templates} handleValueChange={this.handleValueChange} onSelect={this.onSelect}/>
                              })
                            }
                            
                              <div className="save-cancel-button-container text-center">
                                  <button type="submit" name="save-new-campaign-button" onClick={this.goSubmit} className="btn btn-dark mb-3">Save</button> <button type="cancel" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/campaign')} className="btn btn-custom-primary mb-3">Cancel</button>
                              </div>
                            

                        </form>
                    )
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
  // console.log('state',state)
  return {
    campaigns: state.campaigns,
    campaign: state.campaign,
    templates: state.templates,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitCampaign: (data) => dispatch(submitCampaign(data)),
    fetchCampaign: (uuid) => dispatch(fetchCampaign(uuid)),
    updateCampaign: (uuid) => dispatch(updateCampaign(uuid)),
    getTemplates: (url) => dispatch(fetchTemplates(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
