import React, { useContext } from "react";
import { ProfilesContext } from "../../context/ProfilesContext";

export default function Pagination(props) {
	const { filteredProfiles, profilePerPage, paginate } = useContext(
		ProfilesContext
	);

	const totalProfiles = filteredProfiles.length;
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalProfiles / profilePerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul>
				{pageNumbers.map((pageNumber) => (
					<li key={pageNumber} className="page-item">
						<a
							href="!#"
							className="page-link"
							onClick={() => paginate(pageNumber)}
						>
							{pageNumber}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
