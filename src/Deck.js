import React, { Component } from 'react';
import Card from './Card';
import Axios from 'axios';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = { deck: null, drawnCards: [] };
		this.getCard = this.getCard.bind(this);
	}
	async componentDidMount() {
		let deck = await Axios.get(`${API_BASE_URL}/new/shuffle/`);
		this.setState({ deck: deck.data });
	}
	async getCard() {
		let id = this.state.deck.deck_id;
		//let cardUrl = `${API_BASE_URL}/${id}/draw/`;
		try {
			let cardRes = await Axios.get('https://deckofcardsapi.com/api/deck/dpqznllws98h/draw/');

			if (cardRes.data.remaining === 0) {
				console.log('NO CARDS');
			}

			let card = cardRes.data.cards[0];
			console.log(card);
			this.setState((st) => ({
				drawnCards: [
					...st.drawnCards,
					{
						id: card.code,
						image: card.image,
						name: `${card.suit} ${card.value}`
					}
				]
			}));
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const cards = this.state.drawnCards.map((c) => <Card name={c.name} image={c.image} key={c.id} />);
		return (
			<div>
				<h1>Card Dealer</h1>
				<button onClick={this.getCard}>Get Card!</button>
				{cards}
			</div>
		);
	}
}

export default Deck;
