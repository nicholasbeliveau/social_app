"use client";

import { Game } from "@/types/types";
import { Card, CardContent } from "./ui/card";

function GameCard( { game }: { game: Game } ) {

  const iconSize = 40;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-6 gap-2 p-2">
          <div className="col-span-1 pl-4">
            <img className="place-content-center" src={ game.teams.home.logo} width={iconSize} height={iconSize} />
          </div>
          <div className="col-span-1">
            <p className="inline-block align-middle">Home: </p> 
          </div>
          <div className="col-span-3">
            <p className="inline-block align-middle"> { game.teams.home.name } </p>
          </div>
          <div className="col-span-1">
            <p className="inline-block align-middle"> { game.scores.home } </p>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 p-2">
          <div className="col-span-1 pl-4">
            <img className="place-content-center" src={ game.teams.away.logo} width={iconSize} height={iconSize} />
          </div>
          <div className="col-span-1">
            <p className="inline-block align-middle">Away: </p> 
          </div>
          <div className="col-span-3">
            <p className="inline-block align-middle"> { game.teams.away.name } </p>
          </div>
          <div className="col-span-1">
            <p className="inline-block align-middle"> { game.scores.away } </p>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default GameCard;

/**
 *      <div className="flex flex-row p-2">
          <div className="pr-4">
            <img className="" src={ game.teams.home.logo} width={iconSize} height={iconSize} />
          </div>
          <p>Home: { game.teams.home.name } </p>
        </div>
        <div className="flex flex-row p-2">
          <div className="pr-4">
            <img src={ game.teams.away.logo} width={iconSize} height={iconSize} />
          </div>
          <p>Away:  { game.teams.away.name } </p>
        </div>
 */