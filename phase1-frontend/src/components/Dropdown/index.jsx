import React, { useContext, useState } from "react";
import { ProfilesContext } from "../../context/ProfilesContext";

export default function Dropdown({ multiSelect, title }) {
	const { dropdownData, setDropdownValue } = useContext(ProfilesContext);

	const [open, setOpen] = useState(false);
	const [selection, setSelection] = useState([]);

	const toggle = () => setOpen(!open);

	function handleClick(filterItem) {
		// if (!selection.some((current) => current.id === filterItem.id)) {
		// 	if (!multiSelect) {
		// 		setSelection({ filterItem });
		// 	} else if (multiSelect) {
		// 		setSelection([...selection, filterItem]);
		// 	}
		// } else {
		// 	let selectionAfterRemoval = selection;
		// 	selectionAfterRemoval = selectionAfterRemoval.filter(
		// 		(current) => current.id !== filterItem.id
		// 	);
		// 	setSelection([...selectionAfterRemoval]);
		// }

		setDropdownValue(filterItem);
	}

	// function isFilterItemSelected(filterItem) {
	// console.log(selection);
	// if (selection.find((current) => current.id === filterItem.id)) {
	// return true;
	// }
	// return false;
	// }

	return (
		<div className="dropdown">
			<div
				tabIndex={0}
				className="dropdown-details"
				role="button"
				onKeyPress={() => toggle(!open)}
				onClick={() => toggle(!open)}
			>
				<div className="dropdown-title">
					<p>{title}</p>
				</div>
				<div>
					<p>{open ? " -" : " +"}</p>
				</div>
			</div>

			{open && (
				<ul className="filter-container">
					{dropdownData(title).map((profile, i) => (
						<li key={profile}>
							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									handleClick(profile);
								}}
							>
								<span>{profile}</span>
								{/* <span>
									{isFilterItemSelected(profile) &&
										"Selected"}
								</span> */}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
