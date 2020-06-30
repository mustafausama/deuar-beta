import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ListGroupItem, Badge } from 'reactstrap';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            front: true
        }
        this.toggleItem = this.toggleItem.bind(this);
        this.renderFront = this.renderFront.bind(this);
        this.renderBack = this.renderBack.bind(this);
    }

    toggleItem() {
        this.setState({front: !this.state.front});
    }

    renderFront() {
        return(
            <>
                {this.props.article + ' ' + this.props.word.value}
                {this.props.removeWord ? <button onClick={this.props.removeWord.bind(this, this.props.word.id, this.props.article)} type="button" className=" float-right close ml-2" aria-label="Close">
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
                {this.props.removeWord ? <button onClick={this.props.removeWord.bind(this, this.props.word.id, this.props.article)} type="button" className=" float-right close ml-2" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> : null}
                {(this.props.word.energy) ? <Badge style={{backgroundColor: this.props.txColor, color: this.props.bgColor, verticalAlign:'middle'}} className="float-right mt-1" pill>{this.props.word.energy}</Badge> : null}
            </>
        )
    }
    
    render() {
        if(this.props.word.value)
        return (
            <ListGroupItem onClick={this.toggleItem} style={{backgroundColor: this.props.bgColor, color: this.props.txColor}} className="justify-content-between">
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
