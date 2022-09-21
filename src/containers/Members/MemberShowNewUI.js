/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import ReactPaginate from 'react-paginate';
import "react-pagination-library/build/css/index.css"; //for css
import Loader from '../../components/Loader/Loader';
import { capitalize, isEmpty } from 'lodash';
import { isValidHttpUrl } from '../../utils/featuredActions';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader'

const EmailFinderLoader = (props) => (
     <ContentLoader 
        speed={2}
        width={'100%'}
        height={100}
        title="Please wait, fetching emails."
        backgroundColor="#f3f3f3"
        foregroundColor="#C8BFBD"
        {...props}
      >
        <rect x="0" y="20" rx="2" ry="2" width="95%" height="10" /> 
        <rect x="0" y="40" rx="2" ry="2" width="95%" height="10" /> 
        <rect x="0" y="60" rx="2" ry="2" width="95%" height="10" /> 
      </ContentLoader>
)

const TableListingLoader = (props) => (
     <ContentLoader 
        speed={2}
        width={'100%'}
        height={100}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <circle cx="31" cy="45" r="30" /> 
        <rect x="90" y="20" rx="2" ry="2" width="95%" height="10" /> 
        <rect x="90" y="40" rx="2" ry="2" width="95%" height="10" /> 
        <rect x="90" y="60" rx="2" ry="2" width="95%" height="10" /> 
      </ContentLoader>
)


export const MemberShow = (props) => {
    return (
        <React.Fragment>
          <ul className="campaign-play">
         
            <React.Fragment>


              <li id="" className="card header-of-header">
                <div id="" className="">
                  <div className="row">
                    
                      <div className={props.membersData.length > 0 ? "col-md-8" : "col-md-10"}>
                        
                      </div>
                      <div className="col-md-2 get-email-button  text-center">
                        <button className="btn btn-dark" type="button" Name="add-new-champaign" onClick={props.importModalData}><i className="fa fa-address-book-o" aria-hidden="true"></i> Import</button>
                      </div>
                      {props.membersData.length > 0 && (<div className="col-md-2 get-email-button  text-center">
                        <button className="btn btn-custom-secondary" type="button" Name="add-new-champaign" onClick={props.handleExportShow}><i className="fa fa-address-book-o" aria-hidden="true"></i> Export</button>
                      </div>)}
                    
                  </div>
                </div>
              </li>


              {
              
                props.membersData.length > 0 && 
                  <li id="" className="card header-of-header">
                    <div id="" className="card">
                      <div className="row">
                        
                          <div className="col-md-9">
                            <div className="search-result__info pt3 pb4 ph0">
                              {props.from} - {props.to} of about {props.total_count} results. Display &nbsp;
                              <select  name="displayCount" value={props.displayCount}  onChange={props.onChange} className="custom-select results-per-page">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                              &nbsp; results per page.
                            </div>
                          </div>

                          <div className="col-md-2 get-email-button  text-center">
                            <button className="btn btn-dark" type="button" Name="add-new-champaign" onClick={() => props.selectIntergration('all')}><i class="fa fa-envelope" aria-hidden="true"></i> Get Emails</button>
                          </div>
                          <div className="col-md-1 get-email-button  text-center">
                            <button className="btn btn-default" type="button" Name="add-new-champaign" onClick={() => props.refetchMembers()}><i className="fa fa-refresh" aria-hidden="true"></i></button>
                          </div>
                        
                      </div>
                    </div>
                  </li>

              }

                <li id="" className="card header-of-header">

                  <div id="" className="">

                    <div className="col-md-12">
                      
                     <div className="search-result__wrapper">
                      
                      <div className="col-md-1">
                         <input
                            className="checkbox-add"
                            type="checkbox"
                            name="checkAll"
                            checked={props.allChecked}
                            onChange={props.handleChange}
                          />
                      </div>
                      <div className="col-md-1">
                      </div>
                      <div className="col-md-4">
                        <div className="search-result__info pt3 pb4 ph0">
                          {props.sort_name_in === 'asc' ?
                           <span className=" header-font" 
                             onClick={props.sortingName.bind(this,"full_name", 'asc')}>
                            <strong>Name &nbsp;</strong>
                            <i className="fa fa-sort-asc"></i>
                          </span>
                          :
                          <span className=" header-font" 
                             onClick={props.sortingName.bind(this,"full_name", 'desc')}>
                            <strong>Name &nbsp;</strong>
                            <i className="fa fa-sort-desc"></i>
                          </span>
                          }
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="search-result__info pt3 pb4 ph0">
                        {props.sort_email_in === 'asc' ?
                          <span className=" header-font" 
                            onClick={props.sortingEmail.bind(this,"email", 'asc')}>
                            <strong>Contact Info &nbsp;</strong>
                            <i className="fa fa-sort-asc"></i>
                          </span>
                          :
                          <span className=" header-font" 
                            onClick={props.sortingEmail.bind(this,"email", 'desc')}>
                            <strong>Contact Info &nbsp;</strong>
                            <i className="fa fa-sort-desc"></i>
                          </span>
                        }
                        </div>
                      </div>
                      
                      <div className="col-md-2">
                        <div className="search-result__info pt3 pb4 ph0">
                          <p className="">
                            
                          </p>
                        </div>
                       </div>
                     </div>
                    </div>
                  </div>
                </li>

                
                {
                  props.isLoading ? (
                    Array.from(Array(10), (e, i) => {
                      return (
                        <li id="people_list" className="search-result">
                          <div id="" className="">
                            <div className="col-md-12">
                              <div className="search-result__wrapper">
                                <div className="col-md-12">
                                  <TableListingLoader />
                                </div>  
                              </div>  
                            </div>  
                          </div> 
                        </li>
                        )
                    }) 
                  ) : 
                props.membersData.length > 0 ? props.membersData.map((campaign, index) => {    
                  let count = 0;      
                  let show = 0    
                  if(!isEmpty(campaign.email_finder_services)){
                    Object.keys(campaign.email_finder_services).map((key, index) => {
                      count = count + campaign.email_finder_services[key].length
                      show = show  + (campaign.email_finder_services[key].length > 0 && 1)
                    });
                  }  
                  let total = count - show
                    return(
                      <li id="" className="users-list-view" key={index}>
                          
                           
                            
                            {/* Start Column */}
                            
                              <div className="checkbox-container">
                                {
                                  campaign.is_email_finder_service_in_use ? null : (
                                    <input 
                                      type="checkbox" 
                                      name={campaign.uuid} 
                                      value={campaign.uuid} 
                                      checked={props.selectedIds.indexOf(campaign.uuid) > -1} 
                                      onClick={props.handleChange} 
                                      className="checkbox-add"
                                    />
                                  )
                                }
                              </div>
                              
                              <div className="profile-image-container">  
                                <a className="" href={campaign.profile_url.indexOf('http') > -1 ? campaign.profile_url : `https://${campaign.profile_url}`} rel="noopener noreferrer" target="_blank" >
                                   <img className="profile-image" title={campaign.full_name} src={isValidHttpUrl(campaign.image_url)} loading="lazy" alt={campaign.full_name}  />
                                </a>
                              </div>
                              
                            
                            {/* End Column */}
                            {/* Start Column */}
                            
                              <div className="username-profile-title-and-location-container">
                                  <h3 className="username">
                                      <a href={campaign.profile_url.indexOf('http') > -1 ? campaign.profile_url : `https://${campaign.profile_url}`} rel="noopener noreferrer" target="_blank" className="" >
                                        {campaign.full_name}
                                      </a> 
                                  </h3>
                                  <p className="user-title">
                                      {campaign.title}
                                  </p>
                                  <p className="social-profile-icon">
                                    <a rel="nofollow noreferrer" href={campaign.profile_url.indexOf('http') > -1 ? campaign.profile_url : `https://${campaign.profile_url}`} target="_blank" className="social-icon">
                                      <i class="fa fa-linkedin-square"></i>
                                    </a>
                                  </p>
                                 <p className="location">
                                    <span className=""><i class="fa fa-map-marker"></i>{" "+campaign.location}</span>
                                 </p>
                              </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="email-list-container">
                                  <p className="">
                                    {campaign.email &&
                                      (<span>
                                        <p>
                                          <a href={"mailto:"+campaign.email} className="social-icon"><i class="fa fa-linkedin-square"></i>{" "+campaign.email}</a>
                                        </p>
                                      </span>)
                                    }

                                    {campaign.is_email_finder_service_in_use ? <EmailFinderLoader /> : campaign.email_finder_services ?
                                        !isEmpty(campaign.email_finder_services) ? Object.keys(campaign.email_finder_services).map((key, index) => {
                                          return(
                                            <div class="form-check" key={index}>
                                            {campaign.email_finder_services[key].length > 0 &&  <strong>{capitalize(key.split('_').join(' '))}</strong>}
                                            {campaign.email_finder_services[key].length > 0 && campaign.email_finder_services[key].map((row,i) => {

                                              if(i < 1){
                                                if(typeof row === 'string'){
                                                  return(
                                                    <span>
                                                      <p>{row}</p>
                                                    </span> 
                                                  )
                                                }else{
                                                  return(
                                                    <span>
                                                      {row.status === "0" ? 
                                                        (<i class="fa fa-times" aria-hidden="true"></i>) 
                                                        : 
                                                        <i class="fa fa-check" aria-hidden="true"></i>
                                                      }
                                                      <p>{row.email}</p>
                                                    </span>
                                                  )  
                                                }
                                              }
                                              
                                            })}

                                            </div>
                                          )
                                        }) : <p></p>
                                        
                                      :
                                      ""
                                    }
                                    
                                    {total > 0 && <span onClick={() => props.emailPopup(campaign.email_finder_services)}>{"+ "+ total }</span>}
                                    
                                  </p>
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="get-email-container">
                              { 
                                campaign.is_email_finder_service_in_use ? null 
                                : 
                                  <button className="btn btn-dark" type="button" Name="add-new-champaign"  onClick={() => props.selectIntergration(campaign.uuid)}><i class="fa fa-envelope" aria-hidden="true"></i> Get Email</button>
                              }
                            </div>
                            {/* End Column */}


                           
                          
                        
                      </li>
                      )
                  })                
                :
                (<li className="campaign-message no-result-found">There is no member added yet.</li>)
              }

            </React.Fragment>
          </ul>
          <div className="mb-3"> 
           
            { props.totalPages > 1 &&
             <div className="pagination-content-bar">
              <ReactPaginate
                  previousLabel={"< Previous"}
                  nextLabel={"Next >"}
                  breakLabel={<span className="gap">...</span>}
                  marginPagesDisplayed={3}
                  pageRangeDisplayed={2}
                  pageCount={props.totalPages}
                  onPageChange={props.changeCurrentPage}
                  forcePage={props.activePage}
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
    );
};
