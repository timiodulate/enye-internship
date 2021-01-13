import "./App.css";
import { ProfilesProvider } from "./context/ProfilesContext";
import LandingPage from "./pages/LandingPage";

function App() {
	return (
		<ProfilesProvider>
			<LandingPage />
		</ProfilesProvider>
	);
}

export default App;
