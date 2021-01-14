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
		let filterData = profilesData.filter((value) => {
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

		return filterData;
	};

	// Dropdown Filter
	const [dropdownValue, setDropdownValue] = useState("");
	const [sortBy, setSortBy] = useState("");
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

	// Pagination
	// const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [profilePerPage, setProfilePerPage] = useState(10);
	const indexOfLastProfile = currentPage * profilePerPage;
	const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
	const filteredProfiles = filteredData(
		dropdownValue !== "" ? dropdownValue : searchValue
	);
	const currentProfiles = filteredProfiles.slice(
		indexOfFirstProfile,
		indexOfLastProfile
	);
	// change Page
	const paginate = (number) => setCurrentPage(number);

	return (
		<ProfilesContext.Provider
			value={{
				searchValue,
				handleInputChange,
				filteredData,
				dropdownValue,
				setDropdownValue,
				dropdownData,
				filteredProfiles,
				currentProfiles,
				profilePerPage,
				paginate,
			}}
		>
			{props.children}
		</ProfilesContext.Provider>
	);
};
