import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import UserService from './services/user-service';

import Header from './components/header/header';
import Home from './components/home/home';
import Register from './components/user/register/register';
import Login from './components/user/login/login';
import BookPaths from './components/book/book-paths';
import ListPaths from './components/list/list-paths';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            isAdmin: false
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    static userService = new UserService();

    registerUser(user) {
        App.userService.register(user)
            .then(data => {
                if (data.username) {
                    toast.success(data.message);
                    this.loginUser(user);
                } else {
                    if (data.errors) {
                        Object.values(data.errors).forEach(error => toast.error(error));
                    } else {
                        toast.error(data.message);
                    }
                }
            })
            .catch(err => toast.error(err));
    }

    loginUser(user) {
        App.userService.login(user)
            .then(data => {
                if (data.username) {
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("username", data.username);
                    sessionStorage.setItem("isAdmin", data.isAdmin);

                    toast.success(data.message);

                    this.setState({
                        username: data.username,
                        isAdmin: data.isAdmin
                    });
                } else {
                    toast.error(data.message);
                }
            })
            .catch(err => toast.error(err));
    }

    logoutUser() {
        sessionStorage.clear();

        toast.success(`Goodbye, ${this.state.username}!`);

        this.setState({
            username: null,
            isAdmin: false
        });
    }

    componentWillMount() {
        const token = sessionStorage.getItem("token");

        if (token) {
            this.setState({
                username: sessionStorage.getItem("username"),
                isAdmin: JSON.parse(sessionStorage.getItem("isAdmin"))
            });
        } else {
            this.setState({
                username: null,
                isAdmin: false
            });
        }
    }

    render() {
        return (
            <div className="App">
                <ToastContainer autoClose={2000} closeButton={false} closeOnClick={true} hideProgressBar={true} pauseOnHover={true} />
                <BrowserRouter>
                    <Fragment>
                        <Header username={this.state.username} isAdmin={this.state.isAdmin} logout={this.logoutUser}/>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/users/register" render={() => this.state.username
                                ? <Redirect to="/" />
                                : <Register registerUser={this.registerUser}/>
                            }/>
                            <Route path="/users/login" render={() => this.state.username
                                ? <Redirect to="/" />
                                : <Login loginUser={this.loginUser}/>
                            }/>
                            <Route path="/books" component={BookPaths} />
                            <Route path="/lists" component={ListPaths}/>
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;