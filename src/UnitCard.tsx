import React, { useState, useEffect } from "react";
import "./App.scss";

import { Button, Card, Container, Row } from "react-bootstrap";
import { UnitTemplate } from "./armyTemplates";

export interface UnitData {
	unitName: string;
	unitTemplate: UnitTemplate;
}

const UnitCard = ({ unitData }: { unitData: UnitData }) => {
	const [npcData, setNPCData] = useState<string>();

	useEffect(() => {
		//loadForecast();
	}, []);

	return (
		<Card style={{ width: "20rem" }}>
			<Card.Img variant="top" src="holder.js/100px180" />
			<Card.Body>
				<Card.Title>Lord Dodo</Card.Title>
				<Card.Text>Vampire Lord</Card.Text>
				<Container>
					<Row>
						<Card>
							<Card.Body>
								<Card.Title>Quality</Card.Title>
								<Card.Text>5+</Card.Text>
							</Card.Body>
						</Card>
						<Card>
							<Card.Body>
								<Card.Title>Defense</Card.Title>
								<Card.Text>5+</Card.Text>
							</Card.Body>
						</Card>
					</Row>
				</Container>
				<Card.Text>Ambush, Hero, Hunter, Strider, Tough(3)</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default UnitCard;
