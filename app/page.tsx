'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { currentDay, sIsTransitionVisible } from "@/store/atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";

export default function Home() {
	const setIsTransitionVisibl = useSetAtom(sIsTransitionVisible);
  const day = useAtomValue(currentDay);
	return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Game</h1>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Link href="/garden">
					{day > 0 ? <Button size="lg">Continue Game</Button> :
          <Button size="lg" onClick={() => setIsTransitionVisibl(true)}>
            New Game
          </Button>
					}
        </Link>
				<Dialog>
					<DialogTrigger>
						<Button size="lg">
							How To Play
						</Button>
					</DialogTrigger>
					<DialogContent className="w-full max-w-[800px] h-full max-h-[700px] overflow-scroll">
						<DialogTitle>How To Play</DialogTitle>
						<DialogDescription>You are a Farmer. Plant and Harvest Crops to Earn Points.</DialogDescription>
						<h1 className="text-lg font-semibold mt-4">Starting Off</h1>
							<div className="flex flex-col gap-4 text-xs rounded-xl p-2 border">
								<div className="flex flex-row justify-between items-center">
									<div>Dirt is already watered on Day 1.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Make sure to water plants 2-3 times per day - do not over water them. Do not water plants if raining.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Plants grow weeds daily - don't worry about overweeding them.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Plants that die earn no points.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Weather changes daily - see below chances.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div>Seeds will turn into plant 1-3 days before or after plant is ready to harvest - Remember the day you planted it!</div>
								</div>
							</div>
							<h1 className="text-lg font-semibold mt-4">Tools</h1>
							<div className="flex flex-col gap-4 text-xs rounded-xl p-2 border">
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">⛏️</div>
									<div>Plows Soil to Plant or Kills Plant</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🌱</div>
									<div>Plants a Seed</div>
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
									<div>60% - Sunshine increases plants sunlight.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">🌧️</div>
									<div>20% - Rain waters all plants, including dirt.</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="text-2xl">☁️</div>
									<div>15% - Clouds decrease plants sunlight.</div>
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
									<div>Time to Grow - 10 Days | 1 Point</div>
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
