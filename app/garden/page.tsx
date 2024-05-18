"use client";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { currentDay, currentPlayer, sIsTransitionVisible } from "@/store/atom";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Interfaces
interface GardenProps {
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
type Tools = "water" | "plow" | "harvest" | "plant" | "weed";
type Weather = "sunny" | "rainy" | "cloudy" | "snowy";

// Constants
const initialWeather: Weather = "sunny";
const plantTypes: PlantType[] = [
  { name: "Carrot", growTime: 10, icon: "🥕" },
];
const tools = [
  { name: "plow", icon: "⛏️" },
  { name: "plant", icon: "🌱" },
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
  const [score, setScore] = useState<number>(0);
  const player = useAtomValue(currentPlayer);
  const [day, setDay] = useAtom(currentDay);
  const [tool, setTool] = useState<Tools>("plow");
  const [dead, setDead] = useState<number>(0);
  const [weather, setWeather] = useState<Weather>(getRandomWeather());
  const [garden, setGarden] = useState<GardenProps>({
    key: 1,
    size: 49,
    plants: Array.from({ length: 49 }, (_, i) => ({
      plowed: false,
      key: i,
      type: null,
      age: 0,
      health: 100,
      water: 50,
      sunlight: 5,
      weeds: 0,
      disease: false,
    })),
  });
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
		else if (day === 15) router.push("/end")
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

        if (plant.water <= 10 || plant.water > 90 || plant.weeds > 5 || plant.health <= 0) {
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
            plant.type = null;
            setScore((score) => score + .5);
          } else toast.error("This plant isn't ready to be harvested yet!");
          break;
        case "plant":
          if (!plant.plowed) toast.error("You can't plant on unplowed soil!");
					else if (plant.type) toast.error("You can't plant on soil that's already planted!");
          else plant.type = { name: "Carrot", growTime: 10, icon: "🥕" };
          break;
      }

      newGarden.plants[index] = plant;
      return newGarden;
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4" >
			<TransitionScreen day={day} isVisible={isTransitionVisible} dead={dead} weather={weather} />
      <header className="grid grid-cols-3 w-full items-center">
        <div className="text-start">
					<h1 className="text-3xl font-bold">Score: {score}</h1>
				</div>
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center">{player}'s Garden</h1>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleNextDay}>Next Day</Button>
        </div>
      </header>
      <div className="flex flex-row justify-between items-center w-full px-4 text-center">
        <div className="flex flex-col gap-2 border p-2 rounded-xl font-bold">
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
        <div className="flex rounded-xl overflow-hidden h-fit">
          <div className="grid grid-cols-7">
            {garden.plants.map((plant, i) => (
              <div onClick={() => handleTool(tool, i)} key={i} className={`${(plant.water > 90) ? "bg-blue-900/15" : (plant.water >= 60) ? "bg-orange-700/30" : (plant.water >= 30) ? "bg-orange-700/40" : plant.plowed ? "bg-orange-900/80" : "bg-orange-800"} ${plant.plowed ? "opacity-75" : "opacity-100"} w-24 h-24 cursor-pointer border border-black items-center justify-center flex text-xs text-center`}>
                {plant.type ? 
								<div className="flex flex-col gap-2 text-center justify-center text-[10px] select-none">
									<p className="text-3xl">{plant.type.icon}</p>
									<p>{plant.type.name}</p>
								</div>
								: <div></div>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border p-2 rounded-xl text-center">
          <h1 className="font-bold">ITEMS</h1>
          <div className="flex flex-col gap-2">
            <ToggleGroup type="single" className="flex flex-col" value={tool} onValueChange={(value: Tools) => setTool(value)}>
              {tools.map((tool, i) => (
                <ToggleGroupItem key={i} value={tool.name} title={tool.name} className="w-24 h-24 border border-gray-800">
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

