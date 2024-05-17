import { atom } from "jotai";

export const currentPlayer = atom<string>("Joshua");

export const leaderboard = atom<object[]>([]);

export const time = atom<number>(0);

export const currentDay = atom<number>(1);