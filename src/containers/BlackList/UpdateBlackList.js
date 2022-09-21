import React,{Component} from 'react';
import  BlackListForm from './BlackListForm';

export default class  UpdateBlackList extends Component {
	render(){
		return(
				<main>
					<div className="container">
			 			<BlackListForm history={this.props.history} location={this.props.location} fromUpdate={true}/>
			 		</div>
				</main>
		)
	}
} 