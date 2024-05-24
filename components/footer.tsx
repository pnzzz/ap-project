'use client'

import { useSetAtom } from "jotai";
import { showImagesAtom } from "@/store/atom";
import BackgroundMusic from "./music";

export default function Footer() {
	const showImages = useSetAtom(showImagesAtom);
	return (
		<footer className="text-center text-white text-[10px] cursor-pointer flex flex-row gap-2 justify-center">
			<p onClick={() => showImages((prev) => !prev)}>made by zak heltke</p>
			<BackgroundMusic />
		</footer>
	);
}