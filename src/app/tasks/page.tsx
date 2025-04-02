"use client";

import { getUserTasks } from "@/actions/tasks.action";
import { getDbUserId } from "@/actions/user.action";
import Calendar from "@/components/Calendar";
import { currentUser } from "@clerk/nextjs/server";
import TaskCard from "@/components/TaskCard";
import CreateTask from "@/components/CreateTask";
import { useEffect, useState } from "react";
import { TaskSkeleton } from "@/components/TaskSkeleton";

type Tasks = Awaited<ReturnType<typeof getUserTasks>>;
type Task = Tasks[number];

function TasksPage() {
  const [tasks, setTasks] = useState<Tasks>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await getUserTasks();
        setTasks(data);
      } catch (error) {
        console.error( "Error fetching tasks" );
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, [])

  if (isLoading) return <TaskSkeleton/>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <div className="space-y-6">
          <CreateTask />

          {tasks.map((task) => (
            <TaskCard key={task.id} task={task}/>
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <Calendar/>
      </div>
    </div>
  );
}

export default TasksPage;