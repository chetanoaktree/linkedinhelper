import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScraping, selectCampaignPlay, applyAction } from '../../actions/campaignActions';
import ReactPaginate from 'react-paginate';
import "react-pagination-library/build/css/index.css"; //for css
import Loader from '../../components/Loader/Loader';
// import './_dashboard.css';
import {REACT_API_URL} from '../../constants/env.js'


class Scraping extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 1,
      totalPages: 1,
      searchVal: '',
      currentFilter: null,
      filterDates: [],
      dateValue: null,
      errors: {},
      perPage: 10,
      type: 'sent',
      all: true
    }
  }

  componentDidMount() {
    // console.log('${this.props.match.params.id}',this.props)
    this.props.selectCampaignPlay([])

    if(typeof this.props.location.data !== 'undefined'){
      var data = this.props.location.data
      console.log('data',data)
      this.setState({
        type: data
      })
      var url = REACT_API_URL + `/invitations/` + data
      this.props.getScraping(url);
      // .then((response) => {
      //   if(typeof response.data !== 'undefined'){
      //      this.setState({totalPages: parseInt(response.data.last_page_number)})  
      //   }
      //   // console.log(response.data.last_page_number,'did')
      // })
    }
  }


  searchChange = (e) => {
    this.setState({ searchVal: e.target.value })
  }

  changeCurrentPage = (data) => {//console.log('---->>>',data)
    var page = data.selected + 1
    this.setState({ activePage: page})
    this.props.getScraping(REACT_API_URL + `/campaigns/${this.props.match.params.id}/start.json?page_number=`+page);
  }


  render() {
    let { scraping, isLoading } = this.props;
    const { errors } = this.state;
    // console.log('selectedCampaignPlay',scraping)
    return (
      <main>
          <div className="container">
              <div className="row">
                <h1 className="temp-head"> Scrape {this.state.type} invitations</h1>
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
                            {/*<div className="mb-3"> 
                             <div className="get-email">
                                  <button className="btn btn-dark" type="button" style={{'margin-left': '20px'}} Name="add-new-champaign" onClick={this.SelectAll}>Select All</button>
                              </div>
                            </div>*/}
                            <ul className="campaign-play">
                            {
                              isLoading ? (
                                <li className="campaign-loader">
                                  <Loader loading={true} />
                                </li>  
                              ) : 
                            
                              (scraping.length > 0 || typeof scraping.profiles !== 'undefined') ? scraping.profiles.map((campaign, index) => {
                                
                                return(
                                  <li id="people_list" className="search-result card bg-light mb-3" key={index}>
                                    <div id="" className="">
                                       <div className="search-result__wrapper">
                                          <div className="search-result__image-wrapper">
                                             <a id="" className="search-result__result-link">
                                                <figure className="search-result__image">
                                                   <div id="" className="">
                                                      <div id="" className="display-flex">
                                                         <div id="" className="presence-entity presence-entity--size-4">
                                                            <img title={campaign.full_name} src={(campaign.profile_url === "NA") ? '../../default.jpg' : campaign.profile_url} loading="lazy" alt={campaign.full_name} className="ivm-view-attr__img--centered EntityPhoto-circle-4  presence-entity__image EntityPhoto-circle-4 lazy-image loaded" />
                                                         </div>
                                                      </div>
                                                   </div>
                                                </figure>
                                             </a>
                                          </div>
                                          <div className="search-result__info pt3 pb4 ph0">
                                             <a className="search-result__result-link">
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
                                             
                                          </div>
                                          {/*<div className="search-result__actions">
                                             <div id="">
                                                 <label>
                                                    <input type="checkbox" name={index} value={index} onClick={this.handleSelect} className="checkbox-add larger"/>
                                                 }
                                                 </label>
                                              </div>
                                          </div> */}
                                       </div>
                                    </div>
                                  </li>
                                  )
                                  }) : (
                                    <li className="campaign-message">{scraping.message}.</li>
                                  )
                              }
                            </ul>

                           
                            <div className="mb-3"> 
                             <div className="get-email">
                              { this.state.type === 'email' ?
                                (<button className="btn btn-dark" type="button" Name="add-new-champaign" onClick={this.findEmail}>Get Email</button>):
                                (<button className="btn btn-dark" type="button" style={{'margin-right': '10px'}} Name="add-new-champaign" onClick={this.ConnectAll}>Connect All</button>)    
                              }
                             </div> 
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
    scraping: state.scrapingData,
    selectedCampaignPlay: state.selectedCampaignPlay,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getScraping: (url) => dispatch(getScraping(url)),
    selectCampaignPlay: (data) => dispatch(selectCampaignPlay(data)),
    applyAction: (action, ids) => dispatch(applyAction(action, ids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scraping);
