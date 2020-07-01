import React, { Component } from 'react'

import { reactLocalStorage } from 'reactjs-localstorage';

import WordsList from './WordsList';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import MediaQuery from 'react-responsive'

class WordsBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            alleWorte: {
                der: [],
                das: [],
                die: []
            }
        }
        this.toggleActiveTab = this.toggleActiveTab.bind(this);
        this.newWordHandler = this.newWordHandler.bind(this);
        this.removeWordHandler = this.removeWordHandler.bind(this);
    }

    componentDidMount() {
        if(Object.keys(reactLocalStorage.getObject('alleWorte')).length === 0 && reactLocalStorage.getObject('alleWorte').constructor === Object) return;
        this.setState({alleWorte: reactLocalStorage.getObject('alleWorte')});
    }

    newWordHandler(word, meaning, article) {
        this.setState({
            alleWorte: {
                der: (article === 'der') ? [...this.state.alleWorte.der, {id: ((this.state.alleWorte.der.length > 0) ? this.state.alleWorte.der[this.state.alleWorte.der.length-1].id+1 : 0), value: word, meaning: meaning, energy:0}] : this.state.alleWorte.der,
                das: (article === 'das') ? [...this.state.alleWorte.das, {id: ((this.state.alleWorte.das.length > 0) ? this.state.alleWorte.das[this.state.alleWorte.das.length-1].id+1 : 0), value: word, meaning: meaning, energy:0}] : this.state.alleWorte.das,
                die: (article === 'die') ? [...this.state.alleWorte.die, {id: ((this.state.alleWorte.die.length > 0) ? this.state.alleWorte.die[this.state.alleWorte.die.length-1].id+1 : 0), value: word, meaning: meaning, energy:0}] : this.state.alleWorte.die                
            }
        }, () => reactLocalStorage.setObject('alleWorte', this.state.alleWorte));
    }

    removeWordHandler = (id, article) => {
        this.setState({
            alleWorte: {
                der: (article === 'der') ? this.state.alleWorte.der.filter(word => word.id !== id) : this.state.alleWorte.der,
                das: (article === 'das') ? this.state.alleWorte.das.filter(word => word.id !== id) : this.state.alleWorte.das,
                die: (article === 'die') ? this.state.alleWorte.die.filter(word => word.id !== id) : this.state.alleWorte.die
            }
        }, () => reactLocalStorage.setObject('alleWorte', this.state.alleWorte));
    }

    toggleActiveTab(index) {
        if(this.state.activeTab !== index)
            this.setState({activeTab: index});
    }

    energyIncrease = (id, article) => {
        this.setState({
            alleWorte: {
                der: (article === 'der') ? this.state.alleWorte.der.map(word => (word.id === id ? {...word, energy: word.energy+1} : word)) : this.state.alleWorte.der,
                das: (article === 'das') ? this.state.alleWorte.das.map(word => (word.id === id ? {...word, energy: word.energy+1} : word)) : this.state.alleWorte.das,
                die: (article === 'die') ? this.state.alleWorte.die.map(word => (word.id === id ? {...word, energy: word.energy+1} : word)) : this.state.alleWorte.die
            }
        }, () => reactLocalStorage.setObject('alleWorte', this.state.alleWorte));

    }

    energyDecrease = (id, article) => {
        this.setState({
            alleWorte: {
                der: (article === 'der') ? this.state.alleWorte.der.map(word => (word.id === id ? {...word, energy: Math.max(word.energy-1, 0)} : word)) : this.state.alleWorte.der,
                das: (article === 'das') ? this.state.alleWorte.das.map(word => (word.id === id ? {...word, energy: Math.max(word.energy-1, 0)} : word)) : this.state.alleWorte.das,
                die: (article === 'die') ? this.state.alleWorte.die.map(word => (word.id === id ? {...word, energy: Math.max(word.energy-1, 0)} : word)) : this.state.alleWorte.die
            }
        }, () => reactLocalStorage.setObject('alleWorte', this.state.alleWorte));

    }

    render() {
        const derList = <WordsList words={this.state.alleWorte.der} article="der" energyIncrease={this.energyIncrease} energyDecrease={this.energyDecrease} newWordHandler={this.newWordHandler} removeWordHandler={this.removeWordHandler} bgColor="#8254ff" txColor="#fff"/>;
        const dasList = <WordsList words={this.state.alleWorte.das} article="das" energyIncrease={this.energyIncrease} energyDecrease={this.energyDecrease} newWordHandler={this.newWordHandler} removeWordHandler={this.removeWordHandler} bgColor="#27961f" txColor="#fff"/>;
        const dieList = <WordsList words={this.state.alleWorte.die} article="die" energyIncrease={this.energyIncrease} energyDecrease={this.energyDecrease} newWordHandler={this.newWordHandler} removeWordHandler={this.removeWordHandler} bgColor="#a83220" txColor="#fff"/>;

        return (
            <div className="container-fluid">
                <MediaQuery minDeviceWidth={768}>
                    <div className="row">
                        <div className="col-md-4 mt-3">
                            {derList}
                        </div>
                        <div className="col-md-4 mt-3">
                            {dasList}
                        </div>
                        <div className="col-md-4 mt-3">
                            {dieList}
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={767}>
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
                            {derList}
                        </TabPane>
                        <TabPane tabId='2'>
                            {dasList}
                        </TabPane>
                        <TabPane tabId='3'>
                            {dieList}
                        </TabPane>
                    </TabContent>
                </MediaQuery>
            </div>
        )
    }
}

export default WordsBoard;
