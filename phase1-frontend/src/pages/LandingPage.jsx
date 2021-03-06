import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Profiles from "../components/Profiles";
import Pagination from "../components/Pagination";
import Dropdown from "../components/Dropdown";

export default function LandingPage(props) {
	const [profilesData, setProfilesData] = useState([]);
	const [filteredProfilesData, setFilteredProfilesData] = useState([]);

	useEffect(() => {
		getUserData();
	}, []);

	const getUserData = async () => {
		const end_point = "https://api.enye.tech/v1/challenge/records";
		const fetchData = await fetch(end_point);
		const fetchedData = await fetchData.json();
		setProfilesData([...fetchedData.records.profiles]);
		setFilteredProfilesData([...fetchedData.records.profiles]);
	};

	//Search
	const filteredData = (filterValue) => {
		let filterData = filteredProfilesData.filter((value) => {
			if (filterValue === "") {
				return value;
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

		if (filterValue === "") {
			setFilteredProfilesData(profilesData);
		} else {
			setFilteredProfilesData(filterData);
		}
	};

	// Dropdown Filter
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

		filteredData(dropdownValue);
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
				created by{" "}
				<a href="http://timiodulate.netlify.app" target="_blank">
					timiodulate
				</a>
			</footer>
		</div>
	);
}
