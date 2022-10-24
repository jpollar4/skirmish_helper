import { useEffect, useState } from "react";
import "./App.scss";

import { Tab, Tabs } from "react-bootstrap";
import ArmyBuilder, { Army } from "./ArmyBuilder";

const localStorageKey = "skirmishHelperSavedArmies";
const App = () => {
	const [savedArmies, setSavedArmies] = useState<{ [key: string]: Army }>();

	const loadArmiesFromStorage = () => {
		const savedArmiesString = localStorage.getItem(localStorageKey);
		if (savedArmiesString && savedArmiesString !== "") {
			setSavedArmies(JSON.parse(savedArmiesString));
		}
	};
	const saveArmiesToStorage = () => {
		localStorage.setItem(localStorageKey, JSON.stringify(savedArmies));
	};

	useEffect(() => {
		loadArmiesFromStorage();
	}, []);

	return (
		<div className="App">
			<h1>AOF: Skirmish Helper</h1>
			<div className="subTitle">Build an army and access rules</div>
			<Tabs
				defaultActiveKey="profile"
				id="uncontrolled-tab-example"
				className="mb-3"
			>
				<Tab eventKey="home" title="Home">
					<div />
				</Tab>
				<Tab eventKey="armyBuilder" title="Army Builder">
					<ArmyBuilder savedArmies={savedArmies} />
				</Tab>
				<Tab eventKey="contact" title="Contact" disabled>
					<div />
				</Tab>
			</Tabs>
		</div>
	);
};

export default App;
