import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import WordsList from './WordsList';

import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

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
            },
            activeTab: '1'
        }
        this.toggleActiveTab = this.toggleActiveTab.bind(this);
        this.handleAddNewWord = this.handleAddNewWord.bind(this);
        this.renderHome = this.renderHome.bind(this);
    }

    toggleActiveTab(index) {
        if(this.state.activeTab !== index)
            this.setState({activeTab: index});
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
                    <div className="row d-none d-md-flex">
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
                    
                    <div className="d-block d-md-none mt-2">
                        <Nav tabs style={{border:'none'}}>
                            <NavItem>
                                <NavLink style={{backgroundColor: this.state.activeTab === '1' ? '#8254ff' : '#fff', color: this.state.activeTab === '1' ? '#fff' : '#8254ff'}} href="#" onClick={()=>this.toggleActiveTab('1')} className={this.state.activeTab === '1' ? "active" : ""}>der</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{backgroundColor: this.state.activeTab === '2' ? '#27961f' : '#fff', color: this.state.activeTab === '2' ? '#fff' : '#27961f'}} href="#" onClick={()=>this.toggleActiveTab('2')} className={this.state.activeTab === '2' ? "active" : ""}>das</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{backgroundColor: this.state.activeTab === '3' ? '#a83220' : '#fff', color: this.state.activeTab === '3' ? '#fff' : '#a83220'}} href="#" onClick={()=>this.toggleActiveTab('3')} className={this.state.activeTab === '3' ? "active" : ""}>die</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId='1'>
                                <WordsList words={this.state.alleWorte.der} article="der" newWordHandler={this.handleAddNewWord} removeWordHandler={this.removeWord} bgColor="#8254ff" txColor="#fff"/>
                            </TabPane>
                            <TabPane tabId='2'>
                                <WordsList words={this.state.alleWorte.das} article="das" newWordHandler={this.handleAddNewWord} removeWordHandler={this.removeWord} bgColor="#27961f" txColor="#fff"/>
                            </TabPane>
                            <TabPane tabId='3'>
                                <WordsList words={this.state.alleWorte.die} article="die" newWordHandler={this.handleAddNewWord} removeWordHandler={this.removeWord} bgColor="#a83220" txColor="#fff"/>
                            </TabPane>
                        </TabContent>
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
