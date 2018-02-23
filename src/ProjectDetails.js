import React, { Component } from 'react';
import { Link } from 'react-router';

class ProjectDetails extends Component {
	constructor( props ) {
		super( props );
		const project = props.location.state.filter(project => {
			if( project.id === props.params.id ) {
				return project;
			}
		});

    	this.state = {
    		'id': props.params.id,
    		'project': project[0],
    		'projects' : props.location.state
    	};
    }

    render() {
    	const params = {
    		pathname: '/projects',
    		state: this.state.projects
    	};

	    return (
	        <section className="project-details">
	            <h1>{ this.state.project.name }</h1>
	            <div className="project-thumbnail">
	            	<img alt="" src={ this.state.project.imageUrl } />
	            </div>
	            <div className="project-description">
	            	<p>{ this.state.project.description }</p>
	            </div>
	            <div className="project-author">
	            	<h3>{ this.state.project.author	 }</h3>
	            </div>
	            <Link to={params} className="link-to-home">{'Voltar para projetos'}</Link>
	        </section>
	    );
	}
};

export default ProjectDetails;