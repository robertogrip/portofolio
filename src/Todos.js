import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import './index.css';

class Todos extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            term: '',
            items: []
        };

        this.apiUrl = 'http://5a85b652085fdd00127042c4.mockapi.io/v1/todos';
    }

    componentDidMount = () => {
        //get MockApi data
        axios.get( this.apiUrl )
        .then(( res ) => {
            if( res && res.data ) {
                this.setState({term: '', items: res.data});
            }
        });
    }

    onChange = ( event ) => {
        this.setState({ term: event.target.value });
    }

    addTodo = ( event ) => {
        event.preventDefault();
        const todo = {term: this.state.term};
        
        if( !todo.term.trim() ){
            return;
        }

        //Post data to MockApi
        axios.post( this.apiUrl, todo )
        .then(( res ) => {
            if( res && res.data ) {
                this.state.items.push(res.data);
                this.setState({term: '', items:this.state.items});
            }
        });
    }

    removeTodo = ( event ) => {
        event.preventDefault();
        const todo = {
            id: event.target.getAttribute( 'data-id' ),
            target: [...event.target.parentElement.children].indexOf( event.target ) + 1
        }

        const remainder = this.state.items.filter(( todos ) => {
            if( todos.id !== todo.id ) {
                return todo;
            }
        });

        if( todo ){
            //Delete data with id
            axios.delete( this.apiUrl + '/' + todo.id )
            .then(( res ) => {
                if( res && res.data ) {
                    this.setState({term: '', items:remainder});
                }
            });
        }
    }

    render() {
        return (
            <div className="todo-container">
                <form onSubmit={this.addTodo}>
                    <input value={this.state.term} onChange={this.onChange} />
                    <button type="submit">Submit</button>
                </form>
                <TodoList items={this.state.items} click={this.removeTodo} />
                <Link to="/" className="link-to-home">{'Voltar para home'}</Link>
            </div>
        );
    }
}

const TodoList = (props) => (

    <ul className="App-todo">

        {
            props.items.map((item) => <li className="App-todo-list" key={item.id} data-id={item.id} onClick={props.click}>{item.term}</li>)
        }
    </ul>
)

export default Todos;