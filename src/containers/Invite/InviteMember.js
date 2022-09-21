import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInviteMember, reSendInvitations, deleteInvitations} from '../../actions/listingActions';
import Loader from '../../components/Loader/Loader';
import {REACT_API_URL} from '../../constants/env.js'
import ReactPaginate from 'react-paginate';
// import { isValidHttpUrl } from '../../utils/featuredActions';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button, Modal } from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import TableListingLoader from "../../components/Loader/Skelton"

class InviteMember extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 0,
      activeTab: "all",
      totalPages: 1,
      errors: {},
      perPage: 10,
      allMember: 0,
      acceptMember: 0,
      pendingMember: 0,
      openDeleteModal: false,
      inviteId: '',
      total_count: 0,
      displayCount: 10,
      from: 0,
      to: 0,
      members: {},
      indexID: ''
    }
  }

  componentDidMount() {
   
    let url = REACT_API_URL + `/invitations?page_number=1&per_page=${this.state.displayCount}`
    this.props.getInviteMember(url)
    .then((response) => {
        // console.log('response',response)
        if(typeof response.data !== 'undefined'){
           this.setState({
             totalPages: parseInt(response.data.total_pages),
             total_count: response.data.total_count
           })  
        }
        // console.log(response.data.last_page_number,'did')
      })
  }


  changeCurrentPage = (data) => {//console.log('---->>>',data)
    var page = data.selected + 1
    this.setState({ activePage: page.selected})
    this.props.getInviteMember(REACT_API_URL + `/invitations?page_number=${page}&per_page=${this.state.displayCount}`);
  }

  handleClose = () => {
      this.setState({openDeleteModal: false})
  }; 

  handleInviteDelete = (id) => {
      this.props.deleteInvitations(id).then((res) =>{
          NotificationManager.error(res.message, 'Remove');
          const members = this.state.members;
          members.members.splice(this.state.indexID, 1);
          this.setState({ members });
          this.setState({openDeleteModal: false,inviteId: '', indexID: '', total_count : this.state.total_count - 1, from: (this.state.total_count - 1 === 0) ? 0 : this.state.from, to : this.state.to - 1})
      })
  }

  handleResendInvite = (id, idx) => {
     
      let url = REACT_API_URL + `/invitations/${id}/resend_invitation`
      this.props.reSendInvitations(url).then((res) =>{
          NotificationManager.success(res.data.message, 'Resend');
          let members = Object.assign(this.state.members); // Pull the entire jobs object out. Using object.assign is a good idea for objects.
          members.members[idx].is_expired = false; // update the jobs object as needed
          this.setState({ members });
          // this.props.getInviteMember(REACT_API_URL + `/invitations?page_number=${this.state.activePage}&per_page=${this.state.displayCount}`);
      })
  }

  onChange = (e) => {
      this.setState({displayCount : e.target.value, activePage: 0})
      this.props.getInviteMember(REACT_API_URL + `/invitations?page_number=1&per_page=${e.target.value}`)
      .then((response) => {
          // console.log('response',response.data.data)
          if(response.data.status !== 404){
            if(typeof response.data !== 'undefined'){
                this.setState({totalPages: response.data.total_pages, total_count: response.data.total_count})
            }
          }else{
            NotificationManager.error(response.data.message, 'Error');
            
          }
        })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.members !== prevState.members && nextProps.members.total_pages > 0 ) {
      return ({members : nextProps.members, from: nextProps.members.from_data, to:  nextProps.members.to_data}) 
      
    }
    return null
  }

  render() {
    let { isLoading } = this.props;
    const { from, to, total_count, displayCount, errors, members } = this.state;

    return (
      <main>
          <section className="page-heading-breadcrumb-section">
            <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item active"><Link to="#">Invite</Link></li>
              </ol>
            </nav>
            </div>
          </section>        
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="add-new-campaign-bar mb-4 mt-4 float-right">
                          <Link to="/invite"><button className="btn btn-custom-primary" type="button" Name="add-new-champaign">Invite</button></Link>
                          {/* &nbsp;&nbsp;
                          <Link to="/templates/new"><button className="btn btn-dark" type="button" Name="add-new-champaign">Add New Template</button></Link>*/}
                      </div>
                  </div>
              </div>  
              <div className="row">
                  
                        {
                          errors.actionError ? (
                            <div className="alert alert-danger" role="alert">
                              {errors.actionError}
                            </div>
                            ) : null
                        }
                   
                        <React.Fragment>
                          <div className="col-md-12">
                            <table className="table table-def table-responsive-md table-bordered table-hover blacklistFilterBox">
                              <tbody>
                                <tr>
                                  <td colSpan="3" className="p-0">
                                    <div>
                                      <div className="col-md-12 px-0">
                                        <div className="search-result__wrapper">
                                          <div className="col-md-10">
                                            <div className="search-result__info py-3 ph0">
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
                                          <div className="col-md-2 get-email-button text-center py-3">
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>  
                            </table>
                            <table className="table table-responsive-md table-bordered table-hover table-striped">
                              <thead class="thead-dark">
                                <tr>
                                  <th scope="col">Invited Email</th>
                                  <th scope="col">Accepted Email</th>
                                  <th scope="col">Created At</th>
                                  <th scope="col">Accepted At</th>
                                  <th scope="col">Status</th>
                                  <th scope="col" >Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                { isLoading && 
                                   Array.from(Array(10), (e, i) => {
                                      return (
                                          <tr>
                                            {Array.from(Array(6), (e, i) => {
                                              return (<td>
                                                  <TableListingLoader />
                                                </td>)
                                          })}
                                        </tr>)
                                    }) 
                                 }
                                {((members.length > 0 || members.total_pages > 0) && members.members.length > 0 ? members.members.map((campaign, index) => {
                                  return(
                                    <tr key={campaign.uuid}>
                                       <td>
                                       {campaign.email}
                                       </td>
                                      <td>
                                        {campaign.receiver_email}
                                      </td>
                                      <td>
                                        {campaign.created_at}
                                      </td>
                                      <td>
                                        {campaign.accepted_at}
                                      </td>
                                      <td>
                                        {campaign.status}
                                      </td>
                                      <td className="text-center">
                                        {campaign.is_accepted ? '' :
                                          (<React.Fragment>
                                            {campaign.is_expired &&
                                              (<OverlayTrigger
                                                key="top"
                                                placement="top"
                                                overlay={
                                                  <Tooltip id={`tooltip-top-start`}>
                                                    Resend
                                                  </Tooltip>
                                                }
                                              >
                                                <i className="fa fa-envelope mr-3" onClick={() => campaign.is_expired ? this.handleResendInvite(campaign.uuid, index) : ''} aria-hidden="true" data-toggle="tooltip" data-placement="top"></i>
                                              </OverlayTrigger>)
                                            }

                                            <OverlayTrigger
                                              key="top"
                                              placement="top"
                                              overlay={
                                                <Tooltip id={`tooltip-top-start`}>
                                                  Delete
                                                </Tooltip>
                                              }
                                            >
                                              <i className="fa fa-trash mr-2" onClick={() => this.setState({openDeleteModal: true, inviteId: campaign.uuid, indexID: index})} aria-hidden="true" data-toggle="tooltip" data-placement="top"></i>
                                            </OverlayTrigger>
                                          </React.Fragment>)
                                        }
                                       </td>
                                    </tr>)
                                    }) : (
                                        <tr><td colSpan={6}>{members.message || 'No records found.'}</td></tr>
                                      )
                                  )
                                  }
                              </tbody>
                            </table>
                            { this.props.totalPages > 1 &&
                                <div className="mb-3"> 
                                 <div className="pagination-content-bar">
                                  <ReactPaginate
                                      previousLabel={"< Previous"}
                                      nextLabel={"Next >"}
                                      breakLabel={<span className="gap">...</span>}
                                      marginPagesDisplayed={3}
                                      pageRangeDisplayed={2}
                                      pageCount={this.props.totalPages}
                                      onPageChange={this.props.changeCurrentPage}
                                      forcePage={this.props.activePage}
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
                        
                        <Modal show={this.state.openDeleteModal} onHide={this.handleClose} centered>
                          <Modal.Header closeButton>
                            <Modal.Title>Are you sure?</Modal.Title>
                          </Modal.Header>
                          {/* <Modal.Body></Modal.Body> */}
                          <Modal.Footer>
                            <Button variant="danger" onClick={() => this.handleInviteDelete(this.state.inviteId)}>
                              Delete
                            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                              Cancel
                            </Button>
                          </Modal.Footer>
                        </Modal>
                          
                         
                          
                        </React.Fragment>
                  
            </div>
          </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.inviteMemberData,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInviteMember: (url) => dispatch(getInviteMember(url)),
    reSendInvitations: (url) => dispatch(reSendInvitations(url)),
    deleteInvitations: (url) => dispatch(deleteInvitations(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteMember);
