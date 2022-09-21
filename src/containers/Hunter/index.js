import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTemplates, selectTemplate,deleteTemplate } from '../../actions/templateActions';
import Loader from '../../components/Loader/Loader';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';

class Index extends Component {

  constructor(props){
    super(props)
    this.state = {
      openDeleteModal: false,
      activeTemplateId: ''
    }
  }

   componentDidMount() {
      this.props.getTemplates()
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
          this.props.getTemplates()
        }
      )
    
  }


   renderTem = () => {
    let {templates} = this.props
    let allRows = []

    let rows = templates && templates.map(tem => {
          allRows.push( 
            <tr key={tem.id}>
              <td scope="col">
                 <img src="https://via.placeholder.com/200x100" />
               </td>
               <td>
               {tem.template_name}
               </td>
              <td scope="col">
               {tem.template_subject}
               </td>
              <td scope="col">
              {tem.body}
              </td>
              <td scope="col">
                <div className="row mr-3">
                  <Link className="nav-link" to={{pathname: `/templates/update/${tem.id}`, state: {templateId: tem.id}}}> 
                      <i className="fa fa-pencil"   title='Edit'> </i>
                  </Link>

                  <i className="fa fa-trash mt-2" title='Delete' onClick={() => this.setState({openDeleteModal: true, activeTemplateId: tem.id})}> </i>
                  </div>
               </td>
            </tr>)
    }) 

    return(
      <table className="table table-responsive-md table-bordered table-hover table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col"> Thumbnail</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Body</th>
              <th scope="col" >Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRows}
          </tbody>
        </table>

      )
   }

   render() {
        const { templates,isLoading } = this.props;
        return (
            <main>
            { isLoading ? 
               <Loader loading={true} /> 
                :
                <div className="container">
                    <div className="row">
                        <h1 className="temp-head">Select a template</h1>
                    </div>
                    <div className="row">
                         <div className="mt-2 mb-2">
                           <Link className="nav-link" to="/templates/new"> 
                             <button className="btn btn-dark"> Create New Template</button>
                             </Link> 
                        </div>

                        <p>
                        Scroll through the available templates until you find one you’d like to use. Once you find a template you wish to use, simply 
                        click on the thumbnail to apply it on your 
                        campaign.</p>
                        {
                            this.renderTem() 
                        }
                    </div>

                    <Modal show={this.state.openDeleteModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Are you sure to delete this template ?</Modal.Title>
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
    getTemplates: () => dispatch(fetchTemplates()),
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