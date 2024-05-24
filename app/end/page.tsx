'use client'

import { Button } from "@/components/ui/button";
import { currentDay, scoreAtom } from "@/store/atom";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

export default function End() {
  //score 
  const score = useAtomValue(scoreAtom);
  //day
  const day = useAtomValue(currentDay);
  //router function
  const router = useRouter();
  //cant access if game isnt finished
  if (day != 100) return router.push("/")
  return(
    <div className="text-center my-3 flex flex-col justify-between min-h-screen">
      <h1 className="text-2xl">Congrats!</h1>
      <div className="flex flex-col gap-4">
        <p>The farming season is over and your work was diligent.</p>
        <p className="text-blue-500">Your Score Was: {score}</p>
        <p>Thanks for Playing my Game.</p>
      </div>
      <div>
        <Button onClick={() => window.location.reload()}>Play Again</Button>
      </div>
    </div>
  )
}