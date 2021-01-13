import React, { createContext, useState, useEffect } from "react";

export const ProfilesContext = createContext(null);

export const ProfilesProvider = (props) => {
	const [profilesData, setProfilesData] = useState([]);

	useEffect(() => {
		fetch("http://api.enye.tech/v1/challenge/records")
			.then((res) => res.json())
			.then((data) => {
				setProfilesData([...data.records.profiles]);
			});
	}, []);

	//Search
	const [searchValue, setSearchValue] = useState("");
	const handleInputChange = (event) => {
		setSearchValue(event.target.value);
	};
	const filteredData = (filterValue) => {
		console.log(filterValue);
		console.log(profilesData);
		let newt = profilesData.filter((value) => {
			console.log(value);
			if (filterValue === "") {
				return value;
			} else if (
				typeof filterValue === String &&
				value.name.toLowerCase().includes(filterValue.toLowerCase())
			) {
				return value;
			} else if (
				typeof filterValue !== String
				// value.age.includes(filterValue)
				// value.age.
			) {
				return value;
			}
		});

		return newt;
	};

	// Dropdown Filter
	const [dropdownValue, setDropdownValue] = useState("");
	const dropdownData = (filterBy) => {
		let data = [];
		profilesData.map((val) => {
			if (data.includes(val[filterBy])) {
				return null;
			}

			data.push(val[filterBy]);
		});

		return data;
	};

	// Pagination
	// const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [profilePerPage, setProfilePerPage] = useState(10);
	const indexOfLastProfile = currentPage * profilePerPage;
	const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
	const currentProfiles = filteredData(
		dropdownValue !== "" ? dropdownValue : searchValue
	).slice(indexOfFirstProfile, indexOfLastProfile);
	// change Page
	const paginate = (number) => setCurrentPage(number);

	return (
		<ProfilesContext.Provider
			value={{
				profilesData,
				searchValue,
				handleInputChange,
				filteredData,
				dropdownValue,
				setDropdownValue,
				dropdownData,
				currentProfiles,
				profilePerPage,
				paginate,
			}}
		>
			{props.children}
		</ProfilesContext.Provider>
	);
};
