import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { fetchBlacklists, selectBlacklist, deleteBlacklist } from '../../actions/blacklistActions';
import { Button, Modal } from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import ReactPaginate from 'react-paginate';
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
      total_count: 0,
      displayCount: 10,
      from: 0,
      to: 0,
      list: [],
    }
  }

   componentDidMount() {
      const { activePage, displayCount } = this.state;
      this.props.getBlacklist(REACT_API_URL + `/blacklist_members?page_number=${activePage + 1}&per_page=${displayCount}`)
      .then((response) => {
        if(typeof response.data !== 'undefined'){
          this.setState({totalPages: parseInt(response.data.total_pages), total_count: parseInt(response.data.total_count)})  
        }
      })
   }


  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps.blacklist',nextProps.blacklist)
    if (nextProps.blacklist !== prevState.blacklist && (nextProps.blacklist.length > 0 || typeof nextProps.blacklist.data !== 'undefined') ) {
        return  ({list: nextProps.blacklist.data.blacklist_members, from: (nextProps.blacklist.data.to_data === 0) ? 0 : nextProps.blacklist.data.from_data, to: nextProps.blacklist.data.to_data}) 
      
    }
    return null
  }

  changeCurrentPage = (data) => {
    this.setState({ activePage: data.selected})
    var page = data.selected + 1
    let url = REACT_API_URL + `/blacklist_members?page_number=${page}&per_page=${this.state.displayCount}`
    this.props.getBlacklist(url);
  }

  selectBlacklist = (template, e) => {
    e.preventDefault();
    this.props.selectBlacklist(template)
    this.props.history.push('/campaign/new')
  }

  
  onChange = (e) => {
      this.setState({displayCount : e.target.value, activePage: 0})
      let url = REACT_API_URL + `/blacklist_members?page_number=1&per_page=${e.target.value}`
      this.props.getBlacklist(url)
      .then((response) => {
          // console.log('response',response.data.data)
          if(response.data.status !== 404){
            if(typeof response.data !== 'undefined'){
                this.setState({totalPages: response.data.total_pages, total_count: response.data.total_count})
            }
          }else{
            NotificationManager.error(response.data.message, 'Error');
            this.props.history.push('/campaign')
          }
        })
  }

  handleClose = () => {
    this.setState({openDeleteModal: false})
  }; 

  handleTemplateDelete = (id) => {
    this.props.deleteBlacklist(id).then(
      () => 
        {
          this.setState({openDeleteModal: false,activeTemplateId: ''})
          NotificationManager.error('Delete from Blacklist', 'Delete');
          this.props.getBlacklist(REACT_API_URL + `/blacklist_members`)
          this.setState({total_count : this.state.total_count - 1, from: (this.state.total_count - 1 === 0) ? 0 : this.state.from, to : this.state.to - 1})
        }
      )
    
  }


   render() {
        const { blacklist, isLoading } = this.props;
        const { from, to, total_count, displayCount } = this.state;
        // console.log('blacklist',blacklist) && blacklist.data.total_pages > 0
        return (
            <main>
                <section className="page-heading-breadcrumb-section">
                  <div className="container">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active"><Link to="#">Blacklist</Link></li>
                    </ol>
                  </nav>
                  </div>
                </section>              
            
                <div className="container">
                    <div className="row">
                      <div className="col-md-12">  
                        <div className="add-new-campaign-bar mt-4 mb-4 float-right">
                           <Link className="" to="/blacklist/new"> 
                             <button className="btn btn-custom-primary"> Add to Blacklist</button>
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
                                

                        <table className="table table-responsive-md table-bordered table-hover table-striped">
                          
                          <thead class="thead-dark">
                            <tr>
                              <th scope="col">Linkedin Profile URL</th>
                              <th scope="col">Description</th>
                              <th scope="col" >Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            { isLoading ? 
                               Array.from(Array(10), (e, i) => {
                                  return (
                                      <tr>
                                        {Array.from(Array(3), (e, i) => {
                                          return (<td>
                                              <TableListingLoader />
                                            </td>)
                                      })}
                                    </tr>)
                                }) 
                              :
                              ((blacklist.length > 0 || typeof blacklist.data !== 'undefined') && blacklist.data.total_pages > 0  ) ?  blacklist.data.blacklist_members.map((tem, index) => {
                              return(
                                <tr key={tem.uuid}>
                                   <td className="linkedin-profile-url">
                                   {tem.profile_url}
                                   </td>
                                  <td>
                                  {tem.description}
                                  </td>
                                  <td className="text-center">
                                    
                                      {/*<Link className="nav-link" to={{pathname: `/blacklist/update/${tem.uuid}`, state: {templateId: tem.uuid}}}> 
                                              <i className="fa fa-pencil"   title='Edit'> </i>
                                          </Link>*/}

                                      <OverlayTrigger
                                        key="top"
                                        placement="top"
                                        overlay={
                                          <Tooltip id={`tooltip-top-start`}>
                                            Delete
                                          </Tooltip>
                                        }
                                      >
                                        <i className="fa fa-trash mt-2" onClick={() => this.setState({openDeleteModal: true, activeTemplateId: tem.uuid})}  aria-hidden="true" data-toggle="tooltip" data-placement="top"></i>
                                      </OverlayTrigger>
                                   </td>
                                </tr>)
                                }) : (
                                    <tr><td colSpan={3}>No blacklist found. Please create new.</td></tr>
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
                </div>
              }
            </main>
        )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBlacklist: (url) => dispatch(fetchBlacklists(url)),
    deleteBlacklist: (id) => dispatch(deleteBlacklist(id)),
    selectBlacklist: (blacklist) => dispatch(selectBlacklist(blacklist))
  };
};

const mapStateToProps = (state) => {
    return {
      blacklist: state.blacklists,
      isLoading: state.applicationIsLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);