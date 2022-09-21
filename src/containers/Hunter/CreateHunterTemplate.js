import React,{Component} from 'react';
import  TemplateHunterForm from './TemplateHunterForm';

export default class Hunter extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
				<main>
					<div className="container">
						<TemplateHunterForm history={this.props.history} location={this.props.location}/>
			 		</div>
				</main>					 
		)
	}
} 