"use client";

import { Task } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { toggleComplete } from "@/actions/tasks.action";

function TaskCard( { task }: { task: Task }) {

  const [ isCompleting, setIsCompleteing ] = useState( false );
  const [ isCompleted, setIsCompleted ] = useState( false );

  const handleComplete = async () => {
    if ( isCompleting ) return;
    try {
      setIsCompleteing( true );
      setIsCompleted((prev) => !prev );
      toggleComplete( task.id );

    } catch (error) {

    } finally {
      setIsCompleteing( false );
    }
  }

  return (
    <Card className="overflow-hidden" onClick={handleComplete}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-row">
          <div>
            <Checkbox id={task.id} className="" />
          </div>
          <div className="ml-4">
            {task.content}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default TaskCard;