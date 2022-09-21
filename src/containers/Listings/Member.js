import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMember, getListingMemberEmails, getCampaignPlayEmail, getIntegrationMethods } from '../../actions/listingActions';
import Loader from '../../components/Loader/Loader';
import {REACT_API_URL} from '../../constants/env.js'
import { Button, Modal } from 'react-bootstrap';
import { capitalize, isEmpty } from 'lodash';
import ReactPaginate from 'react-paginate';
import { exportData, importData } from '../../actions/importActions';
import { isValidHttpUrl, exportToCsv } from '../../utils/featuredActions';
import { Link } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import sample from '../../sample.csv';
import ContentLoader from 'react-content-loader'

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
      </ContentLoader>
)

const TableListingLoader = (props) => (
     <ContentLoader 
        speed={2}
        width={'100%'}
        height={100}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <circle cx="31" cy="45" r="30" /> 
        <rect x="90" y="20" rx="2" ry="2" width="95%" height="10" /> 
        <rect x="90" y="40" rx="2" ry="2" width="95%" height="10" /> 
        <rect x="90" y="60" rx="2" ry="2" width="95%" height="10" /> 
      </ContentLoader>
)


class ListingMember extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 0,
      showIntergrationModal: false,
      displayCount: 10,
      activeTab: "all",
      totalPages: 1,
      errors: {},
      perPage: 10,
      allMember: 0,
      acceptMember: 0,
      pendingMember: 0,
      total_count: 0,
      title: '',
      list: [],
      from: 0,
      type: null,
      selectedIds: [],
      selectedIntIds: [],
      to: 0,
      importModal: false,
      selectedFile: '',
      importError: [],
      sort_name_in: 'asc',
      sort_email_in: 'asc',
      exportModal: false,
      export_type: 'all',
      field: 'updated_at',
      sortcommon: 'desc',
      singleIds: '',
      emailModal: false,
      emailData: ''
    }
  }

  componentDidMount() {
     this.apiCall();  
     this.props.getIntegrationMethods()
  }

  apiCall =() =>{
    let url = REACT_API_URL + `/listings/${this.props.match.params.id}/members?members_for=listing&page_number=1&per_page=${this.state.displayCount}`
    this.props.getMember(url)
    .then((response) => {
        // console.log('response',response)
        if(response.data.status !== 404){
          if(typeof response.data !== 'undefined'){
             this.setState({
               totalPages: parseInt(response.data.data.total_pages),
               total_count: response.data.data.total_count,
               title: response.data.data.title
             })  
          }
        }else{
          NotificationManager.error(response.data.message, 'Error');
          this.props.history.push('/listing')
        }
        // console.log(response.data.last_page_number,'did')
      })
  }

  handleIntegrationSelect = (e) => {
    e.preventDefault();
    this.findEmail()
    this.setState({showIntergrationModal: false})
  }

  handleClose = () => {
    this.setState({showIntergrationModal: false})
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

  onChange = (e) => {
      this.setState({[e.target.name] : e.target.value, activePage: 1})
      let url = REACT_API_URL + `/listings/${this.props.match.params.id}/members?members_for=listing&page_number=1&per_page=${e.target.value}`
      this.props.getMember(url)
        .then((response) => {
        // console.log('response',response)
        if(response.data.status !== 404){
          if(typeof response.data !== 'undefined'){
             this.setState({
               totalPages: parseInt(response.data.data.total_pages),
               total_count: response.data.data.total_count
             })  
          }
        }else{
          NotificationManager.error(response.data.message, 'Error');
          this.props.history.push('/listing')
        }
        // console.log(response.data.last_page_number,'did')
      })
      // this.props.getMember(REACT_API_URL + `/listings/${this.props.match.params.id}/listing_members?members_for=listing&page_number=1&displayCount=${e.target.value}`);
  }

  findEmail = () => {
    const { selectedIds, activePage, displayCount } = this.state;
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
      
      const url = REACT_API_URL + `/listings/${this.props.match.params.id}/fetch_emails?members_for=listing&page_number=${activePage + 1}&per_page=${displayCount}`
      this.props.getListingMemberEmails(url, data).then((response) => {
          NotificationManager.success(response.message, 'Success');
          this.refetchMembers();
          this.setState({ selectedIds: [], allChecked: false, singleIds: '', selectedIntIds: []})
      })
    }else{
      NotificationManager.error("Please select any services", 'Error');
    }
    
  }

  refetchMembers = () => {
    let url = REACT_API_URL + `/listings/${this.props.match.params.id}/members?members_for=listing&page_number=${this.state.activePage === 0 ? 1 : this.state.activePage}&per_page=${this.state.displayCount}&order_by=${this.state.field} ${this.state.sortcommon}`
    this.props.getMember(url);
  }

  selectIntergration = (id) => {
    // console.log(id)
    this.setState({ showIntergrationModal: true, singleIds: id})
  }

  findSingleEmail = (id) => {
      var data = {
        listing_uuid: this.props.match.params.id,
        listing_member_uuids: [id],
        email_finder_service: this.state.integrationType
      }
      // console.log(arr);
      const url = REACT_API_URL + `/listings/${this.props.match.params.id}/fetch_emails?members_for=listing`
      this.props.getListingMemberEmails(url, data)
  }

  changeCurrentPage = (data) => {//console.log('---->>>',data)
    var page = data.selected + 1
    this.setState({ activePage: page.selected})
    let url = REACT_API_URL + `/listings/${this.props.match.params.id}/members?members_for=listing&page_number=${page}&per_page=${this.state.displayCount}&order_by=${this.state.field} ${this.state.sortcommon}`
    this.props.getMember(url);
  }

  sortingName = (field, sort) => {
    // console.log('---->>>',field, sort)
    this.setState({field: field})
    this.setState({sort_name_in: (sort === 'asc') ? 'desc' : 'asc', field: field, sortcommon: sort})
    
    
    let url = REACT_API_URL + `/listings/${this.props.match.params.id}/members?members_for=listing&page_number=${this.state.activePage === 0 ? 1 : this.state.activePage}&per_page=${this.state.displayCount}&order_by=${field} ${sort}`
    this.props.getMember(url);
  }

  sortingEmail = (field, sort) => {
    // console.log('---->>>',field, sort)
    this.setState({field: field})
    this.setState({sort_email_in: (sort === 'asc') ? 'desc' : 'asc', field: field, sortcommon: sort})
    
    let url = REACT_API_URL + `/listings/${this.props.match.params.id}/members?members_for=listing&page_number=${this.state.activePage === 0 ? 1 : this.state.activePage}&per_page=${this.state.displayCount}&order_by=${field} ${sort}`
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
    console.log(event.target.files);
    if(event.target.files[0].type === 'text/csv' || event.target.files[0].type === 'application/vnd.ms-excel'){
      this.setState({ selectedFile: event.target.files[0] , importError : ""}); 
    }else{
      NotificationManager.error("Upload CSV file", 'Error');
    }
   
  }; 

  importData = () => {
    if(this.state.selectedFile && (this.state.selectedFile.type === 'text/csv' || this.state.selectedFile.type === 'application/vnd.ms-excel')){
      let  url =  `/listings/${this.props.match.params.id}/import_member_csv?members_for=listing`
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "file_path", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
      this.props.importData(url, formData).then((response) => {
          if(response.data.status === 422){
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

  exportData = () =>{
    let  url =  `/listings/${this.props.match.params.id}/export_member_csv?members_for=listing&export_type=${this.state.export_type}`
    this.props.exportData(url).then((response) => {
        var data = response.csv_data
        exportToCsv(`linked-advance-helper-list-data.csv`, data) 
        this.handleExportClose();
    });
  }

  

  UNSAFE_componentWillReceiveProps(nextProps){
    
    if((nextProps.members.length > 0 || typeof nextProps.members.data !== 'undefined') && nextProps.members.data.total_pages > 0){
      // console.log("nextProps",nextProps)
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
    const { list, errors, selectedIds, selectedIntIds, sort_name_in, sort_email_in } = this.state;
    console.log('selectedCampaignPlay',this.state.selectedIntIds)

    return (
      <main>
          <section className="page-heading-breadcrumb-section">
            <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item active"><Link to="#">{this.state.title}</Link></li>
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
                        <React.Fragment>
                          
                          <ul className="campaign-play">
                              <li id="" className="mt-4 mb-4">
                                    <div className="search-result__wrapper every-page-top-right-button-container">
                                      <div className={list.length > 0 ? "" : ""}>

                                        <button className="btn btn-custom-secondary mr-2" type="button" Name="add-new-champaign" onClick={this.importModalData}><i className="fa fa-address-book-o" aria-hidden="true"></i> Import</button>
                                      
                                      {
                                      list.length > 0 &&
                                      (
                                        <button className="btn btn-dark" type="button" Name="add-new-champaign" onClick={this.handleExportShow}><i className="fa fa-address-book-o" aria-hidden="true"></i> Export</button>
                                      )
                                      }
                                         </div>
                                    </div>
                                  
                                
                              </li>
                              
                            {list.length > 0 && (<React.Fragment>
                              <li id="people_list" className="search-result card header-of-header">
                                <div id="" className="">
                                  <div className="col-md-12">
                                    <div className="search-result__wrapper">

                                      <div className="col-md-9">
                                        <div className="search-result__info pt3 pb4 ph0">
                                          {this.state.from} - {this.state.to} of about {this.state.total_count} results. Display &nbsp;
                                          <select  name="displayCount"  value={this.state.displayCount} onChange={this.onChange} className="custom-select results-per-page">
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                          </select>
                                          &nbsp; results per page.
                                        </div>
                                      </div>

                                      <div className="col-md-1 get-email-button">
                                        
                                      </div>

                                      <div className="col-md-2 get-email-button">
                                        <button className="btn btn-custom-secondary" type="button" Name="add-new-champaign" onClick={() => this.refetchMembers()}><i className="fa fa-refresh" aria-hidden="true"></i> Refresh</button>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </li>
                              
                              </React.Fragment>)
                            }
                            <li id="people_list" className="search-result card">
                                <div id="" className="">
                                  <div className="col-md-12">
                                   <div className="search-result__wrapper">
                                    
                                    <div className="col-md-1">
                                       <input
                                          className="checkbox-add"
                                          type="checkbox"
                                          name="checkAll"
                                          checked={this.state.allChecked}
                                          onChange={this.handleChange}
                                        />
                                    </div>
                                    
                                    <div className="col-md-1">
                                      
                                    </div>
                                    <div className="col-md-4">
                                      <div className="search-result__info pt3 pb4 ph0">
                                      {
                                      sort_name_in === 'asc' ?
                                        <span className="subline-level-1 t-14 t-black t-normal search-result__truncate header-font" onClick={this.sortingName.bind(this,"full_name", 'asc')}>
                                          <strong>Name&nbsp;</strong>
                                          <i className="fa fa-sort-asc"></i>
                                        </span>
                                        :
                                        <span className="subline-level-1 t-14 t-black t-normal search-result__truncate header-font" onClick={this.sortingName.bind(this,"full_name", 'desc')}>
                                          <strong>Name&nbsp;</strong>
                                          <i className="fa fa-sort-desc"></i>
                                        </span>
                                      }
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="search-result__info pt3 pb4 ph0">
                                      {
                                      sort_email_in === 'asc' ?
                                        <span className="subline-level-1 t-14 t-black t-normal search-result__truncate header-font" onClick={this.sortingEmail.bind(this,"email", 'asc')}>
                                          <strong>Contact Info &nbsp;</strong>
                                          <i className="fa fa-sort-asc"></i>
                                        </span>
                                        :
                                        <span className="subline-level-1 t-14 t-black t-normal search-result__truncate header-font" onClick={this.sortingEmail.bind(this,"email", 'desc')}>
                                          <strong>Contact Info &nbsp;</strong>
                                          <i className="fa fa-sort-desc"></i>
                                        </span>
                                      }
                                      </div>
                                    </div>
                                    
                                    <div className="col-md-2">

                                      <div className="search-result__info pt3 pb4 ph0">
                                        <button className="btn btn-dark" type="button" Name="add-new-champaign" onClick={() => this.selectIntergration('all')}><i className="fa fa-address-book-o" aria-hidden="true"></i> Get Emails</button>
                                      </div>
                                     </div>
                                   </div>
                                  </div>
                                </div>
                              </li>
                            {
                            isLoading ? 
                              Array.from(Array(10), (e, i) => {
                                return (
                                  <li id="people_list" className="search-result card">
                                    <div id="" className="">
                                      <div className="col-md-12">
                                        <div className="search-result__wrapper">
                                          <div className="col-md-12">
                                            <TableListingLoader />
                                          </div>  
                                        </div>  
                                      </div>  
                                    </div> 
                                  </li>)
                              }) :   
                            ((members.length > 0 || typeof members.data !== 'undefined') && members.data.total_pages > 0) && list.length > 0 ? list.map((campaign, index) => {
                                let count = 0;      
                                let show = 0    
                                if(!isEmpty(campaign.email_finder_services)){
                                  Object.keys(campaign.email_finder_services).map((key, index) => {
                                    count = count + campaign.email_finder_services[key].length
                                    show = show  + (campaign.email_finder_services[key].length > 0 && 1)
                                  });
                                }  
                                let total = count - show
                                return(
                                  <li id="people_list" className="search-result card" key={index}>
                                    <div id="" className="">
                                      <div className="col-md-12">
                                       <div className="search-result__wrapper">

                                        <div className="col-md-2">
                                          <div className="search-result__image-wrapper">
                                            <div className="">
                                              {
                                                campaign.is_email_finder_service_in_use ? null : (
                                                  <input
                                                    type="checkbox" 
                                                    name={campaign.uuid} 
                                                    value={campaign.id} 
                                                    checked={selectedIds.indexOf(campaign.uuid) > -1} 
                                                    onClick={this.handleChange}
                                                    className="checkbox-add"
                                                  />
                                                )
                                              }
                                            </div>
                                            <div className="">  
                                              <a className="search-result__result-link" href={campaign.profile_url} rel="noopener noreferrer" target="_blank">
                                                <figure className="search-result__image">
                                                   <div id="" className="">
                                                      <div id="" className="display-flex">
                                                         <div id="" className="presence-entity presence-entity--size-4">
                                                            <img title={campaign.full_name} src={isValidHttpUrl(campaign.image_url)} loading="lazy" alt={campaign.full_name} className="ivm-view-attr__img--centered EntityPhoto-circle-4  presence-entity__image EntityPhoto-circle-4 lazy-image loaded" />
                                                         </div>
                                                      </div>
                                                   </div>
                                                </figure>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-4 ">
                                          <div className="search-result__info pt3 pb4 ph0">
                                             <a className="search-result__result-link" href={campaign.profile_url} rel="noopener noreferrer" target="_blank">
                                                <h3 className="actor-name-with-distance search-result__title single-line-truncate">
                                                   <span className="name-and-icon">
                                                      <span className="name-and-distance">
                                                        <span className="name actor-name">{campaign.full_name}</span>
                                                      </span>
                                                   </span>
                                                </h3>
                                             </a>
                                             <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                                <span dir="ltr">{campaign.title}</span>
                                             </p>
                                             <a rel="nofollow noreferrer" href={campaign.profile_url.indexOf('http') > -1 ? campaign.profile_url : `https://${campaign.profile_url}`} target="_blank" className="social-icon">
                                                <i className="fa fa-linkedin-square"></i>
                                             </a>
                                             <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                                <span dir="ltr" className="location-color"><i className="fa fa-map-marker"></i>{" "+campaign.location}</span>
                                             </p>
                                             {/*<p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                                <span dir="ltr">{campaign.summary}</span>
                                             </p>*/}
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          
                                            <div className="search-result__info pt3 pb4 ph0">
                                              <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                                {campaign.email &&
                                                  (<span dir="ltr">
                                                    <p>
                                                      <a href={"mailto:"+campaign.email} className="social-icon"><i class="fa fa-linkedin-square"></i>{" "+campaign.email}</a>
                                                    </p>
                                                  </span>)
                                                }
                                                {campaign.is_email_finder_service_in_use ? <EmailFinderLoader /> : campaign.email_finder_services ?
                                                    !isEmpty(campaign.email_finder_services) ? Object.keys(campaign.email_finder_services).map((key, index) => {
                                                      return(
                                                        <div class="form-check" key={index}>
                                                        {campaign.email_finder_services[key].length > 0 &&  <strong>{capitalize(key.split('_').join(' '))}</strong>}
                                                        {campaign.email_finder_services[key].length > 0 && campaign.email_finder_services[key].map((row,i) => {

                                                          if(i < 1){
                                                            if(typeof row === 'string'){
                                                              return(
                                                                <span dir="ltr">
                                                                  <p>{row}</p>
                                                                </span> 
                                                              )
                                                            }else{
                                                              return(
                                                                <span dir="ltr">
                                                                  {row.status === "0" ? 
                                                                    (<i class="fa fa-times" aria-hidden="true"></i>) 
                                                                    : 
                                                                    <i class="fa fa-check" aria-hidden="true"></i>
                                                                  }
                                                                  <p>{row.email}</p>
                                                                </span>
                                                              )  
                                                            }
                                                          }
                                                          
                                                        })}

                                                        </div>
                                                      )
                                                    }) : <p></p>
                                                    
                                                  :
                                                  ""
                                                }
                                                
                                                {total > 0 && <span onClick={() => this.emailPopup(campaign.email_finder_services)}>{"+ "+ total }</span>}
                                              </p>
                                            </div>
                                            
                                        </div>
                                       
                                        <div className="col-md-2">
                                          {
                                            campaign.is_email_finder_service_in_use ? null : <button className="btn btn-dark" type="button" Name="add-new-champaign"  onClick={() => this.selectIntergration(campaign.uuid)}><i className="fa fa-address-book-o" aria-hidden="true"></i> Get Email</button>
                                          }
                                        </div>
                                        
                                       </div>
                                      </div>
                                    </div>
                                  </li>
                                  )
                                }) : (
                                  <li className="campaign-message no-result-found">There is no member added yet.</li>
                                )
                              
                          
                          
                         }
                          

                          </ul>

                         
                          <div className="mb-3"> 
                            
                            { this.state.totalPages > 1 &&
                             <div className="pagination-content-bar">
                              <ReactPaginate
                                  previousLabel={"< Previous"}
                                  nextLabel={"Next >"}
                                  breakLabel={<span className="gap">...</span>}
                                  marginPagesDisplayed={3}
                                  pageRangeDisplayed={2}
                                  pageCount={this.state.totalPages}
                                  onPageChange={this.changeCurrentPage}
                                  containerClassName={"pagination"}
                                  previousLinkClassName={"previous_page"}
                                  nextLinkClassName={"next_page"}
                                  disabledClassName={"disabled"}
                                  activeClassName={"active"}
                              />
                             </div> 
                           }
                          </div>
                        </React.Fragment>
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
            <Modal.Header closeButton >
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
          <Modal show={this.state.emailModal} onHide={this.handleEClose}>
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
          <Modal show={this.state.exportModal} onHide={this.handleExportClose}>
              <form >
                <Modal.Header closeButton>
                  <Modal.Title>Select type for export CSV.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <div className="form-check">
                      <input className="form-check-input" onChange={this.onExportSelect} type="radio" name="export_type" id="exportRadio1" value="all" checked={this.state.export_type === "all"} required={true}/>
                      <label className="form-check-label" for="exportRadio1">
                        All data in CSV
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" onChange={this.onExportSelect} type="radio" name="export_type" id="exportRadio2" value="with_email" checked={this.state.export_type === "with_email"} required={true}/>
                      <label className="form-check-label" for="exportRadio2">
                        Data with Emails
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" onChange={this.onExportSelect} type="radio" name="export_type" id="exportRadio3" value="without_email" checked={this.state.export_type === "without_email"} required={true}/>
                      <label className="form-check-label" for="exportRadio3">
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

          <Modal show={this.state.showIntergrationModal} onHide={this.handleClose}>
              <form onSubmit={this.handleIntegrationSelect}>
                <Modal.Header closeButton>
                  <Modal.Title>Select Integration.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {
                    !isEmpty(integrationMethods)  ? Object.keys(integrationMethods).map((key, index) => {
                      if(integrationMethods[key]){
                        return(
                          <div className="form-check">
                            <input className="form-check-input" onChange={this.onIntegrationChange} type="checkbox" name={key} id={"gridRadios"+index} value={key} disabled={!integrationMethods[key]}/>
                            <label className="form-check-label" for={"gridRadios"+index}>
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
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.listingMemberData,
    isLoading: state.applicationIsLoading,
    integrationMethods: state.integrationMethods
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMember: (url) => dispatch(getMember(url)),
    getIntegrationMethods: () => dispatch(getIntegrationMethods()),
    getListingMemberEmails: (url, data) => dispatch(getListingMemberEmails(url, data)),
    getCampaignPlayEmail: (data) => dispatch(getCampaignPlayEmail(data)),
    exportData: (data) => dispatch(exportData(data)),
    importData: (url, data) => dispatch(importData(url, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingMember);
