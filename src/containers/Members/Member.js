import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConnectALL, getMember, getRefresh, getCampaignMemberEmails,verifyCampaignMemberEmails } from '../../actions/campaignActions';
import { getIntegrationMethods } from '../../actions/listingActions';
import {REACT_API_URL} from '../../constants/env.js'
// import {Tabs, Tab} from 'react-bootstrap'
import {MemberShow} from './MemberShow'
import { Button, Modal } from 'react-bootstrap';
import { isEmpty, capitalize } from 'lodash';
import { Link } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { exportData, importData } from '../../actions/importActions';
import { exportToCsv } from '../../utils/featuredActions';
import sample from '../../sample.csv';



class Member extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isVerifyEmailAddresses:false,
      activePage: 0,
      activeTab: "all",
      totalPages: 1,
      errors: {},
      list: [],
      perPage: 10,
      allMember: 0,
      acceptMember: 0,
      pendingMember: 0,
      integrationType: null,
      selectedIds: [],
      selectedIntIds: [],
      total_count: 0,
      linkedin_cookie: localStorage.linkedin_cookie,
      displayCount: 10,
      from: 0,
      to: 0,
      importModal: false,
      selectedFile: '',
      importError: [],
      sort_name_in: 'asc',
      sort_email_in: 'asc',
      field: 'updated_at',
      sortcommon: 'desc',
      export_type: 'all',
      emailModal: false,
      emailData: ''
    }
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount() {
    this.apiCall();  
    this.props.getIntegrationMethods()
  }

  apiCall =() =>{
    let url = REACT_API_URL + `/campaign_members/${this.props.match.params.id}/members?members_for=campaign&page_number=1&per_page=${this.state.displayCount}`
    this.props.getMember(url)
      .then((response) => {
        if(response.data.status !== 404){
          if(typeof response.data !== 'undefined'){
            // console.log('response',response.data.data.total_count)
              this.setState({totalPages: response.data.data.total_pages, total_count: response.data.data.total_count})
          }
        }else{
          NotificationManager.error(response.data.message, 'Error');
          this.props.history.push('/campaign')
        }
      })
  }


  changeCurrentPage = (data) => {
    this.setState({ activePage: data.selected})
    var page = data.selected + 1
    let url = REACT_API_URL + `/campaign_members/${this.props.match.params.id}/members?members_for=campaign&page_number=${page}&per_page=${this.state.displayCount}&order_by=${this.state.field} ${this.state.sortcommon}`
    this.props.getMember(url);
  }

  refetchMembers = () => {
    let url = REACT_API_URL + `/campaign_members/${this.props.match.params.id}/members?members_for=campaign&page_number=${this.state.activePage === 0 ? 1 : this.state.activePage}&per_page=${this.state.displayCount}&order_by=${this.state.field} ${this.state.sortcommon}`
    this.props.getMember(url);
  }

  onSelect = (key) => {
    this.setState({ activePage: 1, activeTab: key})
    let url = REACT_API_URL + `/campaign_members/${this.props.match.params.id}/members?status=${key}`
    this.props.getMember(url)
    .then((response) => {
          // console.log('response',response)
          if(typeof response.data !== 'undefined'){
             this.setState({totalPages: parseInt(response.data.data.total_pages)})  
          }
          // console.log(response.data.last_page_number,'did')
        })
  }

  handleIntegrationSelect = (e) => {
    e.preventDefault();
    if(this.state.isVerifyEmailAddresses){
      this.verifyEmailAddresses()
    }else{
      this.findEmail()
    }
    this.setState({showIntergrationModal: false, selectedIds: [], allChecked: false})
  }
  
  selectIntergration = (id) => {
    
    this.setState({ showIntergrationModal: true, singleIds: id})
  }
  findEmailAddresses = (id) =>{
    console.log("findEmailAddresses");
    console.log(id);
    this.setState({ showIntergrationModal: true, singleIds: id,isVerifyEmailAddresses:true})

  }

  onIntegrationChange = (e) => {
    let itemName = e.target.name;
    let checked = e.target.checked;
    let newState = Object.assign({}, this.state);
    if(checked) {
      newState.selectedIntIds.push(itemName)
    } else {
      const index = newState.selectedIntIds.indexOf(itemName)
      newState.selectedIntIds.splice(index, 1)
    }
  
    this.setState(newState);
  }
  
  handleChange = (e) => {
    let itemName = e.target.name;
    let checked = e.target.checked;
    let newState = Object.assign({}, this.state);
    if (itemName === "checkAll") {
      newState.selectedIds = checked ? newState.list.map(item => item.uuid) : []
      newState.allChecked = checked ? true : false;
    } else {
      if(checked) {
        newState.selectedIds.push(itemName)
      } else {
        const index = newState.selectedIds.indexOf(itemName)
        newState.selectedIds.splice(index, 1)
      }
    }
    this.setState(newState);
  };


  findEmail = (e) => {
    const { selectedIds, activePage, displayCount, integrationType } = this.state;
    if(this.state.selectedIntIds.length > 0){
      var data = {
          listing_member_uuids: [this.state.singleIds],
          email_finder_services: this.state.selectedIntIds
        }

      if(this.state.singleIds === 'all'){
        data = {
          listing_member_uuids: selectedIds,
          email_finder_services: this.state.selectedIntIds
        }
      }

      const url = REACT_API_URL + `/campaign_members/${this.props.match.params.id}/fetch_emails?members_for=campaign&page_number=${activePage + 1}&per_page=${displayCount}`
      this.props.getCampaignMemberEmails(url, data).then((response) => {
          console.log(response)
          NotificationManager.success(response.data.message, 'Success');
          this.refetchMembers()
          this.setState({ selectedIds: [], allChecked: false, singleIds: '', selectedIntIds: []})
      })
      // this.setState({ selectedIds: []})
    }else{
      NotificationManager.error("Please select any services", 'Error');
    }
  }
  verifyEmailAddresses = (e) =>{
    const {selectedIds,selectedIntIds} = this.state;
    
    console.log("Arsenal forever");
    let allMembers = this.props.members.data.members;
    let selectedForVerify = allMembers.filter((element)=>{
      return (selectedIds.some((e) => element.uuid.includes(e)));
    });
    this.props.verifyCampaignMemberEmails(selectedForVerify).then((data)=>{
      console.log(data);
    })
  }

  findSingleEmail = (id) => {
    // console.log("id",id)
      var data = {
        listing_uuid: this.props.match.params.id,
        listing_member_uuids: [id]
      }
      // console.log(arr);
      this.props.getCampaignPlayEmail(data)
  }

  Refresh = () => {
    this.props.getRefresh(REACT_API_URL + `/campaigns/${this.props.match.params.id}/update_status`)
    this.setState({show: false})
  }

  handleShow = () => {
      this.setState({show: true})
  };

  handleClose = () => {
      this.setState({show: false, showIntergrationModal: false})
  }; 

  onChange = (e) => {
      this.setState({displayCount : e.target.value, activePage: 0})
      // console.log("e.target.value",e.target.value)
      let url = REACT_API_URL + `/campaign_members/${this.props.match.params.id}/members?members_for=campaign&page_number=1&per_page=${e.target.value}`
      this.props.getMember(url)
      .then((response) => {
          // console.log('response',response.data.data)
          if(response.data.status !== 404){
            if(typeof response.data !== 'undefined'){
                this.setState({totalPages: response.data.data.total_pages, total_count: response.data.data.total_count})
            }
          }else{
            NotificationManager.error(response.data.message, 'Error');
            this.props.history.push('/campaign')
          }
        })
      // this.props.getMember(REACT_API_URL + `/listings/${this.props.match.params.id}/listing_members?page_number=1&displayCount=${e.target.value}`);
  }

  sortingName = (field, sort) => {
    // console.log('---->>>',field, sort)
    this.setState({field: field})
    this.setState({sort_name_in: (sort === 'asc') ? 'desc' : 'asc', field: field, sortcommon: sort})
    
    let url = REACT_API_URL + `/campaign_members/${this.props.match.params.id}/members?members_for=campaign&page_number=${this.state.activePage === 0 ? 1 : this.state.activePage}&per_page=${this.state.displayCount}&order_by=${field} ${sort}`
    this.props.getMember(url);
  }

  sortingEmail = (field, sort) => {
    // console.log('---->>>',field, sort)
    this.setState({field: field})
    this.setState({sort_email_in: (sort === 'asc') ? 'desc' : 'asc', field: field, sortcommon: sort})
    
    let url = REACT_API_URL + `/campaign_members/${this.props.match.params.id}/members?members_for=campaign&page_number=${this.state.activePage === 0 ? 1 : this.state.activePage}&per_page=${this.state.displayCount}&order_by=${field} ${sort}`
    this.props.getMember(url);
  }

  emailPopup = (data) => {
    console.log(data)
    this.setState({emailModal: true, emailData: data})
  }

  handleEClose = () => {
    this.setState({emailModal: false, emailData: ''})
  }

  importModalData = () => {
    this.setState({importModal: true})
  }

  importModalHide = () => {
    this.setState({importError : "",importModal: false})
  }

  onFileChange = event => {      
    // Update the state 
    if(event.target.files[0].type === 'text/csv' || event.target.files[0].type === 'application/vnd.ms-excel'){
    // if(event.target.files[0].type === 'text/csv'){
      this.setState({ selectedFile: event.target.files[0], importError : ""}); 
    }else{
      NotificationManager.error("Upload CSV file", 'Error');
    }
   
  }; 

  importData = () => {
    // console.log("this.state.selectedFile.type",this.state.selectedFile.type)
    if(this.state.selectedFile && (this.state.selectedFile.type === 'text/csv' || this.state.selectedFile.type === 'application/vnd.ms-excel')){
    // if(this.state.selectedFile && this.state.selectedFile.type === 'text/csv'){
      let  url =  `/campaign_members/${this.props.match.params.id}/import_member_csv?members_for=campaign`
      // let  url =  `/listings/${this.props.match.params.id}/import_member_csv`
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "file_path", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
      this.props.importData(url, formData).then((response) => {
          
          if(response.data.status === 422){
            // console.log('import',response)
            this.setState({importError : response.data.errors})
          }else{
            NotificationManager.success(response.data.message, 'Imported');
            this.setState({importError : "",importModal: false})
            this.apiCall();
          }
      });
    }else{
      NotificationManager.error("Upload CSV file", 'Error');
    }
  }

  handleExportShow = () => {
    this.setState({exportModal: true})
  } 

  handleExportClose = () => {
    this.setState({exportModal: false})
  } 

  onExportSelect= (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  exportData = () => {
    let  url =  `/campaign_members/${this.props.match.params.id}/export_member_csv?members_for=campaign&export_type=${this.state.export_type}`
    this.props.exportData(url).then((response) => {
        var data = response.csv_data
        exportToCsv(`linked-advance-helper-campaign-data.csv`, data) 
        this.handleExportClose();
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    
    if((nextProps.members.length > 0 || typeof nextProps.members.data !== 'undefined') && nextProps.members.data.members){
      // console.log("nextProps",nextProps.members.data.members)
      nextProps.members.data.members.map((row) => 
        {
           row.isChecked = false 
           return row
        }
      ) 
      this.setState({list : nextProps.members.data.members, from: nextProps.members.data.from_data, to:  nextProps.members.data.to_data}) 
    }
    
  }

  render() {
    let { members, isLoading, integrationMethods } = this.props;
    // console.log('selectedCampaignPlay',members)
    const { selectedIds, errors, activePage, list, integrationType, selectedIntIds } = this.state;

    // let records = isEmpty(members) ? [] : members.data.members
    // let membersData = isEmpty(list) ? [] : JSON.parse(JSON.stringify(list)).splice(this.state.activePage*10, 10);
      let membersData = list
    return (
      <main>
          <section className="page-heading-breadcrumb-section">
            <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item active"><Link to="#">{!isEmpty(members) ? members.data.title : 'Campaign Members'}</Link></li>
              </ol>
            </nav>
            </div>
          </section>         
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                    {
                      errors.actionError ? (
                        <div className="alert alert-danger" role="alert">
                          {errors.actionError}
                        </div>
                        ) : null
                    }
                    {/*<div className="refresh-button">
                      {this.state.activeTab === "pending" &&
                        <button className="btn btn-primary" onClick={this.handleShow}> Refresh</button>
                      }
                    </div>*/}
                <MemberShow
                        membersData={membersData}
                        findEmailAddresses={this.findEmailAddresses}
                        selectIntergration={this.selectIntergration}
                        totalPages = {this.state.totalPages}
                        activePage = {this.state.activePage}
                        allChecked = {this.state.allChecked}
                        selectedIds = { selectedIds }
                        total_count = {this.state.total_count}
                        displayCount = {this.state.displayCount}
                        from = {this.state.from}
                        to = {this.state.to}
                        onChange = {this.onChange}
                        refetchMembers = {this.refetchMembers}
                        handleChange = {this.handleChange}
                        findSingleEmail = {this.findSingleEmail}
                        changeCurrentPage = {this.changeCurrentPage}
                        importModalData = {this.importModalData}
                        exportData = {this.exportData}
                        isLoading = {isLoading}

                        sort_name_in = {this.state.sort_name_in}
                        sort_email_in = {this.state.sort_email_in}
                        sortingName = {this.sortingName}
                        sortingEmail = {this.sortingEmail}
                        handleExportShow = {this.handleExportShow}
                        integrationMethods = {this.props.integrationMethods}
                        emailPopup = {this.emailPopup}
                      />

                    {/*
                    <Tabs 
                      id="controlled-tab-example"
                      activeKey={this.state.activeTab}
                      onSelect={(k) => this.onSelect(k)}
                      >
                      <Tab eventKey="all" title={"All (" + this.state.allMember + ")"}>
                        <MemberShow
                            members = {members}
                            totalPages = {this.state.totalPages}
                            activePage = {this.state.activePage}
                            changeCurrentPage = {this.changeCurrentPage}
                            isLoading = {isLoading}
                          />
                      </Tab>
                      <Tab eventKey="accepted" title={"Accepted (" + this.state.acceptMember + ")"}>
                        <MemberShow 
                            members = {members}
                            totalPages = {this.state.totalPages}
                            activePage = {this.state.activePage}
                            changeCurrentPage = {this.changeCurrentPage}
                            isLoading = {isLoading}
                          />
                      </Tab>
                      <Tab eventKey="pending" title={"Pending (" + this.state.pendingMember + ")"}>
                        <MemberShow 
                            members = {members}
                            totalPages = {this.state.totalPages}
                            activePage = {this.state.activePage}
                            changeCurrentPage = {this.changeCurrentPage}
                            isLoading = {isLoading}
                          />
                      </Tab>
                    </Tabs>
                    */}

                  </div>
                  
            </div>
          </div>
          <Modal 
            show={this.state.importModal} 
            onHide={this.importModalHide.bind(this)}
            centered
            size="lg"
            id="import-member-csv-modal"
            >
            <Modal.Header closeButton>
              <Modal.Title>Import CSV</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-center"><a href={sample} download><i class="fa fa-download" aria-hidden="true"></i> Download sample here</a></p>
                
                <input type="file" onChange={this.onFileChange} /> 


                <div className="import-member-csv-modal-table-container">
                      <table className="table table-striped table-bordered table-hover">
                          <tbody >
                                  {
                                      this.state.importError.length > 0 && this.state.importError.map((row) =>{
                                      return (
                                      
                                        <tr>
                                          <td> <i class="fa fa-exclamation-triangle error-icon" aria-hidden="true"></i> {row}
                                          </td>
                                        </tr>
                                      
                                      )  
                                    })}
                          </tbody>
                      </table>
                  </div>


            {/* 
              <ul>
                {this.state.importError.length > 0 && this.state.importError.map((row) =>{
                  // console.log("rwo",row)
                  return (<li>{row}</li>)  
                })}
              </ul> */}


            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.importModalHide.bind(this)}>
                Cancel
              </Button>
              <Button variant="info" onClick={this.importData.bind(this)}>
                Import
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.show} onHide={this.handleClose.bind(this)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Enter Linkedin cookie ("li_at")</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              <input type="text" name="linkedin_cookie" className="form-control" id="linkedin-cookie" value={this.state.linkedin_cookie} onChange={this.fieldValChange} required />
              <span className="help-cookie"><a href="https://support.phantombuster.com/hc/en-001/articles/360007071719-How-to-get-your-cookies-with-Phantombuster" rel="noopener noreferrer" target="_blank">How to get your cookies manually?</a></span>
              <span>{this.state.errorMsg}</span>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.handleClose.bind(this)}>
                Cancel
              </Button>
              <Button variant="info" onClick={this.Refresh.bind(this)}>
                Play
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.emailModal} onHide={this.handleEClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Emails find from Integrations.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.emailData ?
                          !isEmpty(this.state.emailData) ? Object.keys(this.state.emailData).map((key, index) => {
                            return(
                              <div class="form-check" key={index}>
                              {this.state.emailData[key].length > 0 &&  <strong>{capitalize(key.split('_').join(' '))}</strong>}
                              {this.state.emailData[key].length > 0 && this.state.emailData[key].map((row,i) => {

                                  if(typeof row === 'string'){
                                    return(
                                      <span dir="ltr">
                                        <p>{row}</p>
                                      </span> 
                                    )
                                  }else{
                                    return(
                                      <span dir="ltr">
                                      
                                        <p>{row.status === "0" ? 
                                            (<i class="fa fa-times-circle" aria-hidden="true"></i>) 
                                            : 
                                            <i class="fa fa-check-circle" aria-hidden="true"></i>
                                          }
                                          {row.email}</p>
                                      </span>
                                    )  
                                  }
                                
                              })}

                              </div>
                            )
                          }) : <p></p>
                          
                        :
                        ""
                      }
                </Modal.Body>
                
          </Modal>
          <Modal show={this.state.showIntergrationModal} onHide={this.handleClose} centered>
              <form onSubmit={this.handleIntegrationSelect}>
                <Modal.Header closeButton>
                  <Modal.Title>Select Integrationaa.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {
                    !isEmpty(integrationMethods) ? Object.keys(integrationMethods).map((key, index) => {
                      if(integrationMethods[key]){
                        return(
                          <div class="form-check">
                            <input class="form-check-input" onChange={this.onIntegrationChange} type="checkbox" name={key} id={"gridRadios"+index} value={key} disabled={!integrationMethods[key]}/>
                            <label class="form-check-label" for={"gridRadios"+index}>
                              {capitalize(key.split('_').join(' '))}
                            </label>
                          </div>
                        )
                      }
                    }) : <p>No Integration Found. Please add integration keys from profile section.</p>
                  }
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button variant="info" type="submit" disabled={selectedIntIds ? false : true}>
                    Submit
                  </Button>
                </Modal.Footer>
              </form>
          </Modal>
          <Modal show={this.state.exportModal} onHide={this.handleExportClose} centered>
              <form >
                <Modal.Header closeButton>
                  <Modal.Title>Select type for export CSV.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <div className="form-check">
                      <input className="form-check-input" onChange={this.onExportSelect} type="radio" name="export_type" id="exportRadio" value="all" checked={this.state.export_type === "all"} required={true}/>
                      <label className="form-check-label" for="exportRadio">
                        All data in CSV
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" onChange={this.onExportSelect} type="radio" name="export_type" id="exportRadio1" value="with_email" checked={this.state.export_type === "with_email"} required={true}/>
                      <label className="form-check-label" for="exportRadio1">
                        Data with Emails
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" onChange={this.onExportSelect} type="radio" name="export_type" id="exportRadio2" value="without_email" checked={this.state.export_type === "without_email"} required={true}/>
                      <label className="form-check-label" for="exportRadio2">
                        Data without Email
                      </label>
                    </div>
              
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={this.handleExportClose}>
                    Cancel
                  </Button>
                  <Button variant="info" onClick={this.exportData}>
                    Submit
                  </Button>
                </Modal.Footer>
              </form>
          </Modal>
          
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.memberData)
  return {
    members: state.memberData,
    integrationMethods: state.integrationMethods,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getConnectALL: (data, url) => dispatch(getConnectALL(data, url)),
    getIntegrationMethods: () => dispatch(getIntegrationMethods()),
    getMember: (url) => dispatch(getMember(url)),
    getCampaignMemberEmails: (url, data) => dispatch(getCampaignMemberEmails(url, data)),
    verifyCampaignMemberEmails:(data) => dispatch(verifyCampaignMemberEmails(data)),
    getRefresh: (url) => dispatch(getRefresh(url)),
    exportData: (data) => dispatch(exportData(data)),
    importData: (url, data) => dispatch(importData(url, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Member);
