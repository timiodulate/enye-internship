import React from "react";
import Search from "../components/Search";
import Profiles from "../components/Profiles";
import Pagination from "../components/Pagination";
import Dropdown from "../components/Dropdown";

export default function LandingPage(props) {
	return (
		<div className="App">
			<header className="App-header">Profiles</header>

			<div className="b">
				<Search />

				<div className="dropdown-container">
					<p>Sort by:</p>
					<div className="a">
						<Dropdown title="Gender" />
						<Dropdown title="gender" />
					</div>
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
