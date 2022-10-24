export interface UnitTemplate {
	unitType: string;
	modelCount: number;
	quality: number;
	defense: number;
	equipment: Equipment[];
	specialRules: string[];
	upgrades: string[];
	cost: number;
}

export interface Equipment {
	name: string;
	numAttacks: number;
	specialRules: string[];
}

export const ogreUnits: UnitTemplate[] = [
	{
		unitType: "Champion",
		modelCount: 1,
		quality: 3,
		defense: 4,
		equipment: [
			{
				name: "Hand Weapon",
				numAttacks: 3,
				specialRules: [],
			},
		],
		specialRules: ["Hero", "Tough(3)"],
		upgrades: ["A", "B", "C"],
		cost: 55,
	},
	{
		unitType: "Hunt Master",
		modelCount: 1,
		quality: 3,
		defense: 4,
		equipment: [
			{
				name: "Hand Weapon",
				numAttacks: 3,
				specialRules: [],
			},
		],
		specialRules: ["Ambush", "Hero", "Hunter", "Strider", "Tough(3)"],
		upgrades: ["A", "D"],
		cost: 65,
	},
];

export const allArmyTemplates: { [key: string]: UnitTemplate[] } = {
	Ogres: ogreUnits,
	Dwarves: ogreUnits,
};
