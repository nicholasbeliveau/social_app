"use server";

import prisma from "@/lib/prisma";
import path from "path";
import fsPromises from 'fs/promises';
import { Team } from "@/types/types";

export async function createTeam( city: string, 
                                  name: string, 
                                  username:string,
                                  image: string ) {

  const result = await prisma.team.create({
    data: {
      city,
      name,
      username,
      image
    },
  });
}

export async function populateTeams() {

  const filePath = path.join(process.cwd(), 'test_data/teams/NHL.json');

  const jsonData = await fsPromises.readFile( filePath );

  const objectData = <Team[]>JSON.parse( jsonData.toString() );

  try{
    objectData.forEach( (team) => {
      console.log( team )
      //createTeam( team.city, team.name, team.username )
    });
  } catch (error) {
    console.log( error );
  }
}