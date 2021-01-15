import React, { useState } from "react";

const Search = ({ filteredData }) => {
	const [searchValue, setSearchValue] = useState("");
	const handleInputChange = (event) => {
		setSearchValue(event.target.value);
		filteredData(event.target.value);
	};

	return (
		<input
			className="search-input"
			type="text"
			placeholder="Search name..."
			value={searchValue}
			onChange={handleInputChange}
		/>
	);
};

export default Search;
