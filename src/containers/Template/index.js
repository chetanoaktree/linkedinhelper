import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { fetchTemplates, selectTemplate,deleteTemplate } from '../../actions/templateActions';
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
      from: 0,
      to: 0,
      total_count: 0,
      displayCount: 10
    }
  }

  componentDidMount() {
      this.props.getTemplates(REACT_API_URL + `/templates?page_number=1&per_page=${this.state.displayCount}`)
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
      this.props.getTemplates(REACT_API_URL + `/templates?page_number=1&per_page=${e.target.value}`)
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
    this.props.getTemplates(REACT_API_URL + `/templates?page_number=`+page+'&per_page='+ this.state.displayCount);
  }

   selectTemplate = (template, e) => {
      e.preventDefault();
      this.props.selectTemplate(template)
      this.props.history.push('/campaign/new')
   }

  
  handleClose = () => {
      this.setState({openDeleteModal: false})
  }; 

  handleTemplateDelete = (id) => {
    this.props.deleteTemplate(id).then(
      () => 
        {
          this.setState({openDeleteModal: false,activeTemplateId: ''})
          NotificationManager.error('Template Deleted', 'Deleted');
          this.props.getTemplates(REACT_API_URL + `/templates?page_number=`+this.state.activePage+'&per_page='+ this.state.displayCount).then((response) => {
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
      )
    
  }

  handleEdit = (id) => {
      this.props.history.push({
        pathname: `/templates/update/${id}`,
        state: { "templateId" : id}
      })
  }
  // UNSAFE_componentWillReceiveProps(nextProps){
  //   // console.log("nextProps",console.log("nextProps",nextProps.templates.data))
  //   if(nextProps.templates.data && (nextProps.templates.data.templates.length > 0 || nextProps.templates.data.total_pages > 0 )){
      
  //     nextProps.templates.data.templates.sort((a, b) => Number(b.id) - Number(a.id));
  //     this.setState({templates : nextProps.templates.data.templates, from: nextProps.templates.data.from_data, to:  nextProps.templates.data.to_data}) 
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('nextProps.blacklist',nextProps.templates)
    if (nextProps.templates !== prevState.templates && (nextProps.templates.length > 0 || typeof nextProps.templates.data !== 'undefined') ) {
        return  ({templates: nextProps.templates.data.templates, from: (nextProps.templates.data.to_data === 0) ? 0 : nextProps.templates.data.from_data, to: nextProps.templates.data.to_data}) 
      
    }
    return null
  }

   render() {
        const { templates,isLoading } = this.props;
        const { from, to, total_count, displayCount } = this.state;
        // console.log('templates',templates)
        return (
            <main>
              <section className="page-heading-breadcrumb-section">
                  <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                              <li className="breadcrumb-item active"><Link to="#">Templates</Link></li>
                        </ol>
                    </nav>
                  </div>
              </section>              
   
                <div className="container">
                    <div className="row">
                      <div className="col-md-12">  
                        <div className="add-new-campaign-bar mt-4 mb-4 float-right">
                           <Link className="" to="/templates/new"> 
                             <button className="btn btn-custom-primary"> Add New Template</button>
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
                              
                              <div className="col-md-3 get-email-button text-center">
                              </div>
                            </div>
                          </div>
                        </div>
                              
                        <table className="table table-responsive-md table-bordered table-hover table-striped">
                          <thead class="thead-dark">
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Body</th>
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
                             ((templates.length > 0 || typeof templates.data !== 'undefined') && templates.data.total_pages > 0 ) ?  templates.data.templates.map((tem, index) => {
                              return(
                                <tr key={tem.uuid}>
                                   <td>
                                   {tem.template_name}
                                   </td>
                                  <td>
                                  {tem.body}
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

                                      <OverlayTrigger
                                        key="top"
                                        placement="top"
                                        overlay={
                                          <Tooltip id={`tooltip-top-start`}>
                                            Delete
                                          </Tooltip>
                                        }
                                      >
                                        <i className="fa fa-trash mr-2" onClick={() => this.setState({openDeleteModal: true, activeTemplateId: tem.uuid})} aria-hidden="true" data-toggle="tooltip" data-placement="top"></i>
                                      </OverlayTrigger>
                                      
                                   </td>
                                </tr>)
                                }) : (
                                    <tr><td colSpan={3}>No templates found. Please create new.</td></tr>
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
    getTemplates: (url) => dispatch(fetchTemplates(url)),
    deleteTemplate: (id) => dispatch(deleteTemplate(id)),
    selectTemplate: (template) => dispatch(selectTemplate(template))
  };
};

const mapStateToProps = (state) => {
    return {
      templates: state.templates,
      isLoading: state.applicationIsLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);