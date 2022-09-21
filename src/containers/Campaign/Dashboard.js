
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { getCampaigns, getCampaignPlay, getScraping, getCampaignPlaying, selectCampaign, applyAction, deleteCampaign, getLogs } from '../../actions/campaignActions';
import { Button, Modal } from 'react-bootstrap';
import { arrayUpdation } from '../../utils/featuredActions';
import { isEmpty } from 'lodash';
import Loader from '../../components/Loader/Loader';
// import './_dashboard.css';
import {REACT_API_URL} from '../../constants/env.js'
import ReactPaginate from 'react-paginate';
import "react-pagination-library/build/css/index.css"; //for css
import {NotificationManager} from 'react-notifications';
import ShowMoreText from 'react-show-more-text';
import Pagination from "react-js-pagination";
import TableListingLoader from "../../components/Loader/Skelton"


class Dashboard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 0,
      searchVal: '',
      currentFilter: null,
      filterDates: [],
      campaigns: [],
      dateValue: null,
      errors: {},
      show: false,
      logs: [],
      daily_limit: 0,
      sent_messages: 0,
      follow_up_messages_per_day_limit: 0,
      campaignIds: '',
      campaignIndex: '',
      type: 'email',
      totalPages: 0,
      linkedin_cookie: localStorage.linkedin_cookie,
      errorMsg: "",
      check: 1,
      conversations: [],
      showLogs: false,
      activeConversation: null,
      from: 0,
      to: 0,
      total_count: 0,
      displayCount: 10,
      activePageLog: 1,
      activeCampaignTitle: ''
    }
  }




  
  componentDidMount() { 
    this.props.getCampaigns(REACT_API_URL + `/campaigns?page_number=1&per_page=${this.state.displayCount}`)
    .then((response) => {
      if(typeof response.data !== 'undefined') {
         this.setState({campaigns : response.data.campaigns, totalPages: parseInt(response.data.total_pages), total_count: response.data.total_count}) 
      }
    })

    const dates = Array(4).fill(new Date().toDateString()).map((x, y) => {
      let date = new Date(x)
      date.setMonth(date.getMonth() + y)
      return date
    })
    this.setState({ filterDates: dates })


  }

  onChange = (e) => {
      this.setState({displayCount : e.target.value, activePage: 0})
      this.props.getCampaigns(REACT_API_URL + `/campaigns?page_number=1&per_page=${e.target.value}`)
      .then((response) => {
          // console.log('response',response.data.data)
          if(response.data.status !== 404){
            if(typeof response.data !== 'undefined'){
                this.setState({totalPages: parseInt(response.data.total_pages), total_count: response.data.total_count})
            }
          }else{
            NotificationManager.error(response.data.message, 'Error');
            
          }
        })
  }

  handleSelect = (e) => {
    let { selectedCampaigns, selectCampaign } = this.props;
    const campaignIds = arrayUpdation(selectedCampaigns, e.target.name)
    selectCampaign(campaignIds)
    this.setState({ errors: {}});
  }

  handleDateChange = (e) => {
    e.preventDefault();
    this.setState({ dateValue: e.target.value })
  }

  filterByDate = (e) => {
    e.preventDefault();
    this.props.getCampaigns(REACT_API_URL + `/campaigns?page_number=1&date=${this.state.dateValue}`);
  }

  handleAction = (e) => {
    e.preventDefault();
    let newState = Object.assign(this.state, {});
    delete newState.errors.actionError
    newState.currentFilter = e.target.value
    this.setState(newState)
  }

  handleApply = (e) => {
    e.preventDefault();
    const { currentFilter } = this.state;
    const { selectedCampaigns } = this.props;
    let newState = Object.assign(this.state, {});

    if(isEmpty(currentFilter) || isEmpty(selectedCampaigns)) {
      newState.errors['actionError'] = 'Please select campaigns or action before submitting some action.'
    }

    if (isEmpty(newState.errors)) {
      this.props.applyAction(this.state.currentFilter, this.props.selectedCampaigns)
      .then((res) => {
        if(res.data.status === 200) {
          this.props.getCampaigns(REACT_API_URL + `/campaigns?page_number=1`);
        }
      }).then((error) => {
        console.log(error);
      })
    } else {
      this.setState(newState);
    }
  }

  searchChange = (e) => {
    this.setState({ searchVal: e.target.value })
  }

  pageChange = (page, e) => {
    this.setState({ activePage: page})
  }

  getPages = (totalPages) => {
    totalPages = parseInt(totalPages)
    const { activePage } = this.state;
    const ary2 = [activePage, (activePage + 1)]
    const ary3 = [activePage, activePage + 1, activePage + 2]
    const pages = ((activePage + 2) <= totalPages) ? ary3 : (((activePage + 1) <=  totalPages) ? ary2 : [activePage])
    return pages
  }

  changeCurrentPage = (data) => { 
    var page = data.selected + 1
    this.setState({ activePage: data.selected})
    this.props.getCampaigns(REACT_API_URL + `/campaigns?page_number=${page}&per_page=${this.state.displayCount}`)
    
  }

  campaignPlay = (e) => {
    e.preventDefault(); 
    let url;
    if(this.state.linkedin_cookie !== ""){
      localStorage.setItem('linkedin_cookie', this.state.linkedin_cookie);
      if(this.state.check === 1){
        // this.props.getCampaignPlay(REACT_API_URL + `/campaigns/${this.state.campaignIds}/start.json?page_number=`+1)
        this.props.history.push({
          pathname: `/campaign/play/${this.state.campaignIds}`,
          data: this.state.type
        })
      }else if(this.state.check === 3){
        url = REACT_API_URL + `/campaigns/${this.state.campaignIds}/play`
        this.state.campaigns.filter((row) =>{
          if(row.uuid === this.state.campaignIds){
            row.play = true
            row.end = false
          }
          return row
        })
        this.props.getCampaignPlaying(url)
        .then((res) => {
          if(parseInt(res.data.status) === 200) {
            // console.log("res",this.state.campaigns)
            NotificationManager.success(res.data.message, 'Success');  
            
          }else{
            NotificationManager.error(res.data.message, 'Error');  
          }
        }).then((error) => {
          console.log(error);
        })
        
      }else{
        url = REACT_API_URL + `/invitations/` + this.state.type
        this.props.getScraping(url);
      }

      
      this.setState({ show: false})
    }else{
      this.setState({errorMsg: 'Please Enter Linkedin cookie.("li_at")'})
    }
  }


  handleShow = (campaignIds, type, check) => {
      this.setState({show: true, campaignIds: campaignIds, type: type, check : check})
  };

  handleShowMember = (campaignIds, campaign_type) => {
      this.props.history.push({
          pathname: `/campaigns/${campaignIds}/members`
        })
  }

  editCampaign = (campaignIds) => {
      this.props.history.push({
        pathname: `/campaign/update/${campaignIds}`,
        state: { "campaignId" : campaignIds}
      })
  }  

  handleClose = () => {
      this.setState({show: false})
  }; 

  fieldValChange = (e) => {
    this.setState({[e.target.name] : e.target.value, errorMsg: ''})
  }

  handleDeleteClose = () => {
      this.setState({openDeleteModal: false})
  }; 

  hideLogs = () => {
    this.setState({logs: [], showLogs: false, activeLogId: null})
  }

  handleShowLogs = (campaignIds, activeCampaignTitle) => {
    const url = REACT_API_URL + `/campaigns/${campaignIds}/campaign_logs?logs_for=campaign`
    this.props.getLogs(url)
    .then((res) => {
      if(res.status === 200) {
        console.log(res)
        this.setState({logs: res.data.campaign_logs, showLogs: true, activeLogId: campaignIds})
      }
    }).catch((err) => {
      console.log(err)
    })
    this.setState({activeCampaignTitle: activeCampaignTitle})
  }

  handleCampaignDelete = (id) => {

    this.props.deleteCampaign(id).then(
      () => 
        {
          // const campaigns = this.state.campaigns;
          // campaigns.splice(this.state.campaignIndex, 1);
          // this.setState({ campaigns }); 
          // let totalPage = campaigns.length / 10
          // console.log("totalPage--",totalPage)
          // console.log("activePage",this.state.activePage)
          this.setState({openDeleteModal: false, activeCampaignId: '', campaignIndex: ''})
          NotificationManager.error('Campaign Deleted', 'Deleted');
          this.props.getCampaigns(REACT_API_URL + `/campaigns?page_number=`+this.state.activePage)
          .then((response) => {
            // console.log('response',response)
            if(typeof response.data !== 'undefined'){
               // response.data.campaigns.sort((a, b) => Number(b.id) - Number(a.id));
               this.setState({campaigns : response.data.campaigns, totalPages: parseInt(response.data.total_pages)})
            }
            // console.log(response.data.last_page_number,'did')
          })
        }
      )
    
  }

  handlePageChange = (pageNumber) => {
    // console.log('pageNumber',pageNumber)
    this.setState({activePageLog: pageNumber})
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    // console.log("nextProps",nextProps)
    if(nextProps.campaigns.length > 0 || nextProps.campaigns.total_pages > 0 ){
      // nextProps.campaigns.campaigns.sort((a, b) => Number(b.id) - Number(a.id));
      this.setState({campaigns : nextProps.campaigns.campaigns, from: nextProps.campaigns.from_data, to:  nextProps.campaigns.to_data}) 
    }
  }

  render() {
    let { isLoading } = this.props;
    const { from, to, total_count, displayCount, logs, campaigns, activePageLog, errors } = this.state;

    const itemsCountPerPage = 10  ;
    let newLogs = (!isEmpty(logs) && logs.length > 0 ) ?  logs : []
    let activeLogs = JSON.parse(JSON.stringify((newLogs))).splice( activePageLog === 1 ? 0 : ((activePageLog - 1)*itemsCountPerPage), itemsCountPerPage)

    //`[${new Date(log.created_at).toLocaleDateString()}, ${new Date(log.created_at).toLocaleTimeString()}] 

    // console.log("res-->>>>>",campaigns)
    return (
      <main>
          <section className="page-heading-breadcrumb-section">
              <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                          <li className="breadcrumb-item active"><Link to="#">Campaigns</Link></li>
                    </ol>
                </nav>
              </div>
          </section>        
          <div className="container">
            
              <div className="row">
                  <div className="col-md-12">
                      <div className="add-new-campaign-bar mt-4 float-right">
                          <Link to="/campaign/new"><button className="btn btn-custom-primary" type="button" Name="add-new-champaign">Add New Campaign</button></Link>
                          {/* &nbsp;&nbsp;
                          <Link to="/templates/new"><button className="btn btn-dark" type="button" Name="add-new-champaign">Add New Template</button></Link>*/}
                      </div>
                  </div>
              </div>
              {/*<div className="row">
                  <div className="col-md-8">
                      <div className="campaign-status-bar mb-3">
                          <nav className="nav">
                              <Link className="nav-link active" to="#">All <span>({campaigns.length})</span></Link>
                              <Link className="nav-link" to="#">Started Campaign <span>({campaigns.filter(camp => camp.status === 'Started').length})</span></Link>
                              <Link className="nav-link" to="#">Pause Campaign <span>({campaigns.filter(camp => camp.status === 'Pause').length})</span></Link>
                              <Link className="nav-link" to="#">Ended Campaign <span>({campaigns.filter(camp => camp.status === 'Ended').length})</span></Link>
                          </nav>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="campaign-search-bar mb-3">
                          <form className="form-inline">
                              <input className="form-control mr-1" type="search" Name="search-champaign" value={searchVal} placeholder="Search Champaign" onChange={this.searchChange}/>
                          </form>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <div className="champaign-action-bar mb-3">
                          <form className="form-inline">
                              <select className="custom-select mr-1" id="champaign-bulk-action" defaultValue={currentFilter} onChange={this.handleAction}>
                                  <option selected>Bulk Action</option>
                                  <option value="Delete">Delete Champaign</option>
                                  <option value="Start">Start Champaign</option>
                                  <option value="Pause">Pause Champaign</option>
                                  <option value="End">End Champaign</option>
                              </select>

                              <button className="btn btn-dark mr-3" type="submit" Name="champaign-bulk-action-apply" onClick={this.handleApply}>Apply</button>

                              <select className="custom-select mr-1" id="champaign-bulk-action" onChange={this.handleDateChange}>
                                  <option>All Dates</option>
                                  {
                                    filterDates.map((val, index) => {
                                      return(
                                        <option key={val}>{val.toDateString()}</option>
                                      )
                                    })
                                  }
                              </select>

                              <button className="btn btn-dark mr-3" type="submit" Name="champaign-filter" onClick={this.filterByDate}>Filter</button>
                          </form>

                      </div>    
                  </div>
              </div>*/}      
              <div className="row">
                  <div className="col-md-12">
                    <span id="span_id123"></span>
                    <input type="hidden" name="span_id1234" id="span_id1234" value="" />
                      {
                        errors.actionError ? (
                          <div className="alert alert-danger" role="alert">
                            {errors.actionError}
                          </div>
                          ) : null
                      }
                  
                          <React.Fragment>



                                    <div className="card">
                                        <div className="row">

                                          <div className="col-md-9">
                                            <div className="py-3 px-3">
                                              {from} - {to} of about {total_count} results. Display &nbsp;
                                              <select name="displayCount" value={displayCount}  onChange={this.onChange} className="custom-select results-per-page">
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                              </select>
                                              &nbsp; results per page.
                                            </div>
                                          </div>

                                          <div className="col-md-3 get-email-button text-center">
                                          </div>

                                        </div>

                                    </div>


                            <table className="table table-responsive-md table-bordered table-hover table-striped" id="add-new-champaign">
                                <thead className="thead-dark">
                                  <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">URL</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Members</th>
                                    <th scope="col">Email Count</th>
                                    <th scope="col">Action</th>                            
                                  </tr>

                                </thead>
                                <tbody>
                                    {isLoading ? 
                                      Array.from(Array(10), (e, i) => {
                                        return (
                                            <tr>
                                              {Array.from(Array(7), (e, i) => {
                                                return (<td>
                                                    <TableListingLoader />
                                                  </td>)
                                            })}
                                          </tr>)
                                      }) 
                                    :
                                      (campaigns.length > 0) ? campaigns.map((campaign, index) => {
                                        return(
                                          <tr key={campaign.uuid} style={{"background-color": (campaign.play && !campaign.end) ?"#FFE4B5": ""}}>
                                              
                                              <td>
                                                <Link to="#" onClick={this.handleShowMember.bind(this,campaign.uuid,'', campaign.campaign_type)} className="number-of-members-in-campaign">{campaign.title}</Link>
                                              </td>
                                              <td>
                                                <ShowMoreText
                                                    /* Default options */
                                                    lines={3}
                                                    more='Show more'
                                                    less='Show less'
                                                    anchorClass=''
                                                    expanded={false}
                                                    width={250}
                                                >
                                                    {campaign.description || ""}
                                                </ShowMoreText>
                                              </td>
                                              <td className="single-champaign-action text-center">
                                                <a href={campaign.url} rel="noopener noreferrer" target="_blank">Search URL</a>
                                              </td>
                                              <td className="single-champaign-action text-center">
                                                {campaign.campaign_type}
                                              </td>
                                              <td className="single-member text-center">
                                                <Link to="#" onClick={this.handleShowMember.bind(this,campaign.uuid,'', campaign.campaign_type)} className="number-of-members-in-campaign">{campaign.total_members.all_member_count || 0}</Link>
                                              </td>
                                              <td className="single-member text-center">
                                                <Link to="#" onClick={this.handleShowMember.bind(this,campaign.uuid,'', campaign.campaign_type)} className="number-of-members-in-campaign">{campaign.total_members.member_with_email_count || 0}</Link>
                                              </td>
                                              <td className="single-champaign-action text-center">

                                                <React.Fragment className="d-none">
                                                  <OverlayTrigger
                                                    key="top"
                                                    placement="top"
                                                    overlay={
                                                      <Tooltip id={`tooltip-top-start`}>
                                                        {(!campaign.play || campaign.end) ? "Edit Campaign" : "Running Campaign" }
                                                      </Tooltip>
                                                    }
                                                  >
                                                    <i className="fa fa-pencil" aria-hidden="true" data-toggle="tooltip" data-placement="top" onClick={(!campaign.play || campaign.end) ? this.editCampaign.bind(this,campaign.uuid) : ''}> </i> 
                                                  </OverlayTrigger>
                                                  <OverlayTrigger
                                                    key="top"
                                                    placement="top"
                                                    overlay={
                                                      <Tooltip id={`tooltip-top-end`}>
                                                        Logs
                                                      </Tooltip>
                                                    }
                                                  >
                                                    <i className="fa fa-history" aria-hidden="true" onClick={this.handleShowLogs.bind(this,campaign.uuid, campaign.title)} data-toggle="tooltip" data-placement="top"></i>
                                                  </OverlayTrigger>
                                                </React.Fragment>
                                              </td>
                                          </tr>
                                        )
                                      }) : (
                                        <tr><td colSpan={7}>No campaigns found. Please create new.</td></tr>
                                      )
                                    }
                                </tbody>
                            </table>
                            {this.state.totalPages > 1 &&
                              <div className="pagination-content-bar">
                                <ReactPaginate
                                    previousLabel={"< Previous"}
                                    nextLabel={"Next >"}
                                    breakLabel={<span className="gap">...</span>}
                                    marginPagesDisplayed={3}
                                    pageRangeDisplayed={2}
                                    pageCount={this.state.totalPages}
                                    onPageChange={this.changeCurrentPage}
                                    forcePage={this.state.activePage}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"previous_page"}
                                    nextLinkClassName={"next_page"}
                                    disabledClassName={"disabled"}
                                    activeClassName={"active"}
                                    disableInitialCallback={true}
                                />
                               </div>
                             }
                          </React.Fragment>
                        
                  </div>
            </div>
          
          </div>
          <Modal show={this.state.showLogs} size="lg" dialogClassName="modal-90w" onHide={this.hideLogs.bind(this)}>

            <Modal.Body>
              <Modal.Header closeButton>
                <Modal.Title>Logs for {this.state.activeCampaignTitle}</Modal.Title>
              </Modal.Header>
              <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th className="w-30" scope="col">Created At</th>
                    <th scope="col">Logs</th>
                  </tr>
                </thead>  
                <tbody>
                  {
                    activeLogs.length ? (
                      <Fragment>
                        {
                          activeLogs.map((log, index) => {
                            return(
                              
                              <tr>
                                <td className="w-30">{log.created_at}</td>
                                <td><div dangerouslySetInnerHTML={{__html:`${log.log}`}} /></td>
                              </tr>
                            )
                          })
                        }
                      </Fragment>
                      ) : (
                      <tr><td colSpan="2">No Logs Found.</td></tr>
                    )
                  }
                  
                </tbody>
              </table>

              <div className="popup-footer-logs-counts-and-pagination">
                <div className="row">
                  <div className="col-md-9">
                      {
                      logs.length > 0 &&
                          <div className="popup-footer-logs-counts-and-pagination">
                            <div className="pagination-content-bar">
                              <Pagination
                                activePage={this.state.activePageLog}
                                itemsCountPerPage={itemsCountPerPage}
                                totalItemsCount={logs.length}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                                prevPageText="Previous"
                                nextPageText="Next"
                              />  
                            </div>
                          </div>
                      }
                  </div>
                  <div className="col-md-3 logs-count-box">
                      <p className="">Total Logs: {logs.length}</p>
                  </div>
              </div>
            </div>    

            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.hideLogs.bind(this)}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleShowLogs.bind(this,this.state.activeLogId, this.state.activeCampaignTitle)}>
                Refresh
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.openDeleteModal} onHide={this.handleDeleteClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body></Modal.Body> */}
            <Modal.Footer>
              <Button variant="danger" onClick={() => this.handleCampaignDelete(this.state.activeCampaignId)}>
                Delete
              </Button>
              <Button variant="info" onClick={this.handleDeleteClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
      </main>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    campaigns: state.campaigns,
    selectedCampaigns: state.selectedCampaigns,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaigns: (url) => dispatch(getCampaigns(url)),
    getScraping: (url) => dispatch(getScraping(url)), 
    getCampaignPlay: (url) => dispatch(getCampaignPlay(url)),
    getCampaignPlaying: (url) => dispatch(getCampaignPlaying(url)),
    deleteCampaign: (id) => dispatch(deleteCampaign(id)),
    selectCampaign: (data) => dispatch(selectCampaign(data)),
    applyAction: (action, ids) => dispatch(applyAction(action, ids)),
    getLogs: (url) => dispatch(getLogs(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// const findActiveConversation = (conversations, activeConversation) => {
//   return conversations.find(
//     conversation => conversation.id === activeConversation
//   );
// };

// const mapConversations = (conversations, handleClick) => {
//   return conversations.map(conversation => {
//     return (
//       <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
//         {conversation.title}
//       </li>
//     );
//   });
// };