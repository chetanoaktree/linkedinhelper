import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConnectALL, selectCampaignPlay, getConnected } from '../../actions/campaignActions';
import Loader from '../../components/Loader/Loader';
// import './_dashboard.css';
import { Link } from 'react-router-dom';
import {REACT_API_URL} from '../../constants/env.js'
import ReactPaginate from 'react-paginate';
import "react-pagination-library/build/css/index.css"; //for css


class Invitation extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 1,
      totalPages: 0,
      searchVal: '',
      currentFilter: null,
      filterDates: [],
      selected: [],
      dateValue: null,
      errors: {}
    }
  }

  componentDidMount() {
    // console.log('this.props',this.props.location)
    if(typeof this.props.location.data !== 'undefined'){
      var data = this.props.location.data
      this.setState({
        selected: data
      })  
      // console.log(arg,'arg')
      let url = REACT_API_URL + `/campaigns/${data.id}/connect.json`
      this.props.getConnectALL(data.leads,url)
      .then((response) => {
        // console.log('response',response)
        if(typeof response.data !== 'undefined'){
           this.setState({totalPages: parseInt(response.data.total_pages)})  
        }
        // console.log(response.data.last_page_number,'did')
      })
    }
    // else{
    //   let url = REACT_API_URL + '/invitations'
    //   this.props.getConnected(url)
    //   .then((response) => {
    //     // console.log('response',response)
    //     if(typeof response.data !== 'undefined'){
    //        this.setState({totalPages: parseInt(response.data.total_pages)})  
    //     }
    //     // console.log(response.data.last_page_number,'did')
    //   })
    // }
    
  }

 
  searchChange = (e) => {
    this.setState({ searchVal: e.target.value })
  }

  changeCurrentPage = (page, e) => {
    this.setState({ activePage: page})
    var url = REACT_API_URL + `/invitations?page_number=`+page
    this.props.getConnected(url)
  }

  
  render() {
    let { isLoading, connected } = this.props;
    const { errors } = this.state;
    // console.log('selected',connected)
    return (
      <main>
          <div className="container">
              <div className="row">
                <h1 className="temp-head"> </h1>
              </div>
                      

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
                            {
                              isLoading ? (
                                <li className="campaign-loader">
                                  <Loader loading={true} />
                                </li>  
                              ) : 
                            
                              (connected.length > 0 || (typeof connected.data !== 'undefined' && connected.data.count > 0) ) ? connected.data.campaign_members.map((campaign, index) => {
                                  // console.log(campaign,'---')
                                return(
                                  <li id="people_list" className="search-result" key={index}>
                                    <div id="" className="">
                                       <div className="search-result__wrapper">
                                          <div className="search-result__image-wrapper">
                                             <Link id="" className="search-result__result-link">
                                                <figure className="search-result__image">
                                                   <div id="" className="">
                                                      <div id="" className="display-flex">
                                                         <div id="" className="presence-entity presence-entity--size-4">
                                                            <img title={campaign.receiver.full_name} src={(campaign.receiver.image_url === "NA") ? '../../default.jpg' : campaign.receiver.image_url} loading="lazy" alt={campaign.full_name} className="ivm-view-attr__img--centered EntityPhoto-circle-4  presence-entity__image EntityPhoto-circle-4 lazy-image loaded" />
                                                         </div>
                                                      </div>
                                                   </div>
                                                </figure>
                                             </Link>
                                          </div>
                                          <div className="search-result__info pt3 pb4 ph0">
                                             <a className="search-result__result-link" href={campaign.receiver.profile_url} rel="noopener noreferrer" target="_blank">
                                                <h3 className="actor-name-with-distance search-result__title single-line-truncate">
                                                   <span className="name-and-icon">
                                                      <span className="name-and-distance">
                                                        <span className="name actor-name">{campaign.receiver.full_name}</span>
                                                      </span>
                                                   </span>
                                                </h3>
                                             </a>
                                             <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                                <span dir="ltr">{campaign.receiver.title}</span>
                                             </p>
                                             <p className="subline-level-2 t-12 t-black--light t-normal search-result__truncate">
                                                <span dir="ltr">{campaign.receiver.summary}</span>
                                             </p>
                                             <p className="subline-level-2 t-12 t-black--light t-normal search-result__truncate">
                                                <span dir="ltr">{campaign.receiver.location}</span>
                                             </p>
                                             
                                          </div>
                                          <div className="search-result__actions">
                                             <div id="">
                                                 <label>
                                                   {campaign.status}   
                                                 </label>
                                              </div>
                                          </div> 
                                       </div>

                                    </div>
                                  </li>
                                  )
                                  }) : (
                                    <li className="campaign-message">{connected.message}</li>
                                  )
                              }
                            </ul>

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
                                  disableInitialCallback={true}
                              />
                             </div> 
                            
                          }
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
    campaignPlay: state.connectALLSuccess,
    connected: state.connectedData,
    selectedCampaignPlay: state.selectedCampaignPlay,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getConnectALL: (data, url) => dispatch(getConnectALL(data, url)),
    getConnected: (url) => dispatch(getConnected(url)),
    selectCampaignPlay: (data) => dispatch(selectCampaignPlay(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);
