import React from "react";

export default function Pagination({
	filteredProfilesData,
	profilePerPage,
	paginate,
}) {
	const totalProfiles = filteredProfilesData.length;
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
