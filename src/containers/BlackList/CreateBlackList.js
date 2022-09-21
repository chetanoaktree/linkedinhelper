import React,{Component} from 'react';
import  BlackListForm from './BlackListForm';

export default class CreateBlackList extends Component {
	render(){
		return(
			<main>
				<div className="container">
			    	<BlackListForm history={this.props.history} location={this.props.location}/>
			 	</div>
			</main>
		)
	}
} 