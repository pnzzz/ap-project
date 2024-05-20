"use client";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { currentDay, currentPlayer, gardenAtom, sIsTransitionVisible, showImagesAtom, toolAtom, weatherAtom } from "@/store/atom";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Snowfall } from "react-snowfall";
import { toast } from "sonner";

// Interfaces
export interface GardenProps {
  key: number;
  size: number;
  plants: Array<PlantProps>;
}

interface PlantProps {
  plowed: boolean;
  key: number;
  type: PlantType | null;
  age: number;
  health: number;
  water: number;
  sunlight: number;
  weeds: number;
  disease: boolean;
}

interface PlantType {
  name: string;
  growTime: number;
  icon: string;
}

// Types
export type Tools = "water" | "plow" | "harvest" | "carrot" | "corn" | "weed";
export type Weather = "sunny" | "rainy" | "cloudy" | "snowy";

// Constants
const initialWeather: Weather = "sunny";
const plantTypes: PlantType[] = [
  { name: "Carrot", growTime: 10, icon: "🥕" },
	{ name: "Corn", growTime: 15, icon: "🌽" },
];
const tools = [
  { name: "plow", icon: "⛏️" },
  { name: "carrot", icon: "🥕" },
	{ name: "corn", icon: "🌽" },
  { name: "water", icon: "💧" },
  { name: "weed", icon: "🌿" },
  { name: "harvest", icon: "🌾" },
];
const weathers = [
  { name: "sunny", chance: 0.6, icon: "☀️" },
  { name: "rainy", chance: 0.15, icon: "🌧️" },
  { name: "cloudy", chance: 0.15, icon: "☁️" },
  { name: "snowy", chance: 0.05, icon: "❄️" },
];

const getRandomWeather = () => {
  const random = Math.random();
  let cumulativeChance = 0;
  for (const weather of weathers) {
    cumulativeChance += weather.chance;
    if (random < cumulativeChance) {
      return weather.name as Weather;
    }
  }
  return weathers[0].name as Weather; // Default fallback
};

// Main Garden Component
export default function Garden() {
  // Hooks
	const router = useRouter();
	const showImages = useAtomValue(showImagesAtom);
  const [score, setScore] = useState<number>(0);
  const player = useAtomValue(currentPlayer);
  const [day, setDay] = useAtom(currentDay);
  const [tool, setTool] = useAtom(toolAtom);
  const [dead, setDead] = useState<number>(0);
  const [weather, setWeather] = useAtom(weatherAtom);
  const [garden, setGarden] = useAtom(gardenAtom);
  const [isTransitionVisible, setIsTransitionVisible] = useAtom(sIsTransitionVisible);

  // Intro Transition
  useEffect(() => {
    if (day === 0) {
      setTimeout(dayChange, 2000);
			console.log('day changed');
      setTimeout(() => setIsTransitionVisible(false), 4000);
    }
  }, [day]);

  // Handle Next Day
  const handleNextDay = () => {
    setIsTransitionVisible(true);
    setDead(0);
    setTimeout(dayChange, 2000);
    setTimeout(() => setIsTransitionVisible(false), 4000);
  };

  // Day Change Function
  const dayChange = () => {
		if (day === 0) setDay(1);
		else if (day === 100) router.push("/end")
		else setDay((prevDay) => prevDay + 1);
    setWeather(getRandomWeather());
    setGarden((prevGarden) => processGarden(prevGarden));
  };

  // Process Garden
  const processGarden = (garden: GardenProps) => {
    let newDead = 0;
    const newPlants = garden.plants.map((plant) => {
      if (plant.type) {
				if (weather === "snowy") {
          if (Math.random() > 0.5) {
            newDead++;
            return { ...plant, type: null, plowed: false, weeds: 0, health: 100, age: 0 };
          }
        }
        if (weather === "rainy") plant.water += 10;
        if (weather === "sunny") plant.water -= 10;
					
        if (plant.water <= 10 || plant.water > 90 || plant.weeds > 5 || plant.health <= 0 || plant.age + 1 > plant.type.growTime) {
          newDead++;
          return { ...plant, type: null, plowed: false, weeds: 0, health: 100, age: 0 };
        }
        return { ...plant, age: plant.age + 1, weeds: plant.weeds + 1 };
      }
      return plant;
    });
    setDead(newDead);
    return { ...garden, plants: newPlants };
  };

  // Handle Tool
  const handleTool = (tool: Tools, index: number) => {
    setGarden((prevGarden) => {
      const newGarden = { ...prevGarden, plants: [...prevGarden.plants] };
      const plant = { ...newGarden.plants[index] };

      switch (tool) {
        case "water":
          plant.water += 10;
          break;
        case "plow":
          if (plant.type) {
            plant.health -= 50;
            if (plant.health <= 0) {
              plant.type = null;
              plant.plowed = false;
              plant.weeds = 0;
              plant.health = 100;
              plant.age = 0;
            }
          } else {
            plant.plowed = true;
          }
          break;
        case "weed":
          if (plant.type && plant.weeds > 0) plant.weeds -= 1;
          else toast.error("You can't weed a plant that doesn't exist!");
          break;
        case "harvest":
          if (plant.type?.growTime === plant.age) {
						if (plant.type.name === "carrot") {
							setScore((score) => score + 1);
							
						}
						if (plant.type.name === "corn") {
							setScore((score) => score + 3);
						}
						plant.type = null;
						plant.plowed = false;
						plant.weeds = 0;
						plant.health = 100;
						plant.age = 0;
          } else toast.error("This plant isn't ready to be harvested yet!");
          break;
        case "carrot":
          if (!plant.plowed) toast.error("You can't plant on unplowed soil!");
					else if (plant.type) toast.error("You can't plant on soil that's already planted!");
          else plant.type = { name: "carrot", growTime: 1, icon: "🥕" };
          break;
				case "corn":
					if (!plant.plowed) toast.error("You can't plant on unplowed soil!");
					else if (plant.type) toast.error("You can't plant on soil that's already planted!");
					else plant.type = { name: "corn", growTime: 1, icon: "🌽" };
					break;
      }

      newGarden.plants[index] = plant;
      return newGarden;
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4" >
			<TransitionScreen day={day} isVisible={isTransitionVisible} dead={dead} weather={weather} />
			{showImages && <Sunny weather={weather} />}
			{weather === "snowy" && <Snowfall />}
      <header className="grid grid-cols-3 w-full items-center bg-background/90 p-2 rounded-xl max-sm:mb-2">
        <div className="text-start">
					<h1 className="text-3xl font-bold max-md:text-lg">Score: {score}</h1>
				</div>
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center max-md:hidden">{player}&apos;s Garden</h1>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleNextDay}>Next Day</Button>
        </div>
      </header>
      <div className="flex flex-row max-lg:flex-col max-lg:gap-3 justify-between items-center w-full px-4 text-center">
        <div className="flex flex-col gap-2 border p-2 rounded-xl font-bold bg-background/90">
          <h1>INFO</h1>
          <div className="flex flex-col gap-4">
              <div className=" border-gray-800">
                Day: {day}
              </div>
              <div className=" border-gray-800">
                {weathers.find(w => w.name === weather)?.icon} {weather}
              </div>
          </div>
        </div>
        <div className="flex rounded-xl overflow-hidden h-fit bg-background/90">
          <div className="grid grid-cols-7">
            {garden.plants.map((plant, i) => (
              <div onClick={() => handleTool(tool, i)} key={i} className={`${(plant.water > 90) ? "bg-blue-900/15" : (plant.water >= 60) ? "bg-orange-700/30" : (plant.water >= 30) ? "bg-orange-700/40" : plant.plowed ? "bg-orange-900/80" : "bg-orange-800"} ${plant.plowed ? "opacity-75" : "opacity-100"} max-sm:w-12 max-sm:h-12 max-md:w-16 max-md:h-16 w-24 h-24 cursor-pointer border border-black items-center justify-center flex text-xs text-center`}>
                {plant.type ? 
								<div className="flex flex-col gap-2 max-md:gap-0 text-center justify-center select-none">
								{plant.age >= plant.type.growTime ? <p className="text-3xl max-sm:text-[11px]">{plant.type.icon}</p> : <p className="text-3xl max-sm:text-[11px]">🌱</p>}
									<p className="max-sm:hidden">{plant.type.name}</p>
									{plant.weeds > 0 ? <p className="text-red-500 max-sm:text-[8px]">🌿 {plant.weeds}</p> : <p className="max-sm:text-[8px]">🌿 0</p>}
								</div>
								: <div/>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border p-2 rounded-xl text-center bg-background/90">
          <h1 className="font-bold max-sm:">ITEMS</h1>
          <div className="flex flex-col gap-2">
            <ToggleGroup type="single" className="flex flex-col max-lg:flex-row overflow-scroll" value={tool} onValueChange={(value: Tools) => setTool(value)}>
              {tools.map((tool, i) => (
                <ToggleGroupItem key={i} value={tool.name} title={tool.name} className="max-sm:w-12 max-sm:h-12 max-md:w-16 max-md:h-16 w-24 h-24 border">
                  <div className="text-2xl">
                    {tool.icon}
                  </div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
      </div>
    </main>
  );
}

const TransitionScreen = ({ day, isVisible, dead, weather }: { day: number, isVisible: boolean, dead: number, weather: string }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-background transition-opacity z-50 duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
			<div className="flex flex flex-col items-center justify-center gap-4">
      	<h1 className="text-4xl font-bold">Day {day}</h1>
				<h2 className="transition-all">Plants Died: {dead}</h2>
				<h2 className="transition-all">Weather: {weather}</h2>
			</div>
    </div>
  );
};

const Sunny = ({weather}: { weather: string }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-background transition-opacity -z-10 duration-1000">
			{weather === "sunny" && <Image alt="bg" src="/sunny.webp" layout="fill" objectFit="cover" />}
			{weather === "rainy" && <Image alt="bg" src="/rainy.webp" layout="fill" objectFit="cover" />}
			{weather === "cloudy" && <Image alt="bg" src="/cloudy.webp" layout="fill" objectFit="cover" />}
			{weather === "snowy" && <Image alt="bg" src="/snowy.webp" layout="fill" objectFit="cover" />}
		</div>
	);
};

