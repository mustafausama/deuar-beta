import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ListGroupItem, Badge, Button } from 'reactstrap';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            front: true,
            final: this.props.removeWordHandler ? true : false
        }
        this.__toggleFront = this.__toggleFront.bind(this);
        this.toggleItem = this.toggleItem.bind(this);
        this.energyIncrease = this.energyIncrease.bind(this);
        this.energyDecrease = this.energyDecrease.bind(this);
        this.renderFront = this.renderFront.bind(this);
        this.renderBack = this.renderBack.bind(this);
    }

    __toggleFront() {
        this.setState({front: !this.state.front});
    }

    toggleItem = (e) => {
        if(this.state.final && e.target.id === 'list-item')
            this.__toggleFront();
    }

    energyIncrease() {
        this.__toggleFront();
        this.props.energyIncrease.apply(this, [this.props.word.id, this.props.article])
    }

    energyDecrease() {
        this.__toggleFront();
        this.props.energyDecrease.apply(this, [this.props.word.id, this.props.article])
    }

    renderFront() {
        return(
            <>
                {this.props.article + ' ' + this.props.word.value}
                {this.state.final ? <button onClick={this.props.removeWordHandler.bind(this, this.props.word.id, this.props.article)} type="button" className=" float-right close ml-2" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> : null}
                {(this.props.word.energy) ? <Badge style={{backgroundColor: this.props.txColor, color: this.props.bgColor, verticalAlign:'middle'}} className="float-right mt-1" pill>{this.props.word.energy}</Badge> : null}
            </>
        )
    }

    renderBack() {
        return(
            <>
                {this.props.word.meaning}
                {this.state.final ?
                <>
                <Button onClick={this.energyDecrease} className="float-right ml-2" style={{padding: '0', background: 'none', border: 'none'}}>
                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-dash-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fillRule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </Button>
                <Button onClick={this.energyIncrease} className="float-right ml-2" style={{padding: '0', background: 'none', border: 'none'}}>
                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-plus-circle mt-1 float-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                        <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    </svg>
                </Button>
                </>
                : null }
                {(this.props.word.energy) ? <Badge style={{backgroundColor: this.props.txColor, color: this.props.bgColor, verticalAlign:'middle'}} className="float-right mt-1" pill>{this.props.word.energy}</Badge> : null}
            </>
        )
    }
    
    render() {
        if(this.props.word.value)
        return (
            <ListGroupItem id='list-item' onClick={this.toggleItem} style={{backgroundColor: this.props.bgColor, color: this.props.txColor}} className="justify-content-between">
                {this.state.front ? this.renderFront() : this.renderBack()}
            </ListGroupItem>
        )
        else return null;
    }
}

Word.propTypes = {
    word: PropTypes.object,
    article: PropTypes.string,
    bgColor: PropTypes.string,
    txColor: PropTypes.string
}

export default Word;
