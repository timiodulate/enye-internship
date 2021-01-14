import React, { useContext } from "react";
import { ProfilesContext } from "../../context/ProfilesContext";

const Search = () => {
	const { searchValue, handleInputChange } = useContext(ProfilesContext);

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
