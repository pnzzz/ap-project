"use client"
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { currentDay, currentPlayer } from "@/store/atom";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";

interface GardenProps {
  key: number;
  name: string;
  size: number;
  plants: Array<PlantProps>;
}

interface PlantProps {
  plowed: boolean;
  key: number;
  type: {
    name: string;
    growTime: number;
  } | null;
  age: number;
  health: number;
  water: number;
  sunlight: number;
  weeds: number;
  disease: boolean;
}

type Tools = "water" | "plow" | "harvest" | "plant" | "weed" | "remove";

export default function Garden() {

  //Players Name
  const player = useAtomValue(currentPlayer);
  //Current Day
  const [day, setDay] = useAtom(currentDay);
  //Weather
  const [weather, setWeather] = useState<string>("sunny");
  //Garden
  const [garden, setGarden] = useState<GardenProps>({
    key: 1,
    name: "Joshua's Garden",
    size: 49,
    plants: Array.from({ length: 49 }, (_, i) => ({
      plowed: false,
      key: i,
      type: null,
      age: 0,
      health: 100,
      water: 0,
      sunlight: 0,
      weeds: 0,
      disease: false,
      done: false,
    })),
  });
  //Selected Tool
  const tool = useState<Tools>("water");

  function handleTool(tool: Tools, index: number) {
    switch (tool) {
      case "water":
        if (!garden.plants[index].type) {
          garden.plants[index].water += 10;
        } else {
          console.log("Plant something before you water it! hahahha!");
        }
        break;
      case "plow":
        if (garden.plants[index].type) {
          console.log("You can't plow a plant, remove it first!");
        } else {
          garden.plants[index].plowed = true;
        }
        break;
      case "weed":
        if (garden.plants[index].type) {
          garden.plants[index].weeds -= 10;
        } else {
          console.log("You can't weed a plant that doesn't exist!");
        }
        break;
      case "harvest":
        if (garden.plants[index].type?.growTime === garden.plants[index].age) {
          garden.plants[index].type = null;
        } else {
          console.log("This plant isn't ready to be harvested yet!");
        }
        break;
      case "plant":
        if (garden.plants[index].type) {
          console.log("You can't plant a plant on another plant!");
        } else {
          garden.plants[index].type = {
            name: "Carrot",
            growTime: 10,
          };
        }
        break;
      case "remove":
        if (!garden.plants[index].type) {
          console.log("There's nothing to remove here!");
        } else {
          garden.plants[index].type = null;
        }
        break;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <header className="grid grid-cols-3 w-full items-center">
        <div/>
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center">{player}'s Garden</h1>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setDay(day + 1)}>Next Day</Button>
        </div>
      </header>
      <div className="flex flex-row justify-between items-center w-full px-4">
        <div className="flex flex-col gap-2 border p-2 rounded-xl">
          <h1>INFO</h1>
          <div className="flex flex-col gap-2">
              <div className="w-24 h-24 border-gray-800">
                Day: {day}
              </div>
              <div className="w-24 h-24 border-gray-800">
                Soil PH: 7
              </div>
              <div className="w-24 h-24 border-gray-800">
                Weather: {weather}
              </div>
          </div>
        </div>
        <div className="flex rounded-xl overflow-hidden h-fit">
          <div className="grid grid-cols-7">
            {garden.plants.map((plant, i) => (
              <div key={i} className="w-24 h-24 bg-orange-700/40 cursor-pointer border border-black items-center justify-center flex hover:bg-orange-700">
                {plant.type ? <p>plant.type</p> : <p>'none'</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border p-2 rounded-xl">
          <h1>ITEMS</h1>
          <div className="flex flex-col gap-2">
            <ToggleGroup type="single" className="flex flex-col gap-2">
              {tools.map((tool, i) => (
                <ToggleGroupItem key={i} value={i.toString()} className="w-24 h-24 border border-gray-800" >
                  <div className="" title={tool.name}>
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

const tools = [
  {
    name: "Water",
    icon: "💧",
  },
  {
    name: "Plow",
    icon: "🪶",
  },
  {
    name: "Harvest",
    icon: "🌾",
  },
  {
    name: "Plant",
    icon: "🌱",
  },
  {
    name: "Weed",
    icon: "🌿",
  },
  {
    name: "Remove",
    icon: "❌",
  },
];