import React,{Component} from 'react';
import { connect } from 'react-redux';
import {REACT_API_URL} from '../../constants/env.js'
import { getPlans, paymentSent } from '../../actions/authActions';
import PlanLoader from '../../components/Loader/PlanLoader';
import {NotificationManager} from 'react-notifications';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { Link } from 'react-router-dom';


const planClasses = ['flaticon-send', 'flaticon-shuttle', 'flaticon-plane'];
class Plans extends Component {
	constructor(props){
		super(props)
		this.state = { 
			plan: ''	
		}
	}

	componentDidMount() {

		this.props.getPlans(REACT_API_URL + `/get_plans`);
	}

	onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        // console.log("planList",this.state.plan)
		console.log("The payment was succeeded!--->>", payment);
		// return false
		var data = {
					plan_id: this.state.plan,
					paid: payment.paid,
					payerID: payment.payerID,
					paymentID: payment.paymentID,
					paymentToken: payment.paymentToken
				}
		this.props.paymentSent(data).then(
		(res) => {
			// console.log("res",res)
			if(res.data.status === 404){
				NotificationManager.error(res.data.message, 'Error');	
			}else{
				NotificationManager.success(res.data.message, 'Pay');	
				this.props.history.push('/plan')
				// this.props.history.push('/campaign')
			}
		})
    }

    onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }
    activeTab(id, e){
    	e.preventDefault();
    	this.setState({plan: id})
    }

    changePage = (e) => {
    	e.preventDefault();
    	this.props.history.push('/signup')
    }
	render(){
		const { plans,isLoading } = this.props;

 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox:    'AVZKYj49_GeRu0WtPGMyyhlC3psAjlmGIrJTEgAFCd7uWYNhpfHmVozsHaaRYqO-4q7sF93_9_ylgc8a',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        const Styles = {
        	size: 'responsive',
        	color: 'silver',
		    shape: 'rect',
		    label: 'pay'
		  }
		// console.log("planList",this.state.plan)

		var auth = (localStorage.accessToken) ? true : false  

		return(
		<main>
			<section className="page-heading-breadcrumb-section">
				<div className="container">
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
							<li className="breadcrumb-item active"><Link to="#">Upgrade Plan</Link></li>
					</ol>
				</nav>
				</div>
			</section> 				
		   <div className="container">
			<div>
			    {isLoading ? 
			  	   <PlanLoader loading={true} />
			       :
			        <div className="section-pricing-table">

		                <div className="card-deck text-center">

		                { (plans.length > 0 || typeof plans.plans !== 'undefined' ) ?  plans.plans.map((plan, index) => {
                          return(
                                <div class="col-lg-4">
                                    <div class={`single-pricing pricing-${index + 1} text-center wow fadeInUpBig`} data-wow-duration="1s" data-wow-delay="0.4s">
                                        <div class="pricing-icon">
                                            <i className={planClasses[index]}></i>
                                        </div>
                                        <div class="pricing-price">
                                            <h5 class="sub-title">{plan.name}</h5>
                                            <span class="price">${plan.price}/Mon</span>
                                        </div>
                                        <div class="pricing-body">
                                            <ul class="pricing-list">
                                                <li><i class="fas fa-check"></i> {plan.profiles_visit_per_day_limit} Profile Visit Per day limit</li>
                                                <li><i class="fas fa-check"></i> {plan.invitations_per_day_limit} Invitations Per day limit</li>
                                                <li><i class="fas fa-check"></i> {plan.follow_up_messages_per_day_limit} Messages Per day limit to your 1st connection</li>
                                            </ul>
						                    {(index === 0) ?
						                      	(auth ? null : <a href="#" onClick={this.changePage} class="main-btn main-btn-2">Sign up for free</a>)
						                      	:
						                      	(  
						                      	  <React.Fragment>
						                      		{this.state.plan === plan.id ? 
							                      		<PaypalExpressBtn 
								                      		env={env} 
								                      		client={client} 
								                      		currency={currency} 
								                      		total={plan.price} 
								                      		onError={this.onError} 
								                      		onSuccess={this.onSuccess} 
								                      		onCancel={this.onCancel} 
								                      		style={Styles}
							                      		/>
							                      		:
							                      		(<a href="#" disabled onClick={this.activeTab.bind(this,plan.id)} class={(index + 1) === 2 ? "main-btn main-btn-2 disabled" : "main-btn disabled"}>Ready To Pay</a>)
							                      	}
							                      </React.Fragment>
						                      	)
						                    }
                                        </div>
                                    </div>
                                </div>
		                  	)
                      	   }) : (
                          <div>No Plans found.</div>
                        )
                      }
		                </div>
		            </div>
                }
			</div>
		   </div>	
		</main>   
		)
	}
} 


const mapStateToProps = (state) => {
  return {
    plans: state.planList,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlans: (url) => dispatch(getPlans(url)),
    paymentSent: (data) => dispatch(paymentSent(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
