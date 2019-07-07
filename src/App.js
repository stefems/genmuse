import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//my components
import Listing from './mycomps/pages/Listing';
import Header from './mycomps/pages/Header';
import Rain from './mycomps/projects/Rain';

//icons

//mui components

function App() {
	return (
		<div style={{fontFamily: "PT Sans, sans-serif"}} className="App">
			<Header />
			<Router>
				<Route path="/" exact component={Listing} />
				<Route path="/generate-music-rain-and-strings" component={Rain} />
			</Router>
		</div>
	);
}

export default App;
