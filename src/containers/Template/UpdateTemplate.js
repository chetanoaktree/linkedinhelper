import React,{Component} from 'react';
import  TemplateForm from './TemplateForm';

export default class  UpateTemplate extends Component {

	render(){
		return(
				<main>
					<div className="container">
			 			<TemplateForm history={this.props.history} location={this.props.match} fromUpdate={true}/>
			 		</div>
				</main>	 
		)
	}
} 