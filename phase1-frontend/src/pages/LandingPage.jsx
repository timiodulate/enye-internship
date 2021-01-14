import React from "react";
import Search from "../components/Search";
import Profiles from "../components/Profiles";
import Pagination from "../components/Pagination";
import Dropdown from "../components/Dropdown";

export default function LandingPage(props) {
	return (
		<div className="App">
			<header className="App-header">Profiles</header>

			<div className="search-container">
				<Search />
			</div>

			<div className="sort-container">
				<p>Sort by:</p>

				<div className="dropdown-container">
					<Dropdown title="Gender" />
					<Dropdown title="PaymentMethod" />
				</div>
			</div>

			<div className="profiles-container">
				<Profiles />
			</div>

			<Pagination />

			<footer>
				created by <a href="timiodulate.netlify.app">timiodulate</a>
			</footer>
		</div>
	);
}
