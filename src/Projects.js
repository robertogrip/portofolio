import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import './Projects.css';

class Projects extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			'projects': props.location.state || []
		}

		this.apiUrl = 'http://5a85b652085fdd00127042c4.mockapi.io/v1/projects';
	}

	componentDidMount = () => {
        //get MockApi data
        if( this.state.projects.length <= 0 ) {
	        axios.get( this.apiUrl )
	        .then(( res ) => {
	            if( res && res.data ) {
	                this.setState({projects: res.data});
	            }
	        });
	    }
    }

    render() {
	    return (
	    	<div className="projects-container">
                <h2>Projetos</h2>
                <ul className="projects">
                	<ProjectsList projects={this.state.projects} />
                </ul>
                <Link to="/" className="link-to-home">{'Voltar'}</Link>
            </div>
	    )
	}
}

export default Projects;

const ProjectsList = (props) => (
		props.projects.map(project => {
				const params = {
					pathname: `projects/${project.id}`,
					state: props.projects
				};

				return (
					<li className="projects-list" key={project.id} data-id={project.id}>
						<Link to={params}>
							<div className="project-details">
								<div className="project-thumbnail">
									<img alt="" src={ project.imageUrl } />
								</div>
								<h3>{ project.name }</h3>
							</div>
						</Link>
					</li>
				)
			}
		)
)