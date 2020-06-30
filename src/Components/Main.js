import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import WordsBoard from './WordsBoard';

import Cookies from 'universal-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';

const cookies = new Cookies();
cookies.set('token', 'hello');

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alleWorte: {
                der: [],
                das: [],
                die: []
            }
        }
        this.handleAddNewWord = this.handleAddNewWord.bind(this);
        this.renderHome = this.renderHome.bind(this);
    }

    componentDidMount() {
        console.log(reactLocalStorage.getObject('alleWorte'));
        if(Object.keys(reactLocalStorage.getObject('alleWorte')).length === 0 && reactLocalStorage.getObject('alleWorte').constructor === Object) return;
        this.setState({alleWorte: reactLocalStorage.getObject('alleWorte')});
    }

    handleAddNewWord(word, meaning, article) {
        this.setState({
            alleWorte: {
                der: (article === 'der') ? [...this.state.alleWorte.der, {id: ((this.state.alleWorte.der.length > 0) ? this.state.alleWorte.der[this.state.alleWorte.der.length-1].id+1 : 0), value: word, meaning: meaning, energy:0}] : this.state.alleWorte.der,
                das: (article === 'das') ? [...this.state.alleWorte.das, {id: ((this.state.alleWorte.das.length > 0) ? this.state.alleWorte.das[this.state.alleWorte.das.length-1].id+1 : 0), value: word, meaning: meaning, energy:0}] : this.state.alleWorte.das,
                die: (article === 'die') ? [...this.state.alleWorte.die, {id: ((this.state.alleWorte.die.length > 0) ? this.state.alleWorte.die[this.state.alleWorte.die.length-1].id+1 : 0), value: word, meaning: meaning, energy:0}] : this.state.alleWorte.die                
            }
        }, () => reactLocalStorage.setObject('alleWorte', this.state.alleWorte));
    }

    handleRemoveWord = (id, article) => {
        console.log(id + " " + article);
        this.setState({
            alleWorte: {
                der: (article === 'der') ? this.state.alleWorte.der.filter(word => word.id !== id) : this.state.alleWorte.der,
                das: (article === 'das') ? this.state.alleWorte.das.filter(word => word.id !== id) : this.state.alleWorte.das,
                die: (article === 'die') ? this.state.alleWorte.die.filter(word => word.id !== id) : this.state.alleWorte.die
            }
        }, () => reactLocalStorage.setObject('alleWorte', this.state.alleWorte));
    }
    
    renderHome() {
        //const token = cookies.get('token');
        //if(token !== undefined)
            return(
                <WordsBoard allWords={this.state.alleWorte} newWordHandler={this.handleAddNewWord} removeWordHandler={this.handleRemoveWord} />
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
