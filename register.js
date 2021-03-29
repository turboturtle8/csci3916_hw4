import React, {Component}from 'react';                  //npm install react; https://www.npmjs.com/package/react
                                                        //npm install react-dom; renderer for react components - front end
                                                        //npm install react-native
                                                        //React sandbox: https://codesandbox.io/s/new?file=/src/App.js
import {submitRegister} from '../actions/authActions';
import {connect} from 'react-redux';                    //npm install react-redux; https://redux.js.org/introduction/installation
import {Form, Button} from 'react-bootstrap';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";           //npm install react-bootstrap
class Register extends Component{
    constructor(props) {
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            details: {
                name: '',
                username: '',
                password: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = object.assign({},this.state.details);

        updateDetails[event.target.id] = event.tartet.value;
        this.setState({
            details: updateDetails
        });
    }

    register(){
        const {dispatch} = this.props;
        dispatch(submitRegister(this.state.details));
    }

    render(){
        return(
            <form className = 'form-horizontal'>
                <Form.Group controlId="name">
                    <form.Label>Name</form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.username} type="text" placeholder="Name"/>
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.password} type="password" placeholder="Password"/>
                </Form.Group>
            </form>
        )
    }
}

export default connect(mapStateToProps)(Register);