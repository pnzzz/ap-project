'use client'

import { useSetAtom } from "jotai";
import { showImagesAtom } from "@/store/atom";

export default function Footer() {
	const showImages = useSetAtom(showImagesAtom);
	return (
		<footer className="text-center text-white text-[10px] cursor-pointer">
			<p onClick={() => showImages((prev) => !prev)}>made by zak heltke</p>
		</footer>
	);
}