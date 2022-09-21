import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHistoryMember} from '../../actions/listingActions';
// import Loader from '../../components/Loader/Loader';
import {REACT_API_URL} from '../../constants/env.js'
import ReactPaginate from 'react-paginate';
// import { isValidHttpUrl } from '../../utils/featuredActions';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import Accordion from 'react-bootstrap/Accordion'
import TableListingLoader from "../../components/Loader/Skelton"

class History extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 0,
      activeTab: "all",
      newSearchItem: '',
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
      historyMembers: {},
      indexID: '',
      active: ''
    }
  }

  componentDidMount() {
   
    let url = REACT_API_URL + `/users/automation_history?page_number=1&per_page=${this.state.displayCount}`
    this.props.getHistoryMember(url)
    .then((response) => {
        console.log('response',response)
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
    this.props.getHistoryMember(REACT_API_URL + `/users/automation_history?page_number=${page}&per_page=${this.state.displayCount}&search_by=${this.state.newSearchItem}`);
  }

  handleSearch = (e) => {
    this.setState({newSearchItem: e.target.value, activePage: 0})
    if(e.target.value.length > 2){
      this.props.getHistoryMember(REACT_API_URL + `/users/automation_history?page_number=1&per_page=${this.state.displayCount}&search_by=${e.target.value}`);
    }else if(e.target.value === ''){
      this.props.getHistoryMember(REACT_API_URL + `/users/automation_history?page_number=1&per_page=${this.state.displayCount}`);
    }
  }

  handleClose = () => {
      this.setState({openDeleteModal: false})
  }; 

  onChange = (e) => {
      this.setState({displayCount : e.target.value, activePage: 0})
      this.props.getHistoryMember(REACT_API_URL + `/users/automation_history?page_number=1&per_page=${e.target.value}&search_by=${this.state.newSearchItem}`)
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
    if (nextProps.members !== prevState.members) {
      if(nextProps.members.total_pages > 0){
        return ({historyMembers : nextProps.members, from: nextProps.members.from_data, to:  nextProps.members.to_data, total_count: nextProps.members.total_count})         
      }else{
        return ({historyMembers : nextProps.members, from: 0, to:  0, total_count: 0})       
      }
      
    }
    return null
  }

  toggleActive = (id) =>{
    if(this.state.active === id){
      this.setState({active: ''})
    }else{
      this.setState({active: id})
    }
  }

  render() {
    let { isLoading } = this.props;
    const { active, from, to, total_count, displayCount, errors, historyMembers } = this.state;
    // console.log(historyMembers)
    return (
      <main>
          <section className="page-heading-breadcrumb-section">
            <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item active"><Link to="#">Automation History</Link></li>
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
                          <div className="pt-4">
                          
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
                                <tr>
                                  <td colSpan="3" className="p-0">
                                    <div>
                                      <div className="col-md-12 px-0">
                                        <div className="search-result__wrapper">
                                          <div className="col-md-12">
                                            <div className="search-result__info py-3 ph0">
                                                
                                                <input type="text" value={this.state.newSearchItem}  name="newSearchItem" className="form-control" placeholder="Type at least 3 characters..." onChange={this.handleSearch}/>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>  
                            </table>
                            
                            <Row className="historyTableHeader m-0">
                              <Col md="3">Created At</Col>
                              <Col md="5">Target</Col>
                              <Col md="2">Action</Col>
                              <Col md="1">Success</Col>
                              <Col md="1"></Col>
                            </Row>
                             { isLoading ? 
                               Array.from(Array(10), (e, i) => {
                                  return (
                                      <Row className="m-0" key={i}>
                                        {Array.from(Array(5), (e, i) => {
                                          return (<Col key={i}>
                                              <TableListingLoader />
                                            </Col>)
                                      })}
                                    </Row>)
                                }) : (
                                  <div className="historyTableBody">
                                    {(historyMembers.length > 0 || historyMembers.total_pages > 0 ) ? historyMembers.members.map((campaign, index) => {
                                        const jsonString = JSON.stringify({
                                                                            "name": campaign.full_name,
                                                                            "image_url": campaign.image_url,
                                                                            "profile_url": campaign.profile_url,
                                                                            "title": campaign.title,
                                                                            "summary": campaign.summary,
                                                                            "location": campaign.location
                                                                          }, undefined, 4)
                                        return(
                                        <React.Fragment  key={campaign.uuid}>
                                          <Accordion className={active === campaign.uuid ? "p-0 active" : "p-0"} >
                                            <Row className="p-2">
                                              <Col md="3" className="column-data-value"> {campaign.created_at} </Col>
                                              <Col md="5" className="column-data-value"> <p className="para_url">{campaign.profile_url}</p></Col>
                                              <Col md="2" className="column-data-value"> {campaign.member_type}  </Col>
                                              <Col md="1" className="column-data-value"> True </Col>
                                              <Col md="1" className="column-data-value"> <Accordion.Toggle as={Button} variant="link" onClick={this.toggleActive.bind(this, campaign.uuid)} eventKey={campaign.uuid} className="history-details-toggle-button"><i className="fa fa-bars" aria-hidden="true"></i></Accordion.Toggle> </Col>
                                            </Row>
                                            <Row>
                                              <Col md="12"> 
                                                <Accordion.Collapse eventKey={active}>
                                                  <Card.Body>
                                                    <pre>{jsonString}</pre>
                                                  </Card.Body>
                                                </Accordion.Collapse>
                                              </Col>
                                            </Row>
                                          </Accordion>
                                        </React.Fragment>  
                                        )
                                      }) : (
                                          <Row className="historyTableHeader m-0">
                                            <Col md="12">No data found</Col>
                                          </Row>
                                        )
                                    
                                    }
                                  </div>
                                )
                            }
                              
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
                        </React.Fragment>
                  </div>
            </div>
          </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.historyMemberData,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryMember: (url) => dispatch(getHistoryMember(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
