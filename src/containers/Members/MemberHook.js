import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isValidHttpUrl } from '../../utils/featuredActions';
import ContentLoader from 'react-content-loader';
import { capitalize, isEmpty } from 'lodash';

const responseDummy = [{
    "id": 1041,
    "full_name": "Darshan Sonje",
    "summary": "Current: Software QA Engineer at QualityKiosk Technologies Pvt. Ltd.",
    "profile_url": "https://www.linkedin.com/in/darshan-sonje-550174184/",
    "location": "Mumbai Area, India",
    "is_premium": false,
    "accepted_at": null,
    "uuid": "1b3994b8-0436-42e8-9199-73da5fedc52a",
    "created_at": "31 Aug 2020 07:43 PM",
    "updated_at": "31 Aug 2020 07:43 PM",
    "image_url": "https://media-exp1.licdn.com/dms/image/C5103AQFlsRk0pezX0A/profile-displayphoto-shrink_100_100/0?e=1604534400&v=beta&t=MNF4U-O7kPXpzhlP0eb29T4yC3tzUKkV190lqWdyuio",
    "title": "Software QA Engineer",
    "email": null,
    "phone": null,
    "address": null,
    "emails": "[{\"uuid\":\"9e24e1d8-324b-4c99-b14e-282501142923\",\"service\":\"hunter\",\"email\":\"dsonje@google.com\",\"email_verifications\":[{\"service\":null,\"status\":\"failed\"}]}]",
    "member_type": "connect",
    "is_email_finder_service_in_use": false,
    "email_finder_services": {
        "aerolead_service": [],
        "anymail_service": [],
        "hunter_service": [
            "dsonje@google.com"
        ]
    }
}];
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

function MemberHook(){
    const [data,setData] = useState([]);
    const [uuid,setUuid] = useState("");
    const [msg,setMsg] = useState("");
    const handleClick = (event) =>{
        console.log(event.target.value);
        setUuid(event.target.value);
    }
    const handleEmail = () =>{
        console.log(uuid)
       let neWemails = responseDummy.filter((obj)=>{
            if(obj.uuid == uuid){
                return obj;
            }
            
        });
        let newObj = JSON.parse(neWemails[0].emails)
        console.log(newObj);
        sendForVerification(newObj);
    }

    const sendForVerification =(obj)=>{
        console.log(obj)   
        let uuidsArray = [];
        uuidsArray.push(obj.uuid);
        let service = obj.service;
        console.log(service);
        setMsg("We are Verifying emails, We will update soon");

    }




    useEffect(()=>{
        // let emails = JSON.parse(responseDummy.emails);
        let responseDummy1 = [...responseDummy];
        // console.log(emails)
        setData(responseDummy1)
    
    },[responseDummy])

    return(
        <React.Fragment>
            {data.map((campaign, index)=>{
                 let count = 0;      
                 let show = 0    
                 if(!isEmpty(campaign.email_finder_services)){
                   Object.keys(campaign.email_finder_services).map((key, index) => {
                     count = count + campaign.email_finder_services[key].length
                     show = show  + (campaign.email_finder_services[key].length > 0 && 1)
                   });
                 }  
                 let total = count - show
                   return (
                   <li id="people_list" className="search-result card">
                           <div className ="col-md-12">
                               <div className="search-result__wrapper">

                               
                               <div className="col-md-2">
                               <div className="">
                                  {
                                    campaign.is_email_finder_service_in_use ? null : (
                                      <input 
                                        type="checkbox" 
                                        name={campaign.uuid} 
                                        value={campaign.uuid} 
                                        // checked={props.selectedIds.indexOf(campaign.uuid) > -1} 
                                        onClick={handleClick} 
                                        className="checkbox-add"
                                      />
                                    )
                                  }
                                </div>
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
                            <div className="col-md-4">
                              
                              <div className="search-result__info pt3 pb4 ph0">
                                <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                  {campaign.email &&
                                    (<span dir="ltr">
                                      <p>
                                        <a href={"mailto:"+campaign.email} className="social-icon"><i class="fa fa-linkedin-square"></i>{" "+campaign.email}</a>
                                      </p>
                                    </span>)
                                  }
                                  <div>
                                      <p>{msg}</p>
                                  </div>

                                  {campaign.is_email_finder_service_in_use ? <EmailFinderLoader /> : campaign.email_finder_services ?
                                      !isEmpty(campaign.email_finder_services) ? Object.keys(campaign.email_finder_services).map((key, index) => {
                                        return(
                                          <div class="form-check" key={index}>
                                          {campaign.email_finder_services[key].length > 0 &&  <strong>{capitalize(key.split('_').join(' '))}:</strong>}
                                          {campaign.email_finder_services[key].length > 0 && campaign.email_finder_services[key].map((row,i) => {

                                            if(i < 1){
                                              if(typeof row === 'string'){
                                                return(
                                                  <span dir="ltr">
                                                    <p>{row}</p>
                                                  </span> 
                                                )
                                              }else{
                                                return(
                                                  <span dir="ltr">
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
                                  
                                  {total > 0 && <span>{"+ "+ total }</span>}
                                  
                                </p>
                              </div>
                            </div>
                            <div className="col-md-2">
                              { campaign.is_email_finder_service_in_use ? null : <button className="btn btn-dark" type="button" Name="add-new-champaign"><i class="fa fa-envelope" aria-hidden="true"></i> Get Email</button>}
                              { campaign.is_email_finder_service_in_use ? null : <button className="btn btn-dark" type="button" Name="add-new-champaign" onClick={handleEmail}><i class="fa fa-envelope" aria-hidden="true" ></i> Verify Email</button>}
                            
                            </div>
                          </div>



                       </div>
                       
                   </li>
                   )
            })}
         
           
        </React.Fragment>
    )
}

export default MemberHook;