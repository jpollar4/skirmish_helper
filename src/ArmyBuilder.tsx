import React, { useState, useEffect, useRef } from "react";
import "./App.scss";

import {
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
	armyType: string;
	units?: UnitData[];
}

const ArmyBuilder = ({
	savedArmies,
}: {
	savedArmies?: { [key: string]: Army };
}) => {
	const [selectedArmyData, setSelectedArmyData] = useState<string>("");
	const [myArmy, setMyArmy] = useState<Army>();
	const [enemyArmy, setEnemyArmy] = useState<Army>();
	const [editName, setEditName] = useState<boolean>(false);
	const [edittedName, setEdittedName] = useState<string>("");

	useEffect(() => {
		setMyArmy(
			Object.values(savedArmies || {})[0] || {
				armyName: "New Army",
				armyType: "",
				units: [],
			}
		);
	}, []);

	const selectArmy = (army: string) => {
		setSelectedArmyData(army);
	};

	const addUnitToArmy = (unitTemplate: UnitTemplate) => {
		const newUnit: UnitData = {
			unitName: "",
			unitTemplate: unitTemplate,
		};
		if (myArmy !== undefined) {
			const units: UnitData[] = myArmy.units || [];
			units.push(newUnit);
			setMyArmy({ ...myArmy, units: units });
		} else {
			setMyArmy({ armyName: "", armyType: "", units: [newUnit] });
		}
	};

	const armyNames: string[] = Object.keys(allArmyTemplates);

	const selectedArmyTemplates: UnitTemplate[] =
		selectedArmyData !== "" ? allArmyTemplates[selectedArmyData] : [];

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
									setMyArmy(army);
								}}
							>
								{army.armyName}
							</Dropdown.Item>
						);
					})}
					<Dropdown.Item
						onClick={() => {
							setMyArmy({ armyName: "New Army", armyType: "", units: [] });
						}}
					>
						New Army
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown>
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Select Faction
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{armyNames.map((army) => {
						return (
							<Dropdown.Item
								onClick={() => {
									selectArmy(army);
								}}
							>
								{army}
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
			<h1
				onClick={() => {
					setEditName(true);
				}}
			>
				{myArmy !== undefined ? myArmy.armyName : "New Army"}
			</h1>
			{editName && (
				<input
					type="text"
					autoFocus
					style={{ margin: "auto", display: "block" }}
					onKeyPress={(event) => {
						if (event.key === "Enter") {
							if (myArmy !== undefined) {
								setEditName(false);
								setMyArmy({ ...myArmy, armyName: edittedName });
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
					{selectedArmyTemplates.map((unit) => {
						return (
							<UnitTemplateCard
								unitTemplate={unit}
								onAddUnit={() => addUnitToArmy(unit)}
							/>
						);
					})}
				</Row>
			</Container>
		</div>
	);
};

export default ArmyBuilder;
