import React from "react";

export default function Profiles({ currentProfiles }) {
	const columns = currentProfiles[0] && Object.keys(currentProfiles[0]);

	return (
		<table>
			<thead>
				<tr>
					{currentProfiles[0] &&
						columns.map((heading) => <th>{heading}</th>)}
				</tr>
			</thead>
			<tbody>
				{currentProfiles.map((row) => (
					<tr>
						{columns.map((column) => {
							return <td>{row[column]}</td>;
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}
