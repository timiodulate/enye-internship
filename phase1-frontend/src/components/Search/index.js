import React, { useContext } from "react";
import { ProfilesContext } from "../../context/ProfilesContext";
// import searchInputStyles from "./search.module.css";

const Search = () => {
	const { searchValue, handleInputChange } = useContext(ProfilesContext);

	return (
		<input
			className="search-input"
			type="text"
			placeholder="Search..."
			value={searchValue}
			onChange={handleInputChange}
		/>
	);
};

export default Search;
