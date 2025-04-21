"use server";

import axios from "axios"
import { writeFile } from "fs";
import path from "path";
import { env } from "process";
import fsPromises from 'fs/promises';
import { Game } from "@/types/types";

const date = "20231011";

var config = {
  method: 'get',
  url: 'https://v1.hockey.api-sports.io/games?league=57&season=2023',
  headers: {
    'x-rapidapi-key': env.SPORTS_API_KEY,
    'x-rapidapi-host': 'v1.hockey.api-sports.io'
  }
};

export async function getScores() {

  console.log( "getScores" );
  axios( config )
    .then( function ( response ) {
      console.log( JSON.stringify( response.data ) );
      writeFile( "test.json", JSON.stringify( response.data ), (err) => {
        if (err) throw err;
      });
    })
    .catch( function (error) {
      console.log( error );
    });

}

export async function getLocalData() {

  //Get the path of json file
  const filePath = path.join(process.cwd(), 'test_data/games/' + date + '.json');

  // Read the JSON file
  const jsonData = await fsPromises.readFile( filePath );

  //Parse data as JSON
  const objectData = JSON.parse( jsonData.toString() );

  //console.log( objectData );
  return <Game[]>objectData.response;
}