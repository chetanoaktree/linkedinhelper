/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React,{useState,useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import "react-pagination-library/build/css/index.css"; //for css
import Loader from '../../components/Loader/Loader';
import { capitalize, isEmpty } from 'lodash';
import { isValidHttpUrl } from '../../utils/featuredActions';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import MemberHook from './MemberHook';
import { ProgressBar } from 'react-bootstrap';

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

              <li id="" className="search-result header-of-header mt-4 mb-4">
                
                  
                    <div className="search-result__wrapper every-page-top-right-button-container">
                      
                      <div className={props.membersData.length > 0 ? "" : ""}>
                      

                        <button className="btn btn-dark mr-2" type="button" Name="add-new-champaign" onClick={props.importModalData}><i className="fa fa-address-book-o" aria-hidden="true"></i> Import</button>
                      
                        {
                            props.membersData.length > 0 && (
                            <button className="btn btn-custom-secondary" type="button" Name="add-new-champaign" onClick={props.handleExportShow}><i className="fa fa-address-book-o" aria-hidden="true"></i> Export</button>
                           
                          )
                        }
                      </div>
                    </div>
                  
                
              </li>
              {props.membersData.length > 0 && 
                <li id="people_list" className="search-result card header-of-header">
                  <div id="" className="">
                    <div className="col-md-12">
                      <div className="search-result__wrapper">

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

                        <div className="col-md-1 get-email-button text-center">
                         
                        </div>

                        <div className="col-md-2 get-email-button">
                          <button className="btn btn-custom-secondary" type="button" Name="add-new-champaign" onClick={() => props.refetchMembers()}><i className="fa fa-refresh" aria-hidden="true"></i> Refresh</button>
                        </div>

                      </div>
                    </div>
                  </div>
                </li>
              }
                <li id="people_list" className="search-result card">
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
                      <div className="col-md-3">
                        <div className="search-result__info pt3 pb4 ph0">
                           <span className="subline-level-1 t-14 t-black t-normal search-result__truncate header-font" onClick={props.sortingName.bind(this,"full_name", props.sort_name_in)}>
                            <strong>Name &nbsp; <i className={"fa fa-sort-"+ props.sort_name_in} ></i></strong>
                          </span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="search-result__info pt3 pb4 ph0">
                          <span className="subline-level-1 t-14 t-black t-normal search-result__truncate header-font" onClick={props.sortingEmail.bind(this,"email", props.sort_email_in)}>
                            <strong>Contact Info &nbsp; <i className={"fa fa-sort-"+ props.sort_email_in} ></i></strong>
                          </span>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="search-result__info pt3 pb4 ph0">
                          <button className="btn btn-dark" type="button" Name="add-new-champaign" onClick={() => props.findEmailAddresses('all')}><i class="fa fa-envelope" aria-hidden="true"></i> Find Emails</button>
                        </div>
                       </div>                      
                      <div className="col-md-2">
                        <div className="search-result__info pt3 pb4 ph0">
                          <button className="btn btn-dark" type="button" Name="add-new-champaign" onClick={() => props.selectIntergration('all')}><i class="fa fa-envelope" aria-hidden="true"></i> Get Emails</button>
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
                        <li id="people_list" className="search-result card">
                          <div id="" className="">
                            <div className="col-md-12">
                              <div className="search-result__wrapper">
                                <div className="col-md-12">
                                  <TableListingLoader />
                                </div>  
                              </div>  
                            </div>  
                          </div> 
                        </li>)
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
                      <li id="people_list" className="search-result card" key={index}>
                        <div id="" className="">
                          <div className="col-md-12">
                           <div className="search-result__wrapper">
                            <div className="col-md-2">
                              <div className="search-result__image-wrapper">
                                <div className="">
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
                                <div className="">  
                                  <Link id="" className="search-result__result-link">
                                    <figure className="search-result__image">
                                       <div id="" className="">
                                          <div id="" className="display-flex">
                                             <div id="" className="presence-entity presence-entity--size-4">
                                                <img title={campaign.full_name} src={isValidHttpUrl(campaign.image_url)} loading="lazy" alt={campaign.full_name} className="" />
                                             </div>
                                          </div>
                                       </div>
                                    </figure>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
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
                                 <a rel="nofollow noreferrer" href={campaign.profile_url.indexOf('http') > -1 ? campaign.profile_url : `https://${campaign.profile_url}`} target="_blank" className="social-icon">
                                    <i class="fa fa-linkedin-square"></i>
                                 </a>
                                 <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                    <span dir="ltr" className="location-color"><i class="fa fa-map-marker"></i>{" "+campaign.location}</span>
                                 </p>
                                 {/*<p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                       <span dir="ltr">{campaign.summary}</span>
                                    </p>*/}
                              </div>
                            </div>
                            <div className="col-md-5">
                              
                                <div className="search-result__info pt3 pb4 ph0">
                                  <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                    {campaign.email &&
                                      (<span dir="ltr">
                                        <p>
                                          <a href={"mailto:"+campaign.email} className="social-icon"><i class="fa fa-linkedin-square"></i>{" "+campaign.email}</a>
                                        </p>
                                      </span>)
                                    }

                                    {campaign.is_email_finder_service_in_use ? <EmailFinderLoader /> : campaign.email_finder_services ?
                                        !isEmpty(campaign.emails) ? JSON.parse(campaign.emails).map((detail, index) => {
                                          return(<div>
                                          
                                            <div class="form-check" key={index}>
                                            
                                              {detail.email_verifications.length>0 ?
                                              <div>
                                            
                                              {detail.email_verifications[0].status == "success" ? <ProgressBar animated now={100} label="success" />: detail.email_verifications[0].status == "inprogres" ? <ProgressBar animated label="inprogress" now={70} />: detail.email_verifications[0].status == "failure" ? <ProgressBar variant="danger" label="failure" animated now={100} />:null }
                                                {/* <p>{detail.email_verifications[0].status} </p> */}
                                                </div>
                                                 :null}
                                              <strong>{detail.service}</strong> :
                                              <span>{detail.email}</span>  
                                            </div>
                                            </div>)
                                          // return(
                                          //   <div class="form-check" key={index}>
                                          //   {campaign.email_finder_services[key].length > 0 &&  <strong>{capitalize(key.split('_').join(' '))}</strong>}
                                          //   {campaign.email_finder_services[key].length > 0 && campaign.email_finder_services[key].map((row,i) => {

                                          //     if(i < 1){
                                          //       if(typeof row === 'string'){
                                          //         return(
                                          //           <span dir="ltr">
                                          //             <p>{row}</p>
                                          //           </span> 
                                          //         )
                                          //       }else{
                                          //         return(
                                          //           <span dir="ltr">
                                          //             {row.status === "0" ? 
                                          //               (<i class="fa fa-times" aria-hidden="true"></i>) 
                                          //               : 
                                          //               <i class="fa fa-check" aria-hidden="true"></i>
                                          //             }
                                          //             <p>{row.email}</p>
                                          //           </span>
                                          //         )  
                                          //       }
                                          //     }
                                              
                                          //   })}

                                          //   </div>
                                          // )
                                        }) : <p></p>
                                        
                                      :
                                      ""
                                    }
                                    
                                    {total > 0 && <span onClick={() => props.emailPopup(campaign.email_finder_services)}>{"+ "+ total }</span>}
                                    
                                  </p>
                                </div>
                                
                            </div>

                            <div className="col-md-2">
                              { campaign.is_email_finder_service_in_use ? null : <button className="btn btn-dark" type="button" Name="add-new-champaign"  onClick={() => props.selectIntergration(campaign.uuid)}><i class="fa fa-envelope" aria-hidden="true"></i> Get Email</button>}
                            </div>
                           </div>
                          </div>
                        </div>
                      </li>
                      
                      )
                      
                      
                      
                      
                  })                
                
                                      :
                (<li className="campaign-message no-result-found">There is no member added yet.</li>)
              }
               {/* <MemberHook></MemberHook> */}


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
