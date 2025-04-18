"use server";

import { getLocalData, getScores } from "@/actions/scores.action";
import GameCard from "@/components/GameCard"

export default async function HockeyPage() {

  const data = await getLocalData();

  //getScores()
  console.log( data );
  const date = new Date( data[0].date );
  return (

    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      { data.map( (item) => (
        <div className="lg:col-span-6">
          <GameCard key={item.id} game={item} />
        </div>
      ))}
    </div>

  );
}