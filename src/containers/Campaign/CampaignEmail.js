import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCampaignPlayEmail, selectCampaignPlay } from '../../actions/campaignActions';
import Loader from '../../components/Loader/Loader';
// import './_dashboard.css';
import {REACT_API_URL} from '../../constants/env.js'

import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class CampaignEmail extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 1,
      totalPages: '',
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
      this.props.getCampaignPlayEmail(data)
    }
  }

  changeCurrentPage = (page, e) => {
    this.setState({ activePage: page})
    this.props.getCampaignPlay(REACT_API_URL + `/campaigns/${this.props.match.params.id}/start.json?page_number=`+page);
  }

  
  render() {
    let { campaignPlay, isLoading } = this.props;
    const { errors } = this.state;
    // console.log('selected',campaignPlay)

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
                           <ul>
                            {
                              isLoading ? (
                                <li className="campaign-loader">
                                  <Loader loading={true} />
                                </li>  
                              ) : 
                            
                              (campaignPlay.length > 0 || typeof campaignPlay.data !== 'undefined') ? campaignPlay.data.profiles.map((campaign, index) => {
                                return(
                                  <li id="people_list" className="search-result" key={index}>
                                    <div id="" className="">
                                       <div className="search-result__wrapper">
                                          <div className="search-result__image-wrapper">
                                             <a id="" className="search-result__result-link">
                                                <figure className="search-result__image">
                                                   <div id="" className="">
                                                      <div id="" className="">
                                                         <div id="" className="presence-entity presence-entity--size-4">
                                                            <img title={campaign.full_name} src={(campaign.image_url === "NA") ? '../../default.jpg' : campaign.image_url} loading="lazy" alt={campaign.full_name} id="ember1778" className="profile-image" />
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
                                             <p className="subline-level-1 t-14 t-black t-normal search-result__truncate">
                                                {campaign.emails}
                                                {
                                                  /*
                                                  (campaign.emails !== "null"  || campaign.emails.length > 0)  && campaign.emails.map((row, index) => {
                                                    return <span dir="ltr">{row.email !== null && row.email + "(" + row.score + ")" } </span>
                                                  }) */
                                                }
                                             </p>
                                             <p className="subline-level-2 t-12 t-black--light t-normal search-result__truncate">
                                                <span dir="ltr">{campaign.summary}</span>
                                             </p>
                                             <p className="subline-level-2 t-12 t-black--light t-normal search-result__truncate">
                                                <span dir="ltr">{campaign.location}</span>
                                             </p>
                                             
                                          </div>
                                       </div>
                                    </div>
                                  </li>
                                  )
                                  }) : (
                                    <li className="campaign-message">
                                      {campaignPlay.message}.
                                    </li>
                                  )
                              }
                            </ul>
                            <div className="get-email">
                              {(campaignPlay.length > 0 || typeof campaignPlay.data !== 'undefined') &&
                                <ExcelFile element={<button className="btn btn-dark">Download</button>}>
                                    <ExcelSheet data={campaignPlay.data.profiles} name="Users">
                                        <ExcelColumn label="Name" value="full_name"/>
                                        {/*<ExcelColumn label="Emails"
                                                                                             value={(col) => col.emails.length > 0 ? col.emails.map((row, index) => 
                                                                                              row.email !== null && row.email + "(" + row.score + ")"  
                                                                                             ) : ""}/>*/}
                                        <ExcelColumn label="Emails" value=""/>                                                      
                                        <ExcelColumn label="Title" value="title"/>
                                        <ExcelColumn label="Summary" value="summary"/>
                                        <ExcelColumn label="Location" value="location"/>
                                    </ExcelSheet>
                                </ExcelFile>
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
  console.log("-------state.selectedCampaignPlayEmail--------")
  console.log(state.selectedCampaignPlayEmail);
  return {
    campaignPlay: state.selectedCampaignPlayEmail,
    selectedCampaignPlay: state.selectedCampaignPlay,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaignPlayEmail: (data) => dispatch(getCampaignPlayEmail(data)),
    selectCampaignPlay: (data) => dispatch(selectCampaignPlay(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignEmail);
