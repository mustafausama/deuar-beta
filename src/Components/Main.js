import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import WordsBoard from './WordsBoard';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
cookies.set('token', 'hello');

class Main extends Component {

    constructor(props) {
        super(props);
        this.renderHome = this.renderHome.bind(this);
    }

    renderHome() {
        //const token = cookies.get('token');
        //if(token !== undefined)
            return(
                <WordsBoard />
            )
    }

    render() {
        return (
            <>
            <Header />
                <Switch>
                    <Route path="/" component={this.renderHome}></Route>
					<Redirect to="/" />
                </Switch>
            </>
        )
    }
}

export default Main;
