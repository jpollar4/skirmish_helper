import React, { useState, useEffect } from "react";
import "./App.scss";

import {
	Button,
	Card,
	Container,
	OverlayTrigger,
	Popover,
	Row,
} from "react-bootstrap";
import { UnitTemplate } from "./armyTemplates";

export interface UnitData {
	unitName: string;
	unitTemplate: UnitTemplate;
}

const UnitTemplateCard = ({
	unitTemplate,
	onAddUnit,
}: {
	onAddUnit: () => void;
	unitTemplate: UnitTemplate;
}) => {
	const [npcData, setNPCData] = useState<string>();

	useEffect(() => {
		//loadForecast();
	}, []);

	return (
		<Card style={{ width: "22rem" }}>
			<Card.Body>
				<Card.Title>{unitTemplate.unitType}</Card.Title>
				<Card.Text>Number of Models: {unitTemplate.modelCount}</Card.Text>
				<Card.Text>Cost: {unitTemplate.cost}pts</Card.Text>
				<Card.Text>
					Quality: <strong>{unitTemplate.quality}+</strong>{" "}
				</Card.Text>
				<Card.Text>
					Defense: <strong>{unitTemplate.defense}+</strong>
				</Card.Text>
				<Card.Title>Special Rules</Card.Title>
				{(unitTemplate.specialRules || []).map((rule) => {
					return (
						<OverlayTrigger
							trigger="click"
							placement="top"
							overlay={
								<Popover id={`popover-positioned-${rule}`}>
									<Popover.Header as="h3">{rule}</Popover.Header>
									<Popover.Body>
										<strong>Holy guacamole!</strong> Check this info.
									</Popover.Body>
								</Popover>
							}
						>
							<Button style={{ margin: "2px" }} size="sm">
								{rule}
							</Button>
						</OverlayTrigger>
					);
				})}
				<Card.Title>---</Card.Title>
				{unitTemplate !== undefined && onAddUnit && (
					<Button variant="primary" onClick={() => onAddUnit()}>
						Add To Army
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};

export default UnitTemplateCard;
