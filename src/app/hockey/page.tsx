"use server";

import { getLocalData, getScores } from "@/actions/scores.action";
import { populateTeams } from "@/actions/team.action";
import GameCard from "@/components/GameCard"
import Calendar from "@/components/Calendar";

export default async function HockeyPage() {

  const data = await getLocalData();

  //getScores()
  //populateTeams();

  const todaysDate = new Date( data[0].date );

  return (

    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <div className="space-y-6">
          { data.map( (item) => (
            <div key={item.id} className="lg:col-span-6">
              <GameCard game={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <Calendar/>
      </div>
    </div>
  );
}