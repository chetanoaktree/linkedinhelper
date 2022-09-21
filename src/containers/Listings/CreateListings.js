import React,{Component} from 'react';
import  ListingsForm from './ListingsForm';

export default class CreateListings extends Component {
	render(){
		return(
				<main>
					<div className="container">
			    		<ListingsForm history={this.props.history} location={this.props.location}/>
			 		</div>
				</main>	 
		)
	}
} 