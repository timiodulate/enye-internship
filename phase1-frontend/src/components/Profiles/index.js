import React, { useContext } from "react";
import { ProfilesContext } from "../../context/ProfilesContext";

export default function Profiles() {
	const { currentProfiles } = useContext(ProfilesContext);

	return (
		<ul>
			{currentProfiles.map((profile) => (
				<li>{profile.LastName}</li>
			))}
		</ul>
	);
}
