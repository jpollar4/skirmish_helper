import React, { useState, useEffect, useRef } from "react";
import "./App.scss";

import {
	Alert,
	Button,
	Container,
	Dropdown,
	Form,
	Row,
	Tab,
	Tabs,
} from "react-bootstrap";
import UnitCard, { UnitData } from "./UnitCard";
import { allArmyTemplates, UnitTemplate } from "./armyTemplates";
import UnitTemplateCard from "./UnitTemplateCard";

export interface Army {
	armyName: string;
	armyFaction: string;
	units?: UnitData[];
}

const ArmyBuilder = ({
	savedArmies,
	onUpdateArmy,
}: {
	savedArmies: { [key: string]: Army };
	onUpdateArmy: (army: Army, originalArmyName?: string) => void;
}) => {
	const [currentArmy, setCurrentArmy] = useState<string>("");
	const [editName, setEditName] = useState<boolean>(false);
	const [changingFaction, setChangingFaction] = useState<boolean>(false);
	const [edittedName, setEdittedName] = useState<string>("");

	useEffect(() => {
		setCurrentArmy(Object.keys(savedArmies)[0]);
	}, []);

	const myArmy = savedArmies[currentArmy] || {
		armyName: "LOADING...",
		armyFaction: "",
		units: [],
	};

	const selectArmyFaction = (faction: string) => {
		if (faction !== myArmy.armyFaction) {
			onUpdateArmy({ ...myArmy, armyFaction: faction, units: [] });
		}
	};

	const addUnitToArmy = (unitTemplate: UnitTemplate) => {
		const newUnit: UnitData = {
			unitName: "",
			unitTemplate: unitTemplate,
		};
		if (myArmy !== undefined) {
			const units: UnitData[] = myArmy.units || [];
			units.push(newUnit);
			onUpdateArmy({ ...myArmy, units: units });
		}
	};

	const armyNames: string[] = Object.keys(allArmyTemplates);

	const selectedArmyTemplates: UnitTemplate[] =
		myArmy.armyFaction !== "" ? allArmyTemplates[myArmy.armyFaction] : [];

	return (
		<div className="App">
			<Dropdown>
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Select Army
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{Object.values(savedArmies || {}).map((army) => {
						return (
							<Dropdown.Item
								onClick={() => {
									setCurrentArmy(army.armyName);
								}}
							>
								{army.armyName}
							</Dropdown.Item>
						);
					})}
					{
						<Dropdown.Item
							onClick={() => {
								onUpdateArmy({
									armyName: "New Army",
									armyFaction: "",
									units: [],
								});
								setCurrentArmy("New Army");
							}}
						>
							New Army
						</Dropdown.Item>
					}
				</Dropdown.Menu>
			</Dropdown>

			<h1
				onClick={() => {
					setEdittedName(myArmy.armyName);
					setEditName(true);
				}}
			>
				{myArmy !== undefined ? myArmy.armyName : "New Army"}
			</h1>

			<Container>
				<h4
					onClick={() => {
						setChangingFaction(true);
					}}
				>
					{myArmy.armyFaction || "Select Faction"}
				</h4>
				{changingFaction && (
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							Select Faction
						</Dropdown.Toggle>
						Warning: Changing Faction deletes all units
						<Dropdown.Menu>
							{armyNames.map((army) => {
								return (
									<Dropdown.Item
										onClick={() => {
											selectArmyFaction(army);
											setChangingFaction(false);
										}}
									>
										{army}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				)}
			</Container>
			{editName && (
				<input
					type="text"
					autoFocus
					style={{ margin: "auto", display: "block" }}
					onKeyPress={(event) => {
						if (event.key === "Enter") {
							if (myArmy !== undefined) {
								setEditName(false);
								onUpdateArmy(
									{ ...myArmy, armyName: edittedName },
									myArmy.armyName
								);
								setCurrentArmy(edittedName);
							}
						}
					}}
					onChange={(event) => {
						setEdittedName(event.target.value);
					}}
				/>
			)}
			<Container>
				<Row>
					{myArmy !== undefined
						? (myArmy.units || []).map((unit) => {
								return <UnitCard unitData={unit} />;
						  })
						: ""}
				</Row>
			</Container>
			<h1>Units To Add</h1>
			<Container>
				<Row>
					{selectedArmyTemplates
						? selectedArmyTemplates.map((unit) => {
								return (
									<UnitTemplateCard
										unitTemplate={unit}
										onAddUnit={() => addUnitToArmy(unit)}
									/>
								);
						  })
						: ""}
				</Row>
			</Container>
		</div>
	);
};

export default ArmyBuilder;
