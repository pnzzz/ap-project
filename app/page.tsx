import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Game</h1>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Link href="/garden">
          <Button className="btn">
            New Game
          </Button>
        </Link>
        <Button className="btn">
          Leaderboard
        </Button>
      </div>
    </main>
  );
}
