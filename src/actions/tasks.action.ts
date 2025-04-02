"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function getUserTasks() {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    const tasks = await prisma.task.findMany({
      where: {
        authorId: userId
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return tasks;

  } catch (error) {
    throw new Error("Failed to get tasks")
  }
}

export async function createTask( content: string ) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    const task = await prisma.task.create({
      data: {
        content,
        authorId: userId,
      },
    });

    revalidatePath("/tasks");
    return { success: true, task };
  } catch (error) {
    console.error( "Failed to create Task: ", error);
    return { success: false, error: "Failed to create task" };
  }
}

export async function toggleComplete( taskId: string ) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) throw new Error( "Task not found" );

    const updateTask = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        completed: !task.completed
      }
    }) 

    if (!updateTask) throw new Error( "Erorr completing task" );

    revalidatePath("/tasks");
    return { success: true };
  } catch ( error ) {
    console.error( "Failed to toggle complete on task.", error );
    return { success: false, error: "Failed to toggle complete on task."};
  }
}