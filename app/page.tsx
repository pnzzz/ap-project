'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { currentDay, currentPlayer, sIsTransitionVisible } from "@/store/atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	//day transition variable
	const setIsTransitionVisibl = useSetAtom(sIsTransitionVisible);
	//player name
	const [playername, setPlayerName] = useAtom(currentPlayer);
	//current day
  const day = useAtomValue(currentDay);
	//start game function
	const startGame = () => {
		// set transition true
		setIsTransitionVisibl(true)
	}
	return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-background -z-10 opacity-75">
				<Image alt="bg" src="/sunny.webp" layout="fill" objectFit="cover" />
			</div>
			<div className="px-5 py-3 rounded-xl bg-background/50 flex flex-col justify-center text-center gap-2">
				<h1 className="text-4xl font-bold ">Gardane</h1>
				<p>The Mundane Garden Game</p>
			</div>
      <div className="flex flex-col gap-4 justify-center items-center">
					{day > 0 ? <Button asChild size="lg"><Link href="/garden">Continue Game</Link></Button> :
          <Dialog>
					<DialogTrigger asChild>
						<Button size="lg">
							New Game
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Enter Your Name</DialogTitle>
						<div className="flex flex-col gap-2 w-full">
							<Input value={playername} onChange={(e) => setPlayerName(e.target.value)} placeholder="Your Name" />
								<Button asChild className="w-full" onClick={startGame} size="lg">
									<Link href="/garden">
										Play!
									</Link>
								</Button>
						</div>
					</DialogContent>
				</Dialog>
					}
				<Dialog>
					<DialogTrigger asChild>
						<Button size="lg">
							How To Play
						</Button>
					</DialogTrigger>
					<DialogContent className="w-full max-w-[800px] h-full max-h-[700px] overflow-scroll">
						<DialogTitle>How To Play</DialogTitle>
						<DialogDescription>Welcome to Gardane! You are a Farmer. Plant and Harvest Crops to Earn Points.</DialogDescription>
						<h1 className="text-lg font-semibold mt-4">Updates!</h1>
							<div className="flex flex-col gap-4 text-xs rounded-xl p-2 border">
								<div className="flex flex-row justify-between items-center">
									<div>You can now drag across the plot! (A bit buggy, be careful.)</div>
								</div>
							</div>
						<h1 className="text-lg font-semibold mt-4">Starting Off</h1>
							<div className="flex flex-col gap-4 text-xs rounded-xl p-2 border">
								<div className="flex flex-row justify-between items-center">
									<div>Dirt is already watered on Day 1.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Make sure to water plants 1-3 times per day - do not over water them. Do not water plants if raining.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Plants grow weeds daily - don&apos;t worry about overweeding them.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Plants that die earn no points.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Weather changes daily - see below chances.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Seeds will turn into plant when it is ready to harvest! - If you do not harvest the plant , it will wilt.</div>
								</div>
							</div>
							<h1 className="text-lg font-semibold mt-4">Tools</h1>
							<div className="flex flex-col gap-4 text-xs rounded-xl p-2 border">
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">⛏️</div>
									<div>Plows Soil to Plant or Kills Plant</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🥕</div>
									<div>Plants a Carrot</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🌽</div>
									<div>Plants a Corn</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">💧</div>
									<div>Waters the Plant</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🌿</div>
									<div>Weeds the Plant</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🌾</div>
									<div>Harvests the Plant</div>
								</div>
							</div>
							<h1 className="text-lg font-semibold mt-4">Weather</h1>
							<div className="flex flex-col gap-4 text-xs rounded-xl p-2 border">
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">☀️</div>
									<div>60% - Sunshine decreases water level.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🌧️</div>
									<div>20% - Rain waters all plants.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">☁️</div>
									<div>15% - Clouds keep the water level the same.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">❄️</div>
									<div>5% - Frost has 50% chance to kill a plant.</div>
								</div>
							</div>
							<h1 className="text-lg font-semibold mt-4">Plants</h1>
							<div className="flex flex-col gap-4 text-xs rounded-xl p-2 border">
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🥕</div>
									<div>Time to Grow - 10 Days | 100 Points</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🌽</div>
									<div>Time to Grow - 20 Days | 300 Points</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🌶️</div>
									<div>Time to Grow - 30 Days | 500 Points</div>
								</div>
							</div>
							<h1 className="text-lg font-semibold mt-4">End Game</h1>
							<div className="flex flex-col gap-4 text-xs rounded-xl p-2 border">
								<div className="flex flex-row justify-between items-center">
									<div>Refresh to End Game - You can skip between pages, just not refresh.</div>
								</div>
							</div>
					</DialogContent>
				</Dialog>
      </div>
    </main>
  );
}
