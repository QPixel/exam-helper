import { NextApiRequest, NextApiResponse } from "next";

export interface Muscle {
	number: number;
	name: string;
}

const muscleData: Muscle[] = [
	{
		number: 5,
		name: "5"
	},
	{
		number: 5,
		name: "5"
	},
	{
		number: 5,
		name: "5"
	},
	{
		number: 5,
		name: "5"
	},
	{
		number: 5,
		name: "5"
	},
	{
		number: 5,
		name: "5"
	},
	{
		number: 5,
		name: "5"
	},
	{
		number: 5,
		name: "5"
	},
	{
		number: 5,
		name: "5"
	},
]

export default function handle(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(muscleData);	
}