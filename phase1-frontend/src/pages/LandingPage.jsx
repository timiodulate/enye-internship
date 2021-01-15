import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Profiles from "../components/Profiles";
import Pagination from "../components/Pagination";
import Dropdown from "../components/Dropdown";

export default function LandingPage(props) {
	const [profilesData, setProfilesData] = useState([]);
	const [filteredProfilesData, setFilteredProfilesData] = useState([
		...profilesData,
	]);
	useEffect(() => {
		fetch("http://api.enye.tech/v1/challenge/records")
			.then((res) => res.json())
			.then((data) => {
				setProfilesData([...data.records.profiles]);
				setFilteredProfilesData([...data.records.profiles]);
			});
	}, []);

	//Search
	const filteredData = (filterValue) => {
		let filterData = filteredProfilesData.filter((value) => {
			if (filterValue === "") {
				return profilesData;
			} else if (
				value.FirstName.toLowerCase().includes(
					filterValue.toLowerCase()
				) ||
				value.LastName.toLowerCase().includes(filterValue.toLowerCase())
			) {
				return value;
			} else if (
				sortBy === "Gender" &&
				value.Gender.toLowerCase() === filterValue.toLowerCase()
			) {
				return value;
			} else if (
				sortBy === "PaymentMethod" &&
				value.PaymentMethod.toLowerCase() === filterValue.toLowerCase()
			) {
				return value;
			}
		});

		setFilteredProfilesData(filterData);
	};

	// // Dropdown Filter
	const [sortBy, setSortBy] = useState("");
	const [dropdownValue, setDropdownValue] = useState("");
	const dropdownData = (filterBy) => {
		setSortBy(filterBy);
		let data = [];
		profilesData.map((val) => {
			if (data.includes(val[filterBy])) {
				return null;
			}

			data.push(val[filterBy]);
		});

		return data;
	};
	function handleClick(filterItem) {
		setDropdownValue(filterItem);
		if (dropdownValue === filterItem) {
			setDropdownValue("");
		}

		filteredData(filterItem);
	}

	// Pagination
	// const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const profilePerPage = 10;
	const indexOfLastProfile = currentPage * profilePerPage;
	const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
	const currentProfiles = filteredProfilesData.slice(
		indexOfFirstProfile,
		indexOfLastProfile
	);
	// change Page
	const paginate = (number) => setCurrentPage(number);

	return (
		<div className="App">
			<header className="App-header">Profiles</header>

			<div className="search-container">
				<Search filteredData={filteredData} />
			</div>

			<div className="sort-container">
				<p>Sort by:</p>

				<div className="dropdown-container">
					<Dropdown
						title="Gender"
						handleClick={handleClick}
						dropdownData={dropdownData}
					/>
					<Dropdown
						title="PaymentMethod"
						handleClick={handleClick}
						dropdownData={dropdownData}
					/>
				</div>
			</div>

			<div className="profiles-container">
				<Profiles currentProfiles={currentProfiles} />
			</div>

			<Pagination
				filteredProfilesData={filteredProfilesData}
				profilePerPage={profilePerPage}
				paginate={paginate}
			/>

			<footer>
				created by <a href="timiodulate.netlify.app">timiodulate</a>
			</footer>
		</div>
	);
}
