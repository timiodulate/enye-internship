import React, { useState } from "react";

export default function Dropdown({ title, handleClick, dropdownData }) {
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen(!open);

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
					<p>{open ? "-" : "+"}</p>
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
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
