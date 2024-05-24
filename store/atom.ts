import { GardenProps, Tools, Weather } from "@/app/garden/page";
import { atom } from "jotai";

export const music = atom<boolean>(true);

export const showImagesAtom = atom<boolean>(true);

export const scoreAtom = atom<number>(0);

export const currentPlayer = atom<string>("Joshua");

export const leaderboard = atom<object[]>([]);

export const time = atom<number>(0);

export const currentDay = atom<number>(0);

export const sIsTransitionVisible = atom<boolean>(true);

export const weatherAtom = atom<Weather>("sunny");
export const toolAtom = atom<Tools>("plow");

export const gardenAtom = atom<GardenProps>({
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