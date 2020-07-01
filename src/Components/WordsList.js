import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,
    Input,
    ListGroup }
    from 'reactstrap';

import Word from './Word';

class WordsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newWord: '',
            newWordMeaning: ''
        }
        this.handleNewWordAdd = this.handleNewWordAdd.bind(this);
        this.handleNewWordChange = this.handleNewWordChange.bind(this);
        this.handleNewWordMeaningChange = this.handleNewWordMeaningChange.bind(this);
    }

    borderColor = {
        borderColor: this.props.bgColor,
        outlineColor: this.props.bgColor
    };

    handleNewWordAdd(e) {
        e.preventDefault();
        if(this.state.newWord) {
            this.props.newWordHandler(this.state.newWord, this.state.newWordMeaning, this.props.article);
            this.setState({newWord: '', newWordMeaning: ''})
        }
    }

    handleNewWordChange(e) {
        this.setState({
            newWord: e.target.value
        })
    }
    handleNewWordMeaningChange(e) {
        this.setState({
            newWordMeaning: e.target.value
        })
    }

    renderList(words, article) {
        return words.map((word) =>
            <Word key={word.id} energyIncrease={this.props.energyIncrease} energyDecrease={this.props.energyDecrease} removeWordHandler={this.props.removeWordHandler} bgColor={this.props.bgColor} txColor={this.props.txColor} word={word} article={article} />
        )
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleNewWordAdd}>
                    <InputGroup>
                        <InputGroupAddon className="d-none d-md-flex" addonType="prepend">
                            <InputGroupText style={{borderBottomLeftRadius: '0', backgroundColor: this.props.bgColor, border: 'transparent', color: this.props.txColor}}>{this.props.article}</InputGroupText>
                        </InputGroupAddon>
                        <Input style={this.borderColor} placeholder="word" value={this.state.newWord} onChange={this.handleNewWordChange}/>
                        <Input style={this.borderColor} placeholder="meaning (optional)" value={this.state.newWordMeaning} onChange={this.handleNewWordMeaningChange}/>
                        <InputGroupAddon addonType="append">
                            <Button type="submit" style={{...{borderBottomRightRadius: '0', color: this.props.bgColor}, ...this.borderColor}} outline color="light">Add</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
                <ListGroup style={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}}>
                    {this.renderList(this.props.words, this.props.article)}
                    <Word bgColor={this.props.bgColor} txColor={this.props.txColor} style={{backgroundColor: 'black'}} word={{value: this.state.newWord, meaning: this.state.newWordMeaning, energy: 0}} article={this.props.article} />
                </ListGroup>
            </div>
        )
    }
}

WordsList.propTypes = {
    words: PropTypes.arrayOf(PropTypes.object),
    article: PropTypes.oneOf(['der', 'die', 'das']),
    bgColor: PropTypes.string,
    txColor: PropTypes.string
}

export default WordsList;
