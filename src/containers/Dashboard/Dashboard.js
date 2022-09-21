import React, { Component } from 'react';
import PlanLoader from '../../components/Loader/PlanLoader';
import { connect } from 'react-redux';
import { getDashboard } from '../../actions/dashboardActions';
import {REACT_API_URL} from '../../constants/env.js';
import { PieChart } from 'react-chartkick';
import 'chart.js';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

class Dashboard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    this.props.getDashboard(REACT_API_URL + `/campaign_members/total_visits_count`)
  }

  render() {
    // console.log(this.props.dashboardData)
    const { dashboardData, isLoading }  = this.props;
    return (
      <main>
          <section className="page-heading-breadcrumb-section">
              <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                          <li className="breadcrumb-item active"><Link to="#">Dashboard</Link></li>
                    </ol>
                </nav>
              </div>
          </section>

          {
            isLoading ? (
                <div className="text-center"><PlanLoader /></div>
              ) : (
                <div className="container">
                    <div className="user-statistics-dashboard">
                    {!isEmpty(dashboardData) &&

                      <div className="row">
                        <div className="col-md-4">
                            <div className="single-features features-1 wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.2s">
                                <span className="features-number">{dashboardData.today_visits_count}</span>
                                <div className="features-icon">
                                    <i className="flaticon-smartphone"></i>
                                </div>
                                <div className="features-content">
                                    {/* <h4 className="features-title">{dashboardData.today_visits_count}</h4> */}
                                    <h4 className="features-title">Today's Visit</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="single-features features-2 wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.8s">
                                <span className="features-number">{dashboardData.monthly_visits_count}</span>
                                <div className="features-icon">
                                    <i className="flaticon-smartphone"></i>
                                </div>
                                <div className="features-content">
                                    {/* <h4 className="features-title">{dashboardData.monthly_visits_count}</h4> */}
                                    <h4 className="features-title">Monthly Visit</h4>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="single-features features-3 wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.8s">
                                <span className="features-number">{dashboardData.total_visits_count}</span>
                                <div className="features-icon">
                                    <i className="flaticon-smartphone"></i>
                                </div>
                                <div className="features-content">
                                    {/* <h4 className="features-title">{dashboardData.total_visits_count}</h4> */}
                                    <h4 className="features-title">Total Visits</h4>
                                </div>
                            </div>
                        </div>    




                        { 
                          !isEmpty(dashboardData) ? (
                            <div className="col-md-12">
                              <div className="card mb-4">
                                <h5 className="card-header">Activity Graph</h5>
                                <div className="card-body">
                                  <div>
                                    <PieChart donut={true} data={[["Total Visits", dashboardData.total_visits_count], ["Today's Visit", dashboardData.today_visits_count]]} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            ) : null
                        }
                      </div>
                    }   
                    </div>
                </div>
              )
          }
      </main>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    dashboardData: state.dashboardData,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboard: (url) => dispatch(getDashboard(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
