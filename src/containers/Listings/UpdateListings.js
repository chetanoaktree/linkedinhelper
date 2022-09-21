import React,{Component} from 'react';
import  ListingsForm from './ListingsForm';

export default class  UpdateListings extends Component {

	render(){
		return(
				<main>
					<div className="container">
						<ListingsForm history={this.props.history} location={this.props.match} fromUpdate={true}/>
					</div>
				</main>
		)
	}
} 