import React, { Component } from 'react'

import WordsList from './WordsList';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import MediaQuery from 'react-responsive'

class WordsBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        }
        this.toggleActiveTab = this.toggleActiveTab.bind(this);
    }

    toggleActiveTab(index) {
        if(this.state.activeTab !== index)
            this.setState({activeTab: index});
    }

    render() {
        return (
            <div className="container-fluid">
                <MediaQuery minDeviceWidth={768}>
                    <div className="row">
                        <div className="col-md-4 mt-3">
                            <WordsList words={this.props.allWords.der} article="der" newWordHandler={this.props.newWordHandler} removeWordHandler={this.props.removeWordHandler} bgColor="#8254ff" txColor="#fff"/>
                        </div>
                        <div className="col-md-4 mt-3">
                            <WordsList words={this.props.allWords.das} article="das" newWordHandler={this.props.newWordHandler} removeWordHandler={this.props.removeWordHandler} bgColor="#27961f" txColor="#fff"/>
                        </div>
                        <div className="col-md-4 mt-3">
                            <WordsList words={this.props.allWords.die} article="die" newWordHandler={this.props.newWordHandler} removeWordHandler={this.props.removeWordHandler} bgColor="#a83220" txColor="#fff"/>
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
                            <WordsList words={this.props.allWords.der} article="der" newWordHandler={this.props.newWordHandler} removeWordHandler={this.props.removeWordHandler} bgColor="#8254ff" txColor="#fff"/>
                        </TabPane>
                        <TabPane tabId='2'>
                            <WordsList words={this.props.allWords.das} article="das" newWordHandler={this.props.newWordHandler} removeWordHandler={this.props.removeWordHandler} bgColor="#27961f" txColor="#fff"/>
                        </TabPane>
                        <TabPane tabId='3'>
                            <WordsList words={this.props.allWords.die} article="die" newWordHandler={this.props.newWordHandler} removeWordHandler={this.props.removeWordHandler} bgColor="#a83220" txColor="#fff"/>
                        </TabPane>
                    </TabContent>
                </MediaQuery>
            </div>
        )
    }
}

export default WordsBoard;
