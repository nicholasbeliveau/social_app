import { getUserTasks } from "@/actions/tasks.action";
import { getDbUserId } from "@/actions/user.action";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
import TaskCard from "@/components/TaskCard";
import CreateTask from "@/components/CreateTask";

export default async function TasksPage() {
  const user = await currentUser();
  const dbUserId = await getDbUserId();
  const tasks = await getUserTasks();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <div className="space-y-6">
          {user ? <CreateTask /> : null}

          {tasks.map((task) => (
            <TaskCard key={task.id} task={task}/>
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}