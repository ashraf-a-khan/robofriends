import React, {Component} from 'react';
import CardList from '../components/CardList';
import {robots} from './robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			robots: robots,
			searchfield: ''
		}
		//console.log('constructor');
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users=>this.setState({robots: robots}));
		//console.log('componentDidMount');
	}
	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value})
		//console.log(event.target.value);
		
		//console.log(filteredRobots);
	}
	render() {
		const {robots, searchfield }= this.state;
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		//console.log('render');
		return !robots.length ?
			<h1> Loading </h1>:
		(
			<div className='tc'>
				<h1> RoboFriends</h1>
				<SearchBox  searchChange={this.onSearchChange}/>
				<Scroll>
					<CardList robots = {filteredRobots}/>
				</Scroll>
			</div>
		);
	}

}

export default App;