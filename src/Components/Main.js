import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import WordsList from './WordsList';

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

    handleAddNewWord(word, article) {
        this.setState({
            alleWorte: {
                der: (article === 'der') ? [...this.state.alleWorte.der, {id: ((this.state.alleWorte.der.length > 0) ? this.state.alleWorte.der[this.state.alleWorte.der.length-1].id+1 : 0), value: word, energy:0}] : this.state.alleWorte.der,
                das: (article === 'das') ? [...this.state.alleWorte.das, {id: ((this.state.alleWorte.das.length > 0) ? this.state.alleWorte.das[this.state.alleWorte.das.length-1].id+1 : 0), value: word, energy:0}] : this.state.alleWorte.das,
                die: (article === 'die') ? [...this.state.alleWorte.die, {id: ((this.state.alleWorte.die.length > 0) ? this.state.alleWorte.die[this.state.alleWorte.die.length-1].id+1 : 0), value: word, energy:0}] : this.state.alleWorte.die                
            }
        }, () => reactLocalStorage.setObject('alleWorte', this.state.alleWorte));
    }

    removeWord = (id, article) => {
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mt-3">
                            <WordsList words={this.state.alleWorte.der} article="der" newWordHandler={this.handleAddNewWord} removeWordHandler={this.removeWord} bgColor="#8254ff" txColor="#fff"/>
                        </div>
                        <div className="col-md-4 mt-3">
                            <WordsList words={this.state.alleWorte.das} article="das" newWordHandler={this.handleAddNewWord} removeWordHandler={this.removeWord} bgColor="#27961f" txColor="#fff"/>
                        </div>
                        <div className="col-md-4 mt-3">
                            <WordsList words={this.state.alleWorte.die} article="die" newWordHandler={this.handleAddNewWord} removeWordHandler={this.removeWord} bgColor="#a83220" txColor="#fff"/>
                        </div>
                    </div>
                </div>
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
