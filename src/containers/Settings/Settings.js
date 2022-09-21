import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap'
import { getActionSetting, putActionSetting, getResetSetting } from '../../actions/settingActions';
// import Loader from '../../components/Loader/Loader';
import {REACT_API_URL} from '../../constants/env.js'
import {NotificationManager} from 'react-notifications';

var userDetails = ''
if(typeof localStorage.userDetail !== 'undefined'){
  userDetails = JSON.parse(localStorage.userDetail)  
}
userDetails = (localStorage.userDetail) ? JSON.parse(localStorage.userDetail) : ''


class Settings extends Component {

  constructor(props) {
    super();
    this.state = {
      // Takes active tab from props if it is defined there
      activeTab: "action_setting",
      action_setting: {},
      skipper_setting: {},
      throttle_setting: {},
      connect_setting: {},
      planner_setting: {},
      browser_setting: {},
      reset_settings: {},
      uuid: userDetails.uuid
    };
    
    // Bind the handleSelect function already here (not in the render function)
    this.handleSelect = this.handleSelect.bind(this);
    this.handleActionSave = this.handleActionSave.bind(this);
    this.handleActionDropDownSave = this.handleActionDropDownSave.bind(this);
    this.handleSkipperSave = this.handleSkipperSave.bind(this);
    this.handleThrottleSave = this.handleThrottleSave.bind(this);
    this.handleConnectSave = this.handleConnectSave.bind(this);
    this.handlePlannerSave = this.handlePlannerSave.bind(this);
    this.handleBrowserSave = this.handleBrowserSave.bind(this);
    this.handleBrowserArgSave = this.handleBrowserArgSave.bind(this);
    this.handleResetSave = this.handleResetSave.bind(this);
  }

  componentDidMount() {
      let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
      this.props.getActionSetting(url).then((res) => {
          this.setState({ action_setting : res})
      })
  }

  handleSelect(selectedTab) {
    // The active tab must be set into the state so that
    // the Tabs component knows about the change and re-renders.
    this.setState({
      activeTab: selectedTab
    });
    if(selectedTab !== 'reset_settings'){
      let url = REACT_API_URL + `/users/${this.state.uuid}/${selectedTab}`
      this.props.getActionSetting(url).then((res) => {
            this.setState({ [selectedTab] : res})
        })  
    }
  }

  handleActionSave(e){
    // console.log(e.target.name, ' ',e.target.value, '==', e.target.type )
    let value = e.target.value 
    if(e.target.type  === 'checkbox'){
      value = e.target.checked
    }

    let dataSend = { action_setting: {[e.target.name] : value} }
    
    if(e.target.type  === 'select-one'){
      // console.log(this.state.action_setting.delay_for)
      const {action_setting} = this.state
      const {delay_for} = this.state.action_setting
      this.setState({
          action_setting: {
            ...action_setting,
            delay_for: {
              ...delay_for,
              [e.target.name] : value
            } 
          }
      })
      dataSend = { 
        action_setting: { 
          delay_for: {
            ...delay_for,
            [e.target.name] : value
          }
        }
      } 
    }else{
      const {action_setting} = this.state
      this.setState({
          action_setting: {
              ...action_setting,
              [e.target.name] : value
          }
      })
    }

    let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
    this.props.putActionSetting(dataSend, url)
      .then((res) => {
        if(res.data.status === 200) {
          NotificationManager.success('Update successfully', 'Update');
        }
      }).then((error) => {
        console.log(error);
      })
  }
  handleActionDropDownSave(e){
    // console.log(this.state.action_setting.delay_for)
    let value = e.target.value;
    const {action_setting} = this.state
    
    this.setState({
        action_setting: {
          ...action_setting,
          [e.target.name] : value 
        }
    })
    let dataSend = { 
      action_setting: { 
        [e.target.name] : value
      }
    } 
  
  let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
  this.props.putActionSetting(dataSend, url)
    .then((res) => {
      if(res.data.status === 200) {
        NotificationManager.success('Update successfully', 'Update');
      }
    }).then((error) => {
      console.log(error);
    }) 
}
  handleSkipperSave(e){
    // console.log(e.target.name, ' ',e.target.value, '==', e.target.type )
    let value = e.target.value 
    if(e.target.type  === 'checkbox'){
      value = e.target.checked
    }

    let dataSend = { skipper_setting: {[e.target.name] : value} }
    
    const {skipper_setting} = this.state
    this.setState({
        skipper_setting: {
            ...skipper_setting,
            [e.target.name] : value
        }
    })

    let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
    this.props.putActionSetting(dataSend, url)
      .then((res) => {
        if(res.data.status === 200) {
          NotificationManager.success('Update successfully', 'Update');
        }
      }).then((error) => {
        console.log(error);
      })
  }

  handleThrottleSave(e){
    // console.log(e.target.name, ' ',e.target.value, '==', e.target.type )
    let value = e.target.value 
    if(e.target.type  === 'checkbox'){
      value = e.target.checked
    }

    let dataSend = { throttle_setting: {[e.target.name] : value} }
    
    const {throttle_setting} = this.state
    this.setState({
        throttle_setting: {
            ...throttle_setting,
            [e.target.name] : value
        }
    })

    let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
    this.props.putActionSetting(dataSend, url)
      .then((res) => {
        if(res.data.status === 200) {
          NotificationManager.success('Update successfully', 'Update');
        }
      }).then((error) => {
        console.log(error);
      })
  }

  handleConnectSave(e){
    let value = e.target.value 
    if(e.target.type  === 'checkbox'){
      value = e.target.checked
    }

    let dataSend = { connect_setting: {[e.target.name] : value} }
    
    const {connect_setting} = this.state
    this.setState({
        connect_setting: {
            ...connect_setting,
            [e.target.name] : value
        }
    })

    let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
    this.props.putActionSetting(dataSend, url)
      .then((res) => {
        if(res.data.status === 200) {
          NotificationManager.success('Update successfully', 'Update');
        }
      }).then((error) => {
        console.log(error);
      })
  }

  handlePlannerSave(e){
    // console.log(e.target.name, ' ',e.target.value, '==', e.target.type )
    let value = e.target.value 
    if(e.target.type  === 'checkbox'){
      value = e.target.checked
    }

    let dataSend = { action_setting: {[e.target.name] : value} }
    
    const {action_setting} = this.state
    this.setState({
        action_setting: {
            ...action_setting,
            [e.target.name] : value
        }
    })

    if(e.target.type  === 'select-one'){
      console.log(this.state.action_setting.delay_for)
      // dataSend = { action_setting: {[e.target.name] : value} } 
    }

    // return false;
    

    let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
    // this.props.putActionSetting(dataSend, url)
      // .then((res) => {
      //   if(res.data.status === 200) {
      //     // this.props.getActionSetting(url)
      //   }
      // }).then((error) => {
      //   console.log(error);
      // })
  }

  handleBrowserSave(e){
    // console.log(e.target.name, ' ',e.target.value, '==', e.target.type )
    let value = e.target.value 
    if(e.target.type  === 'checkbox'){
      value = e.target.checked
    }

    let dataSend = { browser_setting: {[e.target.name] : value} }
    
    const {browser_setting} = this.state
    this.setState({
        browser_setting: {
            ...browser_setting,
            [e.target.name] : value
        }
    })
    // return false;
    
    let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
    this.props.putActionSetting(dataSend, url)
      .then((res) => {
        if(res.data.status === 200) {
          NotificationManager.success('Update successfully', 'Update');
        }
      }).then((error) => {
        console.log(error);
      })
  }

  handleBrowserArgSave(e){
    // console.log(e.target.name, ' ',e.target.value, '==', e.target.type )
    let value = e.target.value 

    const {browser_setting} = this.state
    let newArr = []

    if (!browser_setting.show_notifications.includes(value)) {
      newArr = browser_setting.show_notifications
        newArr.push(value)
        this.setState({
            browser_setting: {
                ...browser_setting,
                show_notifications : newArr
            }
        })
    } else {
      browser_setting.show_notifications.filter(a => a !== value);
    }    

    setTimeout(() => {
        let dataSend = { browser_setting: {show_notifications: browser_setting.show_notifications} }
    

    let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
    this.props.putActionSetting(dataSend, url)
      .then((res) => {
        if(res.data.status === 200) {
          NotificationManager.success('Update successfully', 'Update');
        }
      }).then((error) => {
        console.log(error);
      })
    }, 1500);
  }

  handleResetSave(e){
    
    let url = REACT_API_URL + `/users/${this.state.uuid}/${this.state.activeTab}`
    this.props.getResetSetting(url)
      .then((res) => {
        if(res.data.status === 200) {
          // this.props.getActionSetting(url)
          NotificationManager.success(res.data.message, 'Reset');
        }
      }).then((error) => {
        console.log(error);
      })
  }

  render() {
    const { action_setting, skipper_setting, throttle_setting, connect_setting, planner_setting, browser_setting } = this.state
    // console.log("actionData",this.state)
    return (
      <main>
        <section className="page-heading-breadcrumb-section">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active"><Link to="#">Settings</Link></li>
              </ol>
            </nav>
          </div>
        </section>

        <div className="container">
          <section className="section-default-padding mt-1" id="setting-page-tabs">
                <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} className="nav-pills nav-justified">
                  <Tab eventKey={"action_setting"} title={<span><i class="fa fa-magic" aria-hidden="true" /> Actions</span>} >
                    {this.state.action_setting && (
                      <section id="content1">
                        <div className="block " id="automations">
                        <div className="option-title"><h4>Automated Actions</h4></div>
                        <div className="option-description"><p>These actions are executed automatically during auto-visiting of profiles.</p></div>
                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="autoconnect" name="auto_connect" checked={action_setting.auto_connect} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Send connection requests to 2nd and 3rd degree connections during visits using standard LinkedIn or Sales Navigator. </span>
                            </label>

                          </div>
                        </div>
                        {action_setting.auto_connect &&
                          <div className="toggle-option">
                            <div className="toggle-option_toggle">
                              <label className="switch toggle-optionChild">
                                <input type="checkbox" id="auto_connect_message_flag" name="auto_connect_message_flag" checked={action_setting.auto_connect_message_flag} onChange={this.handleActionSave}/>
                                <span className="slider round"></span>
                                <span>Include </span>
                              </label>
                              <textarea className="input form-control mb-3" name="auto_connect_message_text" value={action_setting.auto_connect_message_text} onChange={this.handleActionSave} placeholder="enter words, separated by comma" rows="4" cols="65" id="killwords"></textarea>
                            </div>
                          </div>
                        }

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="connected_message_flag" name="connected_message_flag" checked={action_setting.connected_message_flag} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Send a personalised message to 1st Degree Connections using standard LinkedIn or Sales Navigator</span>
                            </label>

                            {action_setting.connected_message_flag &&

                              <textarea className="input form-control mb-3" name="connected_message_text" value={action_setting.connected_message_text} onChange={this.handleActionSave} placeholder="enter words, separated by comma" rows="4" cols="65" id="killwords"></textarea>
                            }
                          </div>
                        </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="send_inmail_flag" name="send_inmail_flag" checked={action_setting.send_inmail_flag} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Send InMail™ to 2nd and 3rd degree connections during visits using Sales Navigator or Recruiter.</span>
                            </label>
                          </div>
                        </div>
                        {action_setting.send_inmail_flag &&
                          <div className="toggle-option">
                            <div className="toggle-option_toggle">
                              <label className="switch">
                                <input type="text" id="send_inmail_subject" name="send_inmail_subject" value={action_setting.send_inmail_subject} onChange={this.handleActionSave}/>
                              </label>
                              <textarea className="input form-control mb-3" name="send_inmail_body" value={action_setting.send_inmail_body} onChange={this.handleActionSave} placeholder="enter words, separated by comma" rows="4" cols="65" id="killwords"></textarea>
                            </div>
                          </div>
                        }

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="auto_follow" name="auto_follow" checked={action_setting.auto_follow} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Follow any profile using Standard LinkedIn</span>
                            </label>
                          </div>
                        </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="auto_disconnect" name="auto_disconnect" checked={action_setting.auto_disconnect} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Disconnect a profile from your network using Standard LinkedIn</span>
                            </label>
                          </div>
                        </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="auto_save_as_lead" name="auto_save_as_lead" checked={action_setting.auto_save_as_lead} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Save any profile as 'Lead' using Sales Navigator</span>
                            </label>
                          </div>
                        </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="auto_pdf" name="auto_pdf" checked={action_setting.auto_pdf} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Save the profile as PDF file using Standard LinkedIn</span>
                              <span>(Disable confirmation of download location for each file via chrome://settings/downloads)</span>
                            </label>
                          </div>
                        </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="auto_endorse" name="auto_endorse" checked={action_setting.auto_endorse} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Endorse <select className="SelectionBox" id="auto_endorse_target" name="auto_endorse_target" value={action_setting.auto_endorse_target} onChange={this.handleActionDropDownSave}>
                                              <option value="5">Top 5</option>
                                              <option value="3">Top 3</option>
                                              <option value="1">Top 1</option>
                                              <option value="-1">Bottom 1</option>
                                              <option value="-3">Bottom 3</option>
                                              <option value="-5">Bottom 5</option>
                                            </select>
                              </span>
                              <span>skill(s) of a 1st degree connection using Standard LinkedIn</span>
                            </label>
                          </div>
                        </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="auto_tag_flag" name="auto_tag_flag" checked={action_setting.auto_tag_flag} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <div className="">
                                <span>Tag profiles as</span>
                                <input className="SelectionBox" type="text" id="auto_tag_value" name="auto_tag_value" vale={action_setting.auto_tag_value} placeholder="type your tag(s)" onChange={this.handleActionSave} />
                                <span>when auto-visiting</span> <br/>
                                <span>(Separate multiple tags with a comma, maximum of 5 tags)</span>
                              </div>
                              <span>when auto-visiting</span>
                              <span>(Separate multiple tags with a comma, maximum of 5 tags)</span>
                            </label>
                          </div>
                        </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="run_automations_on_manual_visits" name="run_automations_on_manual_visits" checked={action_setting.run_automations_on_manual_visits} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Run automated actions while manually browsing profiles</span>
                            </label>
                          </div>
                        </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="exclude_black_listed_action" name="exclude_black_listed_action" checked={action_setting.exclude_black_listed_action} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Exclude blacklisted profiles from automated actions</span>
                            </label>
                          </div>
                        </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <span>Automated Follow-Up Messages</span>
                            <span>Set the message(s) and delay(s) to use for the follow up. Please note that follow-up messages will be automatically disabled for profiles that respond to your messages.</span>
                            <label className="switch mt-2">
                              <input type="checkbox" id="follow_up_flag" name="follow_up_flag" checked={action_setting.follow_up_flag} onChange={this.handleActionSave}/>
                              <span className="slider round"></span>
                              <span>Automatically send follow-up messages after a connection has been added. </span>
                              <span>Please ensure the follow-up messages and delays are configured before enabling automated follow-up messages.</span>
                            </label>
                          </div>
                          <label className="switch">
                              <input type="checkbox" id="follow_up_for_all_flag" name="follow_up_for_all_flag" checked={action_setting.follow_up_for_all_flag} onChange={this.handleActionSave}/>
                              <span>Send follow-up messages to all new connections, not just to those invited using Dux-Soup.</span>
                            </label>
                            {action_setting.follow_up_flag &&
                              <span>
                                <span className="toggle-optionChild">Delay for 
                                  <select className="SelectionBox" id="days" name="days" value={action_setting.delay_for.days} onChange={this.handleActionSave}>
                                    {Array(32).fill(1).map((el, i) =>
                                      <option value={i} key={i}>{i}</option>
                                    )}
                                  </select>
                                  <span>Days</span>
                                  <select className="SelectionBox" id="hours" name="hours" value={action_setting.delay_for.hours} onChange={this.handleActionSave}>
                                    {Array(12).fill(1).map((el, i) =>
                                      <option value={i} key={i}>{i}</option>
                                    )}
                                  </select>
                                  <span>Hours</span>
                                  <select className="SelectionBox" id="minutes" name="minutes" value={action_setting.delay_for.minutes} onChange={this.handleActionSave}>
                                    {Array(60).fill(1).map((el, i) =>
                                      <option value={i} key={i}>{i}</option>
                                    )}
                                  </select>
                                  <span>Minutes</span>
                                </span>
                                <textarea className="input form-control mb-3 mt-2" name="follow_up_text" value={action_setting.follow_up_text} onChange={this.handleActionSave} placeholder="enter words, separated by comma" rows="4" cols="65" id="killwords"></textarea>
                              </span>
                            }
                        </div>

                        <div className="block" id="scrubber">

                          <div className="option-title mt-25">Name Scrubber</div>
                          <div className="option-description">Cleans up profile names. Turns '★ Dr. JAN RODIER, MD, MSc ★' into  'Jan Rodier'</div>

                          <textarea className="input form-control mt-3 mb-1" name="kill_words" value={action_setting.kill_words} onChange={this.handleActionSave} placeholder="enter words, separated by comma" rows="4" cols="65" id="killwords"></textarea>
                          <span>Remove these unwanted words from profile names</span>
                        </div>
                        </div>
                      </section>
                      )
                    }
                  </Tab>
                  <Tab eventKey={"skipper_setting"} title={<span><i class="fa fa-ban" aria-hidden="true" /> Skipping</span>}>
                    {this.state.skipper_setting && (
                      <section id="content2">
                        <div className="option-title">Profile Skipper</div>
                        <div className="option-description">Select which profiles should be skipped during auto-visit. Please note that not all attributes in this list are available for all result pages, e.g. 'Influencer' is only available for standard LinkedIn. The attributes that are valid for the current list are shown after selecting "Visit Profiles" </div>

                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="skip_three_plus" name="skip_three_plus" checked={skipper_setting.skip_three_plus} onChange={this.handleSkipperSave}/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="toggle-option_description">
                            <span>Skip if outside of your network</span>
                          </div>
                        </div>
                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="skip_no_premium" name="skip_no_premium" checked={skipper_setting.skip_no_premium} onChange={this.handleSkipperSave}/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="toggle-option_description">
                            <span>Skip if not a Premium subscriber</span>
                            
                          </div>
                        </div>
                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="skipnolion" name="skip_no_open_link" checked={skipper_setting.skip_no_open_link} onChange={this.handleSkipperSave}/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="toggle-option_description">
                            <span>Skip if not an OpenLink member</span>
                            
                          </div>
                        </div>
                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="skipnoinfluencer" name="skip_no_influencer" checked={skipper_setting.skip_no_influencer} onChange={this.handleSkipperSave}/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="toggle-option_description">
                            <span>Skip if not an Influencer </span>
                            
                          </div>
                        </div>
                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="skipnojobseeker" name="skip_no_jobseeker" checked={skipper_setting.skip_no_jobseeker} onChange={this.handleSkipperSave}/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="toggle-option_description">
                            <span>Skip if not a Job Seeker</span>
                            
                          </div>
                        </div>
                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="skipincrm" name="skip_in_crm" checked={skipper_setting.skip_in_crm} onChange={this.handleSkipperSave}/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="toggle-option_description">
                            <span>Skip if the profile is linked to your CRM</span>
                            
                          </div>
                        </div>
                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="skipnoimage" name="skip_no_image" checked={skipper_setting.skip_no_image} onChange={this.handleSkipperSave}/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="toggle-option_description">
                            <span>Skip if the profile photo is blank</span>
                          </div>
                        </div>
                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="skiptaggedflag" name="skip_tagged_flag" checked={skipper_setting.skip_tagged_flag} onChange={this.handleSkipperSave}/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="toggle-option_description">
                            <span>Skip profiles tagged as </span>
                            <input className="SelectionBox" type="text" id="skiptaggedvalue" size="50" placeholder="type your tag(s), leave blank for any tag " name="skip_tagged_value" value={skipper_setting.skip_tagged_value} onChange={this.handleSkipperSave}/>
                            <br/>
                            <span>(separate multiple tags with a comma, will skip profiles matching only 1 of the tags.)</span>
                          </div>
                        </div>
                        <div className="toggle-option">
                          <div className="toggle-option_toggle">
                            <label className="switch">
                              <input type="checkbox" id="skipcustomflag" name="skip_custom_flag" checked={skipper_setting.skip_custom_flag} onChange={this.handleSkipperSave}/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="toggle-option_description">
                            <span>Skip profiles that match pattern</span>
                            <input className="SelectionBox" type="text" id="skipcustomvalue" size="50" placeholder="type your regular expression" name="skip_custom_value" value={skipper_setting.skip_custom_value} onChange={this.handleSkipperSave}/>
                            <br/>
                            <span>(The regex is evaluated against the html of the entry in the result-list, not case sensitive.)</span>
                          </div>
                        </div>

                        <div className="option-title mt-25">History Skipper</div>
                        <div className="option-description">
                          <span>Specify for how many days a profile should be skipped when auto-visiting.</span>
                        </div>
                        <select className="SelectionBox mt-2" id="skipdays" name="skip_days" value={skipper_setting.skip_days} onChange={this.handleSkipperSave}>
                          <option value="0">Never skip any profiles</option>
                          <option value="1">Skip profiles visited in the past 24 hours</option>
                          <option value="2">Skip profiles visited in the the past 2 days</option>
                          <option value="3">Skip profiles visited in the the past 3 days</option>
                          <option value="7">Skip profiles visited in the the past 7 days</option>
                          <option value="14">Skip profiles visited in the the past 14 days</option>
                          <option value="31">Skip profiles visited in the the past 31 days</option>
                          <option value="122">Skip profiles visited in the the past 3 months</option>
                          <option value="999999">Never visit the same profile again</option>
                        </select>
                      </section>)
                    }
                  </Tab>
                  <Tab eventKey={"throttle_setting"} title={<span><i class="fa fa-anchor" aria-hidden="true" /> Throttling</span>}>
                    {this.state.throttle_setting &&  (<section id="content3">
                        <div className="" id="throttling">
                          <h5 className="option-title">Robot Speed</h5>
                          <div className="option-description">
                            <div>
                              <span>Visiting profiles is</span>
                              <select className="SelectionBox" id="throttle_time"  name="throttle_time" value={throttle_setting.throttle_time} onChange={this.handleThrottleSave}>
                                
                                <option value="30000">Slowest : under 50 per hour</option>
                                <option value="15000">Slower : under 100 per hour</option>
                                <option value="10000">Slow : under 200 per hour</option>
                                <option value="3000">Medium : around 300 per hour</option>
                                <option value="100">Fast : over 500 per hour</option>
                                <option value="1">Random : between 25 and 125 per hour</option>
                              </select>
                            </div>

                            <div className="mt-2">
                              <span>Scanning profiles is</span>
                              <select className="SelectionBox" id="scan_throttle_time"  name="scan_throttle_time" value={throttle_setting.scan_throttle_time} onChange={this.handleThrottleSave}>
                                <option value="10000">Slow : around 3 pages per minute</option>
                                <option value="3000">Medium : around 6 pages per minute</option>
                                <option value="100">Fast : around 10 pages per minute</option>
                              </select>
                            </div>

                            <div className="mt-2">
                              <span>Pause for</span>
                              <input className="SelectionBox" type="number" min="0" max="60" step="1"  id="waitminutes" name="wait_minutes" value={throttle_setting.wait_minutes} onChange={this.handleThrottleSave}/>
                              <span>minutes</span>
                              <span>(0 to 60)</span>
                              <span>after every</span>
                              <input className="SelectionBox" type="number" min="0" max="100" step="1"  id="waitvisits" name="wait_visits" value={throttle_setting.wait_visits} onChange={this.handleThrottleSave}/>
                              <span>visits</span>
                              <span>(1 to 100)</span>
                            </div>
                          </div>
                        </div>

                        <div className="" id="dailylimits">
                          <h5 className="option-title mt-3">Daily Limits</h5>
                          <div className="option-description">
                            <div >WARNING! Changing these settings could lead to LinkedIn blocking your account due to excessive profile visiting, connection requests or direct messages. Handle with care!</div>
                            <div className="mt-4" >
                             
                              
                              <label className="switch" for="warning">                                
                                <input type="checkbox" id="warning"  name="warning" checked={throttle_setting.warning} onChange={this.handleThrottleSave}/>
                                <span className="slider round"></span>
                                <span>Check to confirm you understand the risk!</span>
                              </label>

                            </div>
                          </div>
                            <div className="mt-2">
                              <span>Profile Visits:</span>
                              <select className="SelectionBox" id="maxvisits" disabled={!throttle_setting.warning} name="max_visits" value={throttle_setting.max_visits} onChange={this.handleThrottleSave}>
                                <option value="0">Detect : Leave it to us</option>
                                <option value="5">up to 5 visits per day</option>
                                <option value="50">up to 50 visits per day</option>
                                <option value="100">Free LinkedIn: up to 100 visits per day</option>
                                <option value="150">up to 150 visits per day</option>
                                <option value="200">up to 200 visits per day</option>
                                <option value="250">Business Plus: up to 250 visits per day</option>
                                <option value="300">up to 300 visits per day</option>
                                <option value="400">up to 400 visits per day</option>
                                <option value="500">Sales Navigator: up to 500 visits per day</option>
                                <option value="600">Recruiter: up to 600 visits per day</option>
                                <option value="800">up to 800 visits per day</option>
                                <option value="1000">up to 1000 visits per day</option>
                                <option value="1200">up to 1200 visits per day</option>
                                <option value="1500">up to 1500 visits per day</option>
                              </select>
                            </div>


                            <div className="mt-2">
                              <span>Connection Requests:</span>
                              <select className="SelectionBox" id="maxinvites" disabled={!throttle_setting.warning} step="25" max="500" cap="up to NN per day" name="max_invites" value={throttle_setting.max_invites} onChange={this.handleThrottleSave}>
                                <option value="25">up to 25 per day</option>
                                <option value="50">up to 50 per day</option>
                                <option value="75">up to 75 per day</option>
                                <option value="100">up to 100 per day</option>
                                <option value="125">up to 125 per day</option>
                                <option value="150">up to 150 per day</option>
                                <option value="175">up to 175 per day</option>
                                <option value="200">up to 200 per day</option>
                                <option value="225">up to 225 per day</option>
                                <option value="250">up to 250 per day</option>
                                <option value="275">up to 275 per day</option>
                                <option value="300">up to 300 per day</option>
                                <option value="325">up to 325 per day</option>
                                <option value="350">up to 350 per day</option>
                                <option value="375">up to 375 per day</option>
                                <option value="400">up to 400 per day</option>
                                <option value="425">up to 425 per day</option>
                                <option value="450">up to 450 per day</option>
                                <option value="475">up to 475 per day</option>
                                <option value="500">up to 500 per day</option>
                              </select>
                            </div>

                            <div className="mt-2">
                              <span>Direct Messages:</span>
                              <select className="SelectionBox" id="maxmessages" disabled={!throttle_setting.warning} step="50" max="1000" cap="up to NN per day" name="max_messages" value={throttle_setting.max_messages} onChange={this.handleThrottleSave}>
                                <option value="50">up to 50 per day</option>
                                <option value="100">up to 100 per day</option>
                                <option value="150">up to 150 per day</option>
                                <option value="200">up to 200 per day</option>
                                <option value="250">up to 250 per day</option>
                                <option value="300">up to 300 per day</option>
                                <option value="350">up to 350 per day</option>
                                <option value="400">up to 400 per day</option>
                                <option value="450">up to 450 per day</option>
                                <option value="500">up to 500 per day</option>
                                <option value="550">up to 550 per day</option>
                                <option value="600">up to 600 per day</option>
                                <option value="650">up to 650 per day</option>
                                <option value="700">up to 700 per day</option>
                                <option value="750">up to 750 per day</option>
                                <option value="800">up to 800 per day</option>
                                <option value="850">up to 850 per day</option>
                                <option value="900">up to 900 per day</option>
                                <option value="950">up to 950 per day</option>
                                <option value="1000">up to 1000 per day</option>
                              </select>
                            </div>
                           
                          

                          <div>
                            <label className="switch mt-4" for="randomrange">
                              <input type="checkbox" id="randomrange" name="random_range" value={throttle_setting.random_range} onChange={this.handleThrottleSave}/>
                              <span className="slider round"></span>
                              <span>Apply a random correction to the daily limit.</span>
                            </label>
                           
                          </div>

                          <div>
                          
                            <label className="switch mt-2" for="snooze">
                              <input type="checkbox" id="snooze" name="snooze" value={throttle_setting.snooze} onChange={this.handleThrottleSave}/>
                              <span className="slider round"></span>
                              <span>Snooze the robot when one of the daily limits is reached, or as dictated by the robot-planner.</span>
                            </label>
                          </div>

                          <span> For example: if auto-connect is enabled and the daily limit for auto-connects is reached the bot will snooze and continue at midnight. If left unchecked the bot will come to a complete stop instead.</span>
                        </div>
                      </section>)
                    }
                  </Tab>
                  <Tab eventKey={"connect_setting"} title={<span><i class="fa fa-paper-plane-o" aria-hidden="true" /> Connect</span>}>
                    {this.state.connect_setting && (<section id="content4">
                          <div className="" id="webhooks">
                            <h5 className="option-title"> Webhook </h5>
                            <div className="option-description">Use Webhooks to receive details of events that occur in Dux-Soup and LinkedIn. Events are generated for both automated as well as manual profile visits, and when using the scan functions. A maximum of 5 webhooks can be configured.</div>

                            <div className="toggle-option">
                              <div className="toggle-option_toggle">
                                <label className="switch">
                                  <input type="checkbox" id="enabled_webhook" name="enabled_webhook" checked={connect_setting.enabled_webhook} onChange={this.handleConnectSave}/>
                                  <span className="slider round"></span>
                                </label>
                              </div>

                              <div className="toggle-option_description">
                                <span>Send event details here: </span>
                              </div>
                            </div>
                          </div>
                          <br/>
                          <div className="" id="messagebridge">
                            <h5 className="option-title"> Message Bridge </h5>
                          <div className="option-description">Use the Message Bridge to process and forward unread messages in standard LinkedIn and Sales Navigator. Once enabled, Dux-Soup will regularly check for new messages and new connections (if the Planner is active). </div>

                          <div className="toggle-option">
                            <div className="toggle-option_toggle">
                              <label className="switch">
                                <input type="checkbox" id="enabled_message_bridge" name="enabled_message_bridge" checked={connect_setting.enabled_message_bridge} onChange={this.handleConnectSave}/>
                                <span className="slider round"></span>
                              </label>
                            </div>

                            <div className="toggle-option_description">
                              <span ii18n="innerText">Automatically process unread messages and new connections in standard LinkedIn and Sales Navigator</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span ii18n="innerText">Run a check every </span>
                            <input className="SelectionBox" type="number" min="1" max="60" step="1" id="message_bridge_checks_interval" name="message_bridge_checks_interval" vale={connect_setting.message_bridge_checks_interval} onChange={this.handleConnectSave}/>
                            <span ii18n="innerText">minutes</span>
                            <span ii18n="innerText">(1 to 60), or check now:</span>
                            <button id="checkregularinboxnow" className="btn __grey __square activity mx-2">Check Regular</button>
                            <button id="checksalesinboxnow" className="btn __grey __square activity mx-2">Check Sales Nav</button>
                            <button id="checkconnectionsnow" className="btn __grey __square activity mx-2">Check Connections</button>
                          <br/><p >Latest checks:
                              Regular @ <span id="latestregularcheckvalue">-</span>,
                              Sales Nav @ <span id="latestsalescheckvalue">-</span>,
                              Connections @ <span id="latestconnectionscheckvalue">-</span>
                          </p>
                            </div>  
                          </div>
                          <div className="" id="remotecontrol">
                            <h5 className="option-title mt-25"> Remote Control </h5>
                            <div className="option-description">Use Remote Control to trigger automated LinkedIn actions from outside of the web browser, e.g. from a CRM or a lead management system.</div>

                            <div className="toggle-option">
                              <div className="toggle-option_toggle">
                                  <label className="switch">
                                    <input type="checkbox" id="enabled_remote_control" name="enabled_remote_control" checked={connect_setting.enabled_remote_control} onChange={this.handleConnectSave}/>
                                    <span className="slider round"></span>
                                  </label>
                                </div>

                                <div className="toggle-option_description">
                                  <span>Control the robot from your lead management system.</span>
                                </div>
                              </div>


                              <div className="color-muted" >
                                <div>
                                  <span>Your personal Remote Control URL: </span>
                                  <input className="SelectionBox my-2" disabled="" maxlength="256" size="80" id="remote_key" name="remote_key" vale={connect_setting.remote_key} onChange={this.handleConnectSave}/>
                                </div>
                                <div className="mt-1">
                                  <span>Your personal Remote Control Authentication Key: </span>
                                  <input className="SelectionBox" disabled="" maxlength="128" size="80" id="remote_url" name="remote_url" vale={connect_setting.remote_url} onChange={this.handleConnectSave}/>
                                </div>
                              </div>
                            </div>
                      </section>)
                    }
                  </Tab>
                  <Tab eventKey={"planner_setting"} title={<span><i class="fa fa-calendar" aria-hidden="true" /> Planner</span>} disabled>
                    {this.state.planner_setting && (<section id="content5">
                          <div className="" id="planner">

                                <table cellspacing="10px;" style={{marginLeft:'auto',marginRight:'auto'}}>
                                  <tbody><tr>
                                    <td colspan="3" align="center">
                                      <strong>Select when the visiting-robot should be working and when it's time for a rest.</strong>
                                      <input type="hidden" id="robotscheduleplan" value="robotscheduleplan"/>
                                    </td>

                                  </tr>
                                  <tr>
                                    <td colspan="3" align="center">
                                      <div id="weekly-schedule" style={{marginBottom: '20px', marginLeft: '-65px'}}>
                                        <div className="day-schedule-selector"><table className="schedule-table">
                                          <thead className="schedule-header">
                                            <tr>
                                              <th></th>
                                              <th>Sun</th>
                                              <th>Mon</th>
                                              <th>Tue</th>
                                              <th>Wed</th>
                                              <th>Thu</th>
                                              <th>Fri</th>
                                              <th>Sat</th>
                                            </tr>
                                          </thead>
                                          <tbody className="schedule-rows">
                                            <tr><td className="hidden-time-label time-label">00:00</td>
                                            <td className="time-slot" title="Sun 00:00-01:00" data-time="00:00" data-day="0"></td>
                                            <td className="time-slot" title="Mon 00:00-01:00" data-time="00:00" data-day="1"></td>
                                            <td className="time-slot" title="Tue 00:00-01:00" data-time="00:00" data-day="2"></td>
                                            <td className="time-slot" title="Wed 00:00-01:00" data-time="00:00" data-day="3"></td>
                                            <td className="time-slot" title="Thu 00:00-01:00" data-time="00:00" data-day="4"></td>
                                            <td className="time-slot" title="Fri 00:00-01:00" data-time="00:00" data-day="5"></td>
                                            <td className="time-slot" title="Sat 00:00-01:00" data-time="00:00" data-day="6"></td>
                                            </tr><tr><td className="time-label">01:00</td>
                                            <td className="time-slot" title="Sun 01:00-02:00" data-time="01:00" data-day="0"></td>
                                            <td className="time-slot" title="Mon 01:00-02:00" data-time="01:00" data-day="1"></td>
                                            <td className="time-slot" title="Tue 01:00-02:00" data-time="01:00" data-day="2"></td>
                                            <td className="time-slot" title="Wed 01:00-02:00" data-time="01:00" data-day="3"></td>
                                            <td className="time-slot" title="Thu 01:00-02:00" data-time="01:00" data-day="4"></td>
                                            <td className="time-slot" title="Fri 01:00-02:00" data-time="01:00" data-day="5"></td>
                                            <td className="time-slot" title="Sat 01:00-02:00" data-time="01:00" data-day="6"></td>
                                            </tr><tr><td className="time-label">02:00</td>
                                            <td className="time-slot" title="Sun 02:00-03:00" data-time="02:00" data-day="0"></td>
                                            <td className="time-slot" title="Mon 02:00-03:00" data-time="02:00" data-day="1"></td>
                                            <td className="time-slot" title="Tue 02:00-03:00" data-time="02:00" data-day="2"></td>
                                            <td className="time-slot" title="Wed 02:00-03:00" data-time="02:00" data-day="3"></td>
                                            <td className="time-slot" title="Thu 02:00-03:00" data-time="02:00" data-day="4"></td>
                                            <td className="time-slot" title="Fri 02:00-03:00" data-time="02:00" data-day="5"></td>
                                            <td className="time-slot" title="Sat 02:00-03:00" data-time="02:00" data-day="6"></td>
                                            </tr><tr><td className="time-label">03:00</td>
                                            <td className="time-slot" title="Sun 03:00-04:00" data-time="03:00" data-day="0"></td>
                                            <td className="time-slot" title="Mon 03:00-04:00" data-time="03:00" data-day="1"></td>
                                            <td className="time-slot" title="Tue 03:00-04:00" data-time="03:00" data-day="2"></td>
                                            <td className="time-slot" title="Wed 03:00-04:00" data-time="03:00" data-day="3"></td>
                                            <td className="time-slot" title="Thu 03:00-04:00" data-time="03:00" data-day="4"></td>
                                            <td className="time-slot" title="Fri 03:00-04:00" data-time="03:00" data-day="5"></td>
                                            <td className="time-slot" title="Sat 03:00-04:00" data-time="03:00" data-day="6"></td>
                                            </tr><tr><td className="time-label">04:00</td>
                                            <td className="time-slot" title="Sun 04:00-05:00" data-time="04:00" data-day="0"></td>
                                            <td className="time-slot" title="Mon 04:00-05:00" data-time="04:00" data-day="1"></td>
                                            <td className="time-slot" title="Tue 04:00-05:00" data-time="04:00" data-day="2"></td>
                                            <td className="time-slot" title="Wed 04:00-05:00" data-time="04:00" data-day="3"></td>
                                            <td className="time-slot" title="Thu 04:00-05:00" data-time="04:00" data-day="4"></td>
                                            <td className="time-slot" title="Fri 04:00-05:00" data-time="04:00" data-day="5"></td>
                                            <td className="time-slot" title="Sat 04:00-05:00" data-time="04:00" data-day="6"></td>
                                            </tr><tr><td className="time-label">05:00</td>
                                            <td className="time-slot" title="Sun 05:00-06:00" data-time="05:00" data-day="0"></td>
                                            <td className="time-slot" title="Mon 05:00-06:00" data-time="05:00" data-day="1"></td>
                                            <td className="time-slot" title="Tue 05:00-06:00" data-time="05:00" data-day="2"></td>
                                            <td className="time-slot" title="Wed 05:00-06:00" data-time="05:00" data-day="3"></td>
                                            <td className="time-slot" title="Thu 05:00-06:00" data-time="05:00" data-day="4"></td>
                                            <td className="time-slot" title="Fri 05:00-06:00" data-time="05:00" data-day="5"></td>
                                            <td className="time-slot" title="Sat 05:00-06:00" data-time="05:00" data-day="6"></td>
                                            </tr><tr><td className="time-label">06:00</td>
                                            <td className="time-slot" title="Sun 06:00-07:00" data-time="06:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 06:00-07:00" data-time="06:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 06:00-07:00" data-time="06:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 06:00-07:00" data-time="06:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 06:00-07:00" data-time="06:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 06:00-07:00" data-time="06:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 06:00-07:00" data-time="06:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">07:00</td>
                                            <td className="time-slot" title="Sun 07:00-08:00" data-time="07:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 07:00-08:00" data-time="07:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 07:00-08:00" data-time="07:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 07:00-08:00" data-time="07:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 07:00-08:00" data-time="07:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 07:00-08:00" data-time="07:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 07:00-08:00" data-time="07:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">08:00</td>
                                            <td className="time-slot" title="Sun 08:00-09:00" data-time="08:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 08:00-09:00" data-time="08:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 08:00-09:00" data-time="08:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 08:00-09:00" data-time="08:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 08:00-09:00" data-time="08:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 08:00-09:00" data-time="08:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 08:00-09:00" data-time="08:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">09:00</td>
                                            <td className="time-slot" title="Sun 09:00-10:00" data-time="09:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 09:00-10:00" data-time="09:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 09:00-10:00" data-time="09:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 09:00-10:00" data-time="09:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 09:00-10:00" data-time="09:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 09:00-10:00" data-time="09:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 09:00-10:00" data-time="09:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">10:00</td>
                                            <td className="time-slot" title="Sun 10:00-11:00" data-time="10:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 10:00-11:00" data-time="10:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 10:00-11:00" data-time="10:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 10:00-11:00" data-time="10:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 10:00-11:00" data-time="10:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 10:00-11:00" data-time="10:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 10:00-11:00" data-time="10:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">11:00</td>
                                            <td className="time-slot" title="Sun 11:00-12:00" data-time="11:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 11:00-12:00" data-time="11:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 11:00-12:00" data-time="11:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 11:00-12:00" data-time="11:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 11:00-12:00" data-time="11:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 11:00-12:00" data-time="11:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 11:00-12:00" data-time="11:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">12:00</td>
                                            <td className="time-slot" title="Sun 12:00-13:00" data-time="12:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 12:00-13:00" data-time="12:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 12:00-13:00" data-time="12:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 12:00-13:00" data-time="12:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 12:00-13:00" data-time="12:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 12:00-13:00" data-time="12:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 12:00-13:00" data-time="12:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">13:00</td>
                                            <td className="time-slot" title="Sun 13:00-14:00" data-time="13:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 13:00-14:00" data-time="13:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 13:00-14:00" data-time="13:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 13:00-14:00" data-time="13:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 13:00-14:00" data-time="13:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 13:00-14:00" data-time="13:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 13:00-14:00" data-time="13:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">14:00</td>
                                            <td className="time-slot" title="Sun 14:00-15:00" data-time="14:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 14:00-15:00" data-time="14:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 14:00-15:00" data-time="14:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 14:00-15:00" data-time="14:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 14:00-15:00" data-time="14:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 14:00-15:00" data-time="14:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 14:00-15:00" data-time="14:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">15:00</td>
                                            <td className="time-slot" title="Sun 15:00-16:00" data-time="15:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 15:00-16:00" data-time="15:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 15:00-16:00" data-time="15:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 15:00-16:00" data-time="15:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 15:00-16:00" data-time="15:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 15:00-16:00" data-time="15:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 15:00-16:00" data-time="15:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">16:00</td>
                                            <td className="time-slot" title="Sun 16:00-17:00" data-time="16:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 16:00-17:00" data-time="16:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 16:00-17:00" data-time="16:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 16:00-17:00" data-time="16:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 16:00-17:00" data-time="16:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 16:00-17:00" data-time="16:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 16:00-17:00" data-time="16:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">17:00</td>
                                            <td className="time-slot" title="Sun 17:00-18:00" data-time="17:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 17:00-18:00" data-time="17:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 17:00-18:00" data-time="17:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 17:00-18:00" data-time="17:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 17:00-18:00" data-time="17:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 17:00-18:00" data-time="17:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 17:00-18:00" data-time="17:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">18:00</td>
                                            <td className="time-slot" title="Sun 18:00-19:00" data-time="18:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 18:00-19:00" data-time="18:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 18:00-19:00" data-time="18:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 18:00-19:00" data-time="18:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 18:00-19:00" data-time="18:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 18:00-19:00" data-time="18:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 18:00-19:00" data-time="18:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">19:00</td>
                                            <td className="time-slot" title="Sun 19:00-20:00" data-time="19:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 19:00-20:00" data-time="19:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 19:00-20:00" data-time="19:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 19:00-20:00" data-time="19:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 19:00-20:00" data-time="19:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 19:00-20:00" data-time="19:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 19:00-20:00" data-time="19:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">20:00</td>
                                            <td className="time-slot" title="Sun 20:00-21:00" data-time="20:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 20:00-21:00" data-time="20:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 20:00-21:00" data-time="20:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 20:00-21:00" data-time="20:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 20:00-21:00" data-time="20:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 20:00-21:00" data-time="20:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 20:00-21:00" data-time="20:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">21:00</td>
                                            <td className="time-slot" title="Sun 21:00-22:00" data-time="21:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 21:00-22:00" data-time="21:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 21:00-22:00" data-time="21:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 21:00-22:00" data-time="21:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 21:00-22:00" data-time="21:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 21:00-22:00" data-time="21:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 21:00-22:00" data-time="21:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">22:00</td>
                                            <td className="time-slot" title="Sun 22:00-23:00" data-time="22:00" data-day="0" data-selected="selected"></td>
                                            <td className="time-slot" title="Mon 22:00-23:00" data-time="22:00" data-day="1" data-selected="selected"></td>
                                            <td className="time-slot" title="Tue 22:00-23:00" data-time="22:00" data-day="2" data-selected="selected"></td>
                                            <td className="time-slot" title="Wed 22:00-23:00" data-time="22:00" data-day="3" data-selected="selected"></td>
                                            <td className="time-slot" title="Thu 22:00-23:00" data-time="22:00" data-day="4" data-selected="selected"></td>
                                            <td className="time-slot" title="Fri 22:00-23:00" data-time="22:00" data-day="5" data-selected="selected"></td>
                                            <td className="time-slot" title="Sat 22:00-23:00" data-time="22:00" data-day="6" data-selected="selected"></td>
                                            </tr><tr><td className="time-label">23:00</td>
                                            <td className="time-slot" title="Sun 23:00-00:00" data-time="23:00" data-day="0"></td>
                                            <td className="time-slot" title="Mon 23:00-00:00" data-time="23:00" data-day="1"></td>
                                            <td className="time-slot" title="Tue 23:00-00:00" data-time="23:00" data-day="2"></td>
                                            <td className="time-slot" title="Wed 23:00-00:00" data-time="23:00" data-day="3"></td>
                                            <td className="time-slot" title="Thu 23:00-00:00" data-time="23:00" data-day="4"></td>
                                            <td className="time-slot" title="Fri 23:00-00:00" data-time="23:00" data-day="5"></td>
                                            <td className="time-slot" title="Sat 23:00-00:00" data-time="23:00" data-day="6"></td>
                                            </tr></tbody></table><div></div></div></div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center">
                                      <button className="btn __grey __square activity" id="randomizeSchedule">Random</button>
                                      <button className="btn __grey __square activity" id="resetSchedule">Default</button>
                                      <button className="btn __grey __square activity" id="clearSchedule">Clear</button>
                                      <button className="btn __grey __square activity" id="saveSchedule">Save</button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </section>)
                    }
                  </Tab>
                  <Tab eventKey={"browser_setting"} title={<span><i class="fa fa-laptop" aria-hidden="true" /> Browser</span>}>
                    {this.state.browser_setting && (<section id="content7">
                            <div className="" id="dataformat">
                              <h5 className="option-title">Data File Format</h5>
                              <span>Column Separator</span> :
                              <select className="SelectionBox" id="column_separator" name="column_separator" value={browser_setting.column_separator} onChange={this.handleBrowserSave}>
                                <option value=",">,</option>
                                <option value=";">;</option>
                                <option value=" ">&lt;TAB&gt;</option>
                              </select>
                              <span> (used for CSV download and when reading files for RE-visit )</span>
                            </div>
                            <div id="display">
                              <h5 className="option-title mt-3">Display</h5>
                              
                              <div className="d-flex notificationCheckbox">
                                <p>Show Notifications :</p> &nbsp;
                                <label className="switch mr-2">
                                  <input type="checkbox" id="infonotifications" value="infonotifications" name="infonotifications" onChange={this.handleBrowserArgSave}/>
                                  <span className="slider round"></span>
                                  <span>Info</span>
                                </label>

                                <label className="switch mr-2">
                                  <input type="checkbox" id="actionnotifications" value="actionnotifications" name="actionnotifications" onChange={this.handleBrowserArgSave}/> 
                                  <span className="slider round"></span>
                                  <span>Action</span>
                                </label>

                                

                                <label className="switch mr-2">
                                  <input type="checkbox" id="warningnotifications" value="warningnotifications" name="warningnotifications" onChange={this.handleBrowserArgSave}/>
                                  <span className="slider round"></span>
                                  <span>Warning</span>
                                </label>
                              </div>
                             
                              <span>Display</span>
                              <select className="SelectionBox" id="display_count" name="display_count" value={browser_setting.display_count} onChange={this.handleBrowserSave}>
                                <option value="visits">today's visit count</option>
                                <option value="captures">captured profile count</option>
                                <option value="nothing">nothing</option>
                              </select>
                              <span>on toolbar icon.</span>
                            </div>
                            <div id="performance">
                              <h5 className="option-title mt-3">Browser Performance</h5>
                              <span>Loading a page</span>
                              <select className="SelectionBox" id="loading_page_time"  name="loading_page_time" value={browser_setting.loading_page_time} onChange={this.handleBrowserSave}>
                                    <option value="2500">is near-instant</option>
                                    <option value="5000">can take a few seconds</option>
                                    <option value="10000">can take over 10 seconds</option>
                                    <option value="20000">can take over 20 seconds</option>
                                </select>
                              
                              <label className="switch mt-2">
                                <input type="checkbox" id="ignore_unknown_pages" name="ignore_unknown_pages" checked={browser_setting.ignore_unknown_pages} onChange={this.handleBrowserSave}/>
                                  <span className="slider round"></span>
                                  <span>Ignore unknown pages.</span>
                              </label>
                              
                              <label className="switch ">
                                <input type="checkbox" id="set_robot_recorder_off" name="set_robot_recorder_off" checked={browser_setting.set_robot_recorder_off} onChange={this.handleBrowserSave}/>
                                  <span className="slider round"></span>
                                  <span>Set robot and recorder to 'off' on new tabs.</span>
                                  <span> (Manually enable robot and recorder via the dropdown menu.)</span>
                              </label>

                            </div>
                          </section>)
                    }
                  </Tab>
                  <Tab eventKey={"reset_settings"} title={<span><i class="fa fa-user-circle" aria-hidden="true" /> User</span>}>
                    {this.state.reset_settings && (<section id="content6">

                              <div id="reset">
                                <h5 class="option-title mt-25">Reset Options</h5>
                                <div class="option-description">Click to reset the configuration options to their default values</div>
                                <button id="resetConfig" class="btn __grey __square activity mt-3" onClick={this.handleResetSave}>Reset</button>
                              </div>
                        </section>)
                    }
                  </Tab>
                </Tabs>
          </section>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return{
    actionData: state.actionData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getActionSetting: (url) => dispatch(getActionSetting(url)),
    getResetSetting: (url) => dispatch(getResetSetting(url)),
    putActionSetting: (data, url) => dispatch(putActionSetting(data, url)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Settings);
