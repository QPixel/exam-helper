import { Flex, Center } from "@chakra-ui/layout";
import Image from "next/image";
import humanBody from "../../public/humanbody.png";
import { Text, useBreakpointValue, Box, SlideFade, chakra, Button, Input } from "@chakra-ui/react";
// import {
// 	Drawer,
// 	DrawerOverlay,
// 	DrawerContent,
// 	DrawerHeader,
// 	DrawerFooter,
// 	DrawerBody,
// 	DrawerCloseButton,
// } from "@chakra-ui/react"
import { ChangeEvent, ReactNode, useRef, useState, MouseEvent } from "react";
import { Muscle } from "./api/muscles";
import useSWR from "swr";
import Card from "../components/Card";
interface MusclesPageProps {

}

interface MuscleLayoutProps {
	data: Muscle[];
}

interface DataDisplay {
	muscle: Muscle;
	displayAnswerBox: boolean;
	isCorrectAnswer: boolean;
}

const fetcher = async (url: string) => await fetch(url).then((res) => res.json()) as Muscle[];
const MuscleLayout: React.FC<MuscleLayoutProps> = ({ data }) => {
	const [value, setValue] = useState<string>("");
	const [index, setIndex] = useState<number>(0);
	const [dataDisplay, updateDataDisplay] = useState<DataDisplay>({
		displayAnswerBox: false,
		muscle: data[0],
		isCorrectAnswer: false,
	})
	const updateAnswerElement = (correctAnswer: boolean, displayBox: boolean) => {
		updateDataDisplay(dD => {
			return { ...dD, isCorrectAnswer: correctAnswer, displayAnswerBox: displayBox, muscle: data[index] ? data[index] : {} as Muscle }
		});
	}
	const isDesktop = useBreakpointValue({ base: false, md: true });
	const handleChange = (evnt: ChangeEvent<HTMLInputElement>) => setValue(evnt.target.value)
	const onSubmit = (evnt: MouseEvent<HTMLButtonElement>) => {
		if (value === "") {
			return;
		}
		if (dataDisplay.muscle.name === value) {
			updateAnswerElement(true, true);
		} else {
			updateAnswerElement(false, true);
		}
	}
	const onContinue = () => {
		setIndex(index + 1);
		setValue("");
		setTimeout(() => {
			updateAnswerElement(false, false);
		}, 50)
	}
	if (!isDesktop) {
		console.log("mobile")
		return (
			<div>
				<Flex bg="white">
					<Center height="76vh" width="100vw">
						<Image width={651} height={1055} src={humanBody} alt="human body picture" />
					</Center>
				</Flex>
				<Box>
					<SlideFade in={!dataDisplay.displayAnswerBox} unmountOnExit>
						{/* <Card data={data[index]} value={value} onSubmit={onSubmit} handleChange={handleChange} /> */}
						<Card color="gray.800" padding={1}>
							<Box color="white">
								<Text fontSize="var(--chakra-fontSizes-4xl)" fontWeight="700" mb={2}>What muscle is {dataDisplay.muscle.number}?</Text>
								<Input rounded="3px" placeholder="Muscle Name" isRequired size={"md"} value={value} onChange={handleChange} />
								<Button onClick={onSubmit} bg={"blue.300"} marginTop={3} width="full">Submit</Button>
							</Box>
						</Card>
					</SlideFade>
					{
						dataDisplay.displayAnswerBox
							?
							<SlideFade in={dataDisplay.displayAnswerBox} unmountOnExit>
								<Card color={dataDisplay.isCorrectAnswer ? "green.400" : "red.400"} sx={{ height: "24vh", overflow: "hidden" }}>
									<Box mb={4}>
										<Text fontSize="4xl" color={dataDisplay.isCorrectAnswer ? "black" : "white"} fontWeight="700" width={"80vw"}>
											{dataDisplay.isCorrectAnswer ? "Correct Answer!" : "Incorrect Answer!"}
										</Text>
										{
											!dataDisplay.isCorrectAnswer
												?
												<chakra.p fontSize="19px">
													The correct answer is {dataDisplay.muscle.name}! <br />
													You answered {value}!
												</chakra.p>
												:
												<chakra.p fontSize="19">
													You answered correctly! Great Job!
												</chakra.p>
										}
										<Button marginTop={3} variant="solid" colorScheme="orange" onClick={onContinue} width="full">
											Continue?
										</Button>
									</Box>
								</Card>
							</SlideFade>
							:
							<> </>
					}
				</Box>
			</div>
		)
	}
	return (
		<div>
			<Flex>
				<Center height="100vh" width="75vw" bg="green.500" >
					<Text>Box 1</Text>
				</Center>
				<Center height="100vh" width="15vw" bg="green.400" flex={1} >
					<Text>Box 2</Text>
				</Center>
			</Flex>
		</div>
	)
}

const MusclesPage: React.FC<MusclesPageProps> = ({ }) => {
	const { data, error } = useSWR('/api/muscles', fetcher);
	if (error) return <Box bg="red">Error!</Box>
	if (!data) return <Text>Loading!</Text>
	return (
		<MuscleLayout data={data} />
	)
}




export default MusclesPage;