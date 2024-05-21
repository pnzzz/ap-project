'use client'

import { Button } from "@/components/ui/button";
import { currentDay, scoreAtom } from "@/store/atom";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

export default function End() {
  const score = useAtomValue(scoreAtom);
  const day = useAtomValue(currentDay);
  const router = useRouter();
  if (day != 100) return router.push("/")
  return(
    <div className="text-center my-3 flex flex-col justify-between min-h-screen">
      <h1 className="text-2xl">Congrats!</h1>
      <div className="flex flex-col gap-4">
        <p>The farming season is over and your work was diligent.</p>
        <p className="text-blue-500">Your Score Was: </p>
        <p>Thanks for Playing my Game.</p>
      </div>
      <div>
        <Button onClick={() => window.location.reload()}>Play Again</Button>
      </div>
    </div>
  )
}