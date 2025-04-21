"use server";

import { getLocalData, getScores } from "@/actions/scores.action";
import GameCard from "@/components/GameCard"

export default async function HockeyPage() {

  const data = await getLocalData();

  //getScores()

  const todaysDate = new Date( data[0].date );

  return (

    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      { data.map( (item) => (
        <div key={item.id} className="lg:col-span-6">
          <GameCard game={item} />
        </div>
      ))}
    </div>
  );
}