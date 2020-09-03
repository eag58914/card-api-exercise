import React, { Component } from 'react';
import axios from 'axios';

class ZenQuote extends Component {
	constructor(props) {
		console.log('INSIDE CONSTRCUTOR');
		super(props);
		this.state = { quote: '', isLoaded: false };
	}
	componentWillMount() {
		//load data
		console.log('INSIDE COMPONENT DID MOUNT');
		axios.get('https://api.github.com/zen').then((response) => {
			setTimeout(
				function() {
					this.setState({ quote: response.data, isLoaded: true });
				}.bind(this),
				3000
			);
		});
	}
	componentDidUpdate() {
		console.log('INSIDE COMPONENT DID UPDATE');
	}
	render() {
		console.log('RENDER');
		return (
			<div>
				{this.state.isLoaded ? (
					<div>
						<h1>Always Remember...</h1>
						<p>{this.state.quote}</p>
					</div>
				) : (
					<h1> Is Loading</h1>
				)}
			</div>
		);
	}
}

export default ZenQuote;
