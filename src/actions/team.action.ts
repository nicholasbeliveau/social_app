"use server";

import prisma from "@/lib/prisma";


export async function createTeam( city: string, name: string, username:string ) {

  const team = await prisma.team.create({
    data: {
      city,
      name,
      username,
    },
  });
}