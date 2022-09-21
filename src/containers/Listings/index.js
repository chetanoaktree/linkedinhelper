import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { isEmpty } from 'lodash';
import { fetchListings, selectListing, deleteListing } from '../../actions/listingActions';
import { getLogs } from '../../actions/campaignActions';
import { Button, Modal } from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import ReactPaginate from 'react-paginate';
import Pagination from "react-js-pagination";
import {REACT_API_URL} from '../../constants/env.js'
import TableListingLoader from "../../components/Loader/Skelton"


class Index extends Component {

  constructor(props){
    super(props)
    this.state = {
      openDeleteModal: false,
      activeTemplateId: '',
      activePage: 0,
      totalPages: 0,
      from: 0,
      to: 0,
      total_count: 0,
      displayCount: 10,
      logs: [],
      daily_limit: 0,
      activePageLog: 1,
      activeCampaignTitle: ''
    }
  }

  componentDidMount() {
      this.props.getListing(REACT_API_URL + `/listings?page_number=1&per_page=${this.state.displayCount}`)
      .then((response) => {
        // console.log('response',response)
        if(typeof response.data !== 'undefined'){
           this.setState({totalPages: parseInt(response.data.total_pages), total_count: parseInt(response.data.total_count)})  
        }
        // console.log(response.data.last_page_number,'did')
      })
  }
  onChange = (e) => {
      this.setState({displayCount : e.target.value, activePage: 0})
      this.props.getListing(REACT_API_URL + `/listings?page_number=1&per_page=${e.target.value}`)
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
  changeCurrentPage = (data) => { 
    var page = data.selected + 1
    this.setState({ activePage: data.selected})
    this.props.getListing(REACT_API_URL + `/listings?page_number=${page}&per_page=${this.state.displayCount}`);
  }
   selectListing = (template, e) => {
      e.preventDefault();
      this.props.selectListing(template)
      this.props.history.push('/listing/new')
   }

  
  handleClose = () => {
      this.setState({openDeleteModal: false})
  }; 

  handleTemplateDelete = (id) => {
    this.props.deleteListing(id).then(
      (res) => 
        {
          this.setState({openDeleteModal: false,activeTemplateId: ''})
          NotificationManager.error(res.message, 'Remove');
          this.props.getListing(REACT_API_URL + `/listings?page_number=`+this.state.activePage+'&per_page='+ this.state.displayCount).then((response) => {
            if(response.data.status !== 404){
              if(typeof response.data !== 'undefined'){
                  this.setState({totalPages: parseInt(response.data.total_pages), total_count : this.state.total_count - 1, from: (this.state.total_count - 1 === 0) ? 0 : this.state.from, to : this.state.to - 1})
              }
            }else{
              NotificationManager.error(response.data.message, 'Error');
              
            }
          })
        }
      )
    
  }
  handleShowMember = (listingIds) => {
      this.props.history.push({
          pathname: `/listing/${listingIds}/members`
        })
  }

  handleEdit = (id) => {
      this.props.history.push({
        pathname: `/listing/update/${id}`,
        state: { "listingId" : id}
      })
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    // console.log("nextProps",console.log("nextProps",nextProps.listing))
    if(nextProps.listing.data && (nextProps.listing.data.listings.length > 0 || nextProps.listing.data.total_pages > 0 )){
      
      // nextProps.listing.listingd.sort((a, b) => Number(b.id) - Number(a.id));
      this.setState({listing : nextProps.listing.data.listingd, from: nextProps.listing.data.from_data, to:  nextProps.listing.data.to_data}) 
    }
  }

  hideLogs = () => {
    this.setState({logs: [], showLogs: false, activeLogId: null})
  }

  handleShowLogs = (campaignIds, activeCampaignTitle) => {
    const url = REACT_API_URL + `/listings/${campaignIds}/campaign_logs?logs_for=listing`
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

  handlePageChange = (pageNumber) => {
    // console.log('pageNumber',pageNumber)
    this.setState({activePageLog: pageNumber})
  }

   render() {
        const { listing,isLoading } = this.props;
        // console.log('listing',listing) && listing.data.total_pages > 0
        const { from, to, total_count, displayCount, logs, activePageLog } = this.state;

        const itemsCountPerPage = 10  ;
        let newLogs = (!isEmpty(logs) && logs.length > 0 ) ?  logs : []
        let activeLogs = JSON.parse(JSON.stringify((newLogs))).splice( activePageLog === 1 ? 0 : ((activePageLog - 1)*itemsCountPerPage), itemsCountPerPage)
        return (
            <main>
              <section className="page-heading-breadcrumb-section">
                <div className="container">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                      <li className="breadcrumb-item active"><Link to="#">List</Link></li>
                  </ol>
                </nav>
                </div>
              </section>              
           
                <div className="container">
                    <div className="row">
                      <div className="col-md-12">  
                        <div className="add-new-campaign-bar mt-4 mb-4 float-right">
                           <Link className="" to="/listing/new"> 
                             <button className="btn btn-custom-primary"> Add to Listings</button>
                             </Link> 
                        </div>
                      </div>
                      <div className="col-md-12">


                                <div className="card">
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



                        <table className="table table-responsive-md table-bordered table-hover table-striped" >
                          <thead class="thead-dark">
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">Members</th>
                              <th scope="col">Email Count</th>
                              <th scope="col" >Actions</th>
                            </tr>
                          </thead>
                          <tbody className="list-tbody">
                            { isLoading ? 
                              Array.from(Array(10), (e, i) => {
                                  return (
                                      <tr>
                                        {Array.from(Array(5), (e, i) => {
                                          return (<td>
                                              <TableListingLoader />
                                            </td>)
                                      })}
                                    </tr>)
                                }) 
                              :
                              ((listing.length > 0 || typeof listing.data !== 'undefined') && listing.data.total_pages > 0  ) ?  listing.data.listings.map((tem, index) => {
                              return(
                                <tr key={tem.uuid}>
                                   <td className="w-50">
                                   <Link to="#" onClick={this.handleShowMember.bind(this,tem.uuid)}>{tem.name}</Link>
                                   </td>
                                  <td>
                                  {tem.description}
                                  </td>
                                  <td className="text-center single-member">
                                    <Link to="#" onClick={this.handleShowMember.bind(this,tem.uuid)} className="number-of-members-in-campaign">{tem.total_members.all_member_count}</Link>
                                  </td>
                                  <td className="text-center single-member">
                                    <Link to="#" onClick={this.handleShowMember.bind(this,tem.uuid)} className="number-of-members-in-campaign">{tem.total_members.member_with_email_count}</Link>
                                  </td>
                                  <td className="text-center">
                                    <OverlayTrigger
                                        key="top"
                                        placement="top"
                                        overlay={
                                          <Tooltip id={`tooltip-top-start`}>
                                            Edit
                                          </Tooltip>
                                        }
                                      >
                                      <i className="fa fa-pencil mr-2" onClick={this.handleEdit.bind(this,tem.uuid)} aria-hidden="true" data-toggle="tooltip" data-placement="top"></i>
                                    </OverlayTrigger>

                                    {/*<OverlayTrigger
                                      key="top"
                                      placement="top"
                                      overlay={
                                        <Tooltip id={`tooltip-top-start`}>
                                          Delete
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-trash mr-2" onClick={() => this.setState({openDeleteModal: true, activeTemplateId: tem.uuid})} aria-hidden="true" data-toggle="tooltip" data-placement="top"></i>
                                    </OverlayTrigger>*/}
                                    <OverlayTrigger
                                      key="top"
                                      placement="top"
                                      overlay={
                                        <Tooltip id={`tooltip-top-end`}>
                                          Logs
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-history" aria-hidden="true" onClick={this.handleShowLogs.bind(this,tem.uuid, tem.name)} data-toggle="tooltip" data-placement="top"></i>
                                    </OverlayTrigger>
                                   </td>
                                </tr>)
                                }) : (
                                    <tr><td colSpan={5}>No list found. Please create new.</td></tr>
                                  )
                              }
                          </tbody>
                        </table>
                        { this.state.totalPages > 1 &&
                            <div className="mb-3"> 
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
                              />
                             </div> 
                            </div>
                          }
                      </div>    
                    </div>

                    <Modal show={this.state.openDeleteModal} onHide={this.handleClose} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                      </Modal.Header>
                      {/* <Modal.Body></Modal.Body> */}
                      <Modal.Footer>
                        <Button variant="danger" onClick={() => this.handleTemplateDelete(this.state.activeTemplateId)}>
                          Delete
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>

                  <Modal show={this.state.showLogs} size="lg" dialogClassName="modal-90w" onHide={this.hideLogs.bind(this)}>
                    <Modal.Body>
                      <Modal.Header closeButton>
                        <Modal.Title>Logs for {this.state.activeCampaignTitle}</Modal.Title>
                      </Modal.Header>
                      <table className="table table-striped table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Created At</th>
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
                                        <td>{log.created_at}</td>
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
                                <div className="pagination-content-bar">
                                  {
                                    logs.length > 0 &&
                                    <div className="log-pagination">
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
                                  }
                                </div>
                              </div>

                            <div className="col-md-3 logs-count-box">
                              <p className="mt-3">Total Logs: {logs.length}</p>
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

                </div>
              
            </main>
        )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListing: (url) => dispatch(fetchListings(url)),
    deleteListing: (id) => dispatch(deleteListing(id)),
    selectListing: (listing) => dispatch(selectListing(listing)),
    getLogs: (url) => dispatch(getLogs(url))
  };
};

const mapStateToProps = (state) => {
    return {
      listing: state.listings,
      isLoading: state.applicationIsLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);