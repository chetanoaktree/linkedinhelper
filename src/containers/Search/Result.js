import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
// import { capitalize, isEmpty } from 'lodash';
import { memberSearch } from '../../actions/listingActions';
import {REACT_API_URL} from '../../constants/env.js'
import { isValidHttpUrl } from '../../utils/featuredActions';
import ContentLoader from 'react-content-loader'


const SearchResultListingLoading = () => (
  <ContentLoader 
    speed={2}
    height={132}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="45" cy="60" r="35" />
    <rect x="90" y="10" rx="3" ry="3" width="80%" height="15" /> 
    <rect x="90" y="30" rx="3" ry="3" width="70%" height="15" /> 
    <rect x="90" y="50" rx="3" ry="3" width="60%" height="15" /> 
    <circle cx="100" cy="80" r="10" />
    <circle cx="130" cy="80" r="10" />
    <circle cx="160" cy="80" r="10" />
    <circle cx="190" cy="80" r="10" />
    <rect x="90" y="100" rx="3" ry="3" width="30%" height="10" /> 
  </ContentLoader>
)


class Result extends Component {

  constructor(props){
    super(props)
    this.state = { 
      search: '',
      activePage: 0,
      totalPages: 1,
      perPage: 10,
      searchData: [],
      total_count: 0,
      displayCount: 10,
      from: 0,
      to: 0,
    }
  }


  componentDidMount(){
    if(this.props.location !== 'undefined') {
      let query = this.props.location.state ? this.props.location.state.search : '';
      this.setState({search : query})

      let url = REACT_API_URL + `/addon_campaign_members?page_number=1&per_page=${this.state.displayCount}&search_by=${(query) ? query : ''}`
      this.props.memberSearch(url)
    }
  }

  searchMembers = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  handleSubmit = (e) => {
      e.preventDefault();
      let url = REACT_API_URL + `/addon_campaign_members?page_number=1&per_page=${this.state.displayCount}&search_by=${this.state.search}`
      this.props.memberSearch(url)
  }
  
  onChange = (e) => {
      this.setState({displayCount : e.target.value, activePage: 0})
      let url = REACT_API_URL + `/addon_campaign_members?page_number=1&per_page=${e.target.value}&search_by=${this.state.search}`
      this.props.memberSearch(url)
      // .then((response) => {
      //     // console.log('response',response.data.data)
      //     if(response.data.status !== 404){
      //       if(typeof response.data !== 'undefined'){
      //           this.setState({totalPages: response.data.total_pages, total_count: response.data.total_count})
      //       }
      //     }else{
      //       NotificationManager.error(response.data.message, 'Error');
            
      //     }
      //   })
  }

  changeCurrentPage = (data) => {//console.log('---->>>',data)
    var page = data.selected + 1
    this.setState({ activePage: page.selected})
    let url = REACT_API_URL + `/addon_campaign_members?page_number=${page}&per_page=${this.state.displayCount}&search_by=${this.state.search}`
    this.props.memberSearch(url);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.members !== prevState.members) {

      if(nextProps.members.total_pages > 0){
        // console.log('----',nextProps.members.members)
        return ({searchData : nextProps.members.members, from: nextProps.members.from_data, to:  nextProps.members.to_data, total_count: nextProps.members.total_count , totalPages: nextProps.members.total_pages})         
      }else{
        return ({from: 0, to:  0, total_count: 0})       
      }
      
    }
    return null
  }

  render() {
    let { isLoading } = this.props;
    const { from, to, total_count, displayCount, searchData } = this.state;
    // console.log('===',searchData)
    return (
      <main id="global-search-page">
        <section className="page-heading-breadcrumb-section">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active"><Link to="#">Search Member</Link></li>
              </ol>
            </nav>
          </div>
        </section>

        <div className="container">
          <form className="form-inline mb-2 pt-3" onSubmit={this.handleSubmit}>
            <div className="input-group" id="global-search-box-input-group">
              <div className="input-group-btn" id="global-search-input-box-search-icon-container">
                  <i className="fa fa-search" aria-hidden="true" id="global-search-input-box-search-icon"></i>
              </div>
                  <input className="form-control"
                          type="text" placeholder="Search" 
                          name="search"
                          value={this.state.search}  
                          onChange={this.searchMembers}
                          onBlur={this.handleSubmit}
                          aria-label="Search"
                          id="global-search-input-box"
                          />

                  {/* <button className="btn btn-outline-success my-2 ml-sm-1" type="submit">Search</button> */}
            </div>

          </form>
          <React.Fragment>
           <ul className="campaign-play">
            <li id="people_list" className="search-result card header-of-header">
              <div id="" className="">
                <div className="col-md-12">
                  <div className="search-result__wrapper">
                    <div className="col-md-10">
                      <div className="search-result__info pt3 pb4 ph0">
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
                    <div className="col-md-2 get-email-button  text-center">
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li id="people_list" className="search-result card">
              <div id="" className="">
                <div className="col-md-12">
                 <div className="search-result__wrapper">
                  
                  <div className="col-md-2 mt-3">
                     
                    
                  </div>
                  <div className="col-md-4">
                    <div className="search-result__info pt3 pb4 ph0">
                      <span className="subline-level-1 t-14 t-black t-normal search-result__truncate header-font">
                        <strong>Name&nbsp;</strong>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="search-result__info pt3 pb4 ph0">
                      <span className="subline-level-1 t-14 t-black t-normal search-result__truncate header-font">
                        <strong>Campaign &nbsp;</strong>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="search-result__info pt3 pb4 ph0">
                      <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                        <strong>List &nbsp;</strong>
                      </p>
                    </div>
                   </div>
                 </div>
                </div>
              </div>
            </li> 
              {isLoading &&
                <React.Fragment>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                  <li id="people_list" className="search-result card">
                    <SearchResultListingLoading />
                  </li>
                </React.Fragment>
              }
              {searchData.length > 0 ? searchData.map((campaign, index) => {              
                return(
                  <li id="people_list" className="search-result card" key={index}>
                    <div id="" className="">
                      <div className="col-md-12">
                       <div className="search-result__wrapper">
                        <div className="col-md-2">
                          <div className="search-result__image-wrapper">
                            <div className="">
                              
                            </div>
                            <div className="">  
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
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="search-result__info pt3 pb4 ph0">
                              <a href={campaign.profile_url.indexOf('http') > -1 ? campaign.profile_url : `https://${campaign.profile_url}`} rel="noopener noreferrer" target="_blank" className="search-result__result-link" >
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
                             <a rel="noopener noreferrer" href={campaign.profile_url.indexOf('http') > -1 ? campaign.profile_url : `https://${campaign.profile_url}`} target="_blank" className="social-icon">
                                <i class="fa fa-linkedin-square"></i>
                             </a>
                             <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                <span dir="ltr" className="location-color"><i class="fa fa-map-marker"></i>{" "+campaign.location}</span>
                             </p>
                             <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                               <span dir="ltr">{campaign.member_type}</span>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          {campaign.member_for &&
                          
                            <div className="search-result__info pt3 pb4 ph0">
                              <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                <span dir="ltr">{campaign.member_for.campaign_data.length > 0 ? campaign.member_for.campaign_data.map(row=>{
                                      return (
                                      <Link to={`/campaigns/${row.uuid}/members`} className="number-of-members-in-campaign">{row.title}</Link>
                                      )
                                    }): "NA"}
                                </span>
                              </p>
                            </div>
                          
                          }
                           
                        </div>
                        <div className="col-md-3">
                          {campaign.member_for &&
                          
                            <div className="search-result__info pt3 pb4 ph0">
                              <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                <span dir="ltr">{campaign.member_for.listing_data.length > 0 ? campaign.member_for.listing_data.map(row=>{
                                      return (
                                      <Link to={`/listing/${row.uuid}/members`} className="number-of-members-in-campaign">{row.title}</Link>
                                      )
                                    }): "NA"}
                                </span>
                              </p>
                            </div>
                          
                          }
                        </div>
                       </div>
                      </div>
                    </div>
                  </li>
                  )
                }) :
                (<li className="campaign-message no-result-found">No search result found.</li>)
              }
           </ul>        
          </React.Fragment>
          <div className="mb-3"> 
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
                    containerClassName={"pagination"}
                    previousLinkClassName={"previous_page"}
                    nextLinkClassName={"next_page"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                />
               </div> 
             }
          </div>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return{
    isLoading: state.applicationIsLoading,
    members: state.searchMemberData
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    memberSearch: (keyword) => dispatch(memberSearch(keyword))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Result);