import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Link, Route, Router, browserHistory} from 'react-router';

//components import
import './index.css';
import Todos from './Todos';
import logo from './logo.svg';
import Projects from './Projects';
import ProjectDetails from './ProjectDetails';

const App = (props) => {
    const children = props.children;
    return (
        <div className="App-container">
            <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
                </header>
            </div>
            <div className="App-intro">
                { children }
            </div>
        </div>
    )
}

const Home = () => {
    return (
        <section>
            <h2>{'Welcome to Home!'}</h2>
            <Navigation />
        </section>
    );
};

const Navigation = () => {
    return (
        <div className="App-intro">
            <section>
                <ul className="App-aplications">
                    <li>
                        <Link to="/todos">
                            <p>{'Todos'}</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects">
                            <p>{'Projetos'}</p>
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
};

ReactDOM.render(
    <Router history={browserHistory}>
        <Route component={App} >
            <Route component={Home} path="/" />
            <Route component={Projects} path="projects" />
            <Route component={ProjectDetails} path="projects/:id" />
            <Route component={Todos} path="todos" />
        </Route>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
