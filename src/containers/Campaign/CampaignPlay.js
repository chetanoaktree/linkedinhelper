import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCampaignPlay } from '../../actions/campaignActions';
import ReactPaginate from 'react-paginate';
import "react-pagination-library/build/css/index.css"; //for css
import Loader from '../../components/Loader/Loader';
// import './_dashboard.css';
import {REACT_API_URL} from '../../constants/env.js'
import {NotificationManager} from 'react-notifications';
import { isValidHttpUrl } from '../../utils/featuredActions';
import { Link } from 'react-router-dom';


class CampaignPlay extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 1,
      totalPages: 0,
      searchVal: '',
      currentFilter: null,
      filterDates: [],
      list: [],
      dateValue: null,
      errors: {},
      perPage: 10,
      type: 'connect',
      allChecked: false,
    }
  }

  componentDidMount() {
    // console.log('${this.props.match.params.id}',this.props)
    
    this.props.getCampaignPlay(REACT_API_URL + `/campaigns/${this.props.match.params.id}1/start.json?page_number=`+1)
    .then((response) => {
      if(response.data.status !== 404){
        if(typeof response.data !== 'undefined'){
           this.setState({totalPages: parseInt(response.data.last_page_number)})  
        }
      }else{
        NotificationManager.error(response.data.message, 'Error');
        this.props.history.push('/campaign')
      }
        
    })
    if(typeof this.props.location.data !== 'undefined'){
      var data = this.props.location.data
      // console.log('data',data)
      this.setState({
        type: data
      })
    }
  }



  findEmail = (e) => {
    e.preventDefault();
    const { list } = this.state;
    var arr = [];
    list.filter(function(row) {
      if(row.isChecked){  
        arr.push(row)
      }
      return row
    });
    // console.log(arr);
    this.props.history.push({
      pathname: '/campaign/select',
      data: arr // your data array of objects
    })
  }

  searchChange = (e) => {
    this.setState({ searchVal: e.target.value })
  }

  changeCurrentPage = (data) => {//console.log('---->>>',data)
    var page = data.selected + 1
    this.setState({ activePage: page})
    this.props.getCampaignPlay(REACT_API_URL + `/campaigns/${this.props.match.params.id}/start.json?page_number=`+page);
  }

  ConnectAll =(e) => {
    e.preventDefault();
    // const { selectedCampaignPlay, campaignPlay } = this.props;
    const { list } = this.state;
    var arr = [];
    list.filter(function(row) {
      if(row.isChecked){  
        arr.push(row)
      }
      return row
    });
    if(arr.length === 0 ){
      NotificationManager.error('Please select atleast one profile.', 'Error');
      return false  
    }
    
    var newArg = {
      'leads': arr,
      'id': this.props.match.params.id
    }
    this.props.history.push({
      pathname: `/campaigns/${this.props.match.params.id}/members`,
      data: newArg // your data array of objects
    })

  }
  UNSAFE_componentWillReceiveProps(nextProps){
    // console.log("nextProps",nextProps)
    if((nextProps.campaignPlay.length > 0 || typeof nextProps.campaignPlay.data !== 'undefined') && nextProps.campaignPlay.data.count > 1){
      nextProps.campaignPlay.data.profiles.map((row) => 
        {
           row.isChecked = false 
           return row
        }
      ) 
      this.setState({list : nextProps.campaignPlay.data.profiles}) 
    }
    
  }

  handleChange = (e) => {
    let itemName = e.target.name;
    let checked = e.target.checked;
    this.setState(prevState => {
      let { list, allChecked } = prevState;
      if (itemName === "checkAll") {
        allChecked = checked;
        list = list.map(item => ({ ...item, isChecked: checked }));
      } else {
        list = list.map(item =>
          item.profile_url === itemName ? { ...item, isChecked: checked } : item
        );
        allChecked = list.every(item => item.isChecked);
      }
      return { list, allChecked };
    });
  };

  render() {
    let { campaignPlay, isLoading } = this.props;
    const { list, errors } = this.state;
    // console.log('selectedCampaignPlay',list)
    return (
      <main>
          <section className="page-heading-breadcrumb-section">
            <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item active"><Link to="#">Future Leads</Link></li>
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
                            <div className="mb-3"> 
                             {!isLoading && list.length > 0 &&
                               <div className="get-email">
                                   <input
                                      className="checkbox-add larger"
                                      type="checkbox"
                                      name="checkAll"
                                      checked={this.state.allChecked}
                                      onChange={this.handleChange}
                                    />
                                    Select All

                                </div>
                              }
                            </div>
                            <ul className="campaign-play">
                            {
                              isLoading ? (
                                <li className="campaign-loader">
                                  <Loader loading={true} />
                                </li>  
                              ) : 
                            
                              (campaignPlay.length > 0 || typeof campaignPlay.data !== 'undefined') ? list.map((campaign, index) => {
                                // console.log(selectedCampaignPlay.includes(index))
                                return(
                                  <li id="people_list" className="search-result card bg-light mb-3" key={index}>
                                    <div id="" className="">
                                       <div className="search-result__wrapper">
                                          <div className="search-result__image-wrapper">
                                             <Link id="" className="search-result__result-link">
                                                <figure className="search-result__image">
                                                   <div id="" className="">
                                                      <div id="" className="display-flex">
                                                         <div id="" className="presence-entity presence-entity--size-4">
                                                            <img title={campaign.full_name} src={isValidHttpUrl(campaign.image_url)} loading="lazy" alt={campaign.full_name} className="ivm-view-attr__img--centered EntityPhoto-circle-4  presence-entity__image EntityPhoto-circle-4 lazy-image loaded" />
                                                         </div>
                                                      </div>
                                                   </div>
                                                </figure>
                                             </Link>
                                          </div>
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
                                             <p className="subline-level-2 t-12 t-black--light t-normal search-result__truncate">
                                                <span dir="ltr">{campaign.summary}</span>
                                             </p>
                                             <p className="subline-level-2 t-12 t-black--light t-normal search-result__truncate">
                                                <span dir="ltr">{campaign.location}</span>
                                             </p>
                                             
                                          </div>
                                          <div className="search-result__actions">
                                             <div id="">
                                                 <label>
                                                    <input type="checkbox" name={campaign.profile_url} value={campaign.profile_url} checked={campaign.isChecked} onClick={this.handleChange} className="checkbox-add larger"
                                                    />
                                                 </label>
                                              </div>
                                          </div>
                                       </div>
                                    </div>
                                  </li>
                                  )
                                  }) : (
                                    <li className="campaign-message">{campaignPlay.message}.</li>
                                  )
                              }
                            </ul>

                            
                            <div className="mb-3"> 
                            {!isLoading && list.length > 0 &&
                               <div className="get-email">
                                { this.state.type === 'email' ?
                                  (<button className="btn btn-dark" type="button" Name="add-new-champaign" onClick={this.findEmail}>Get Email</button>):
                                  (<button className="btn btn-info" type="button" style={{'margin-right': '10px'}} Name="add-new-champaign" onClick={this.ConnectAll}>Send Invitations</button>)    
                                }
                               </div> 
                             }
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
                                    forcePage={this.state.activePage}
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
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campaignPlay: state.campaignPlay,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaignPlay: (url) => dispatch(getCampaignPlay(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPlay);
