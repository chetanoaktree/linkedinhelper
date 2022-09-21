import React,{Component} from 'react';
import  TemplateForm from './TemplateForm';

export default class CreateTemplate extends Component {

	render(){
		return(
				<main>
					<div className="container">
			    		<TemplateForm history={this.props.history} location={this.props.location}/>
			 		</div>
				</main>		 
		)
	}
} 