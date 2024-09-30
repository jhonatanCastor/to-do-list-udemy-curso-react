'use client'
import { api } from "@/app/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { FiCheckSquare, FiFile } from "react-icons/fi";

interface TaskProps {
  id: string;
  name: string;
  description: string;
  status: string;
}

const ListComponentTasks = () => {
  const [task, setTask] = useState<TaskProps[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    getTasks();
  }, []);
  
  async function getTasks() {
    const response = await api.get("/api/task");

    if(!response.data) {
      NextResponse.json({mesage: "Task not found"})
    }
    
    setTask(response.data);
  };

  async function deletedTask(id: string) {
    await api.delete("/api/task", {
      params: {
        id
      }
    });

    router.refresh();
  }

  function changeColorStatus(status: string): string {
    const statusColorMap: Record<string, string> = {
      PENDING: 'bg-yellow-600',
      DONE: 'bg-green-600',
      CLOSE: 'bg-red-600',
      DOING: 'bg-blue-600',
      REVIEW: 'bg-pink-600'
    };
  
    return statusColorMap[status] || 'bg-yellow-600'; 
  }
  
  return (
    <div className="">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-semibold mb-4">Tarefas do dia</h1>
        
        <div className={task && task?.length > 3 ? "flex gap-4 flex-wrap" : "flex gap-4 flex-col md:flex-row"}>

          {Array.isArray(task) && task?.map((data) => (
            <div key={data.id} className="flex p-2 flex-col bg-gray-200 border border-gray-400 w-full rounded">
              <div className="flex items-center justify-between  gap-2">
                <h2 className={`${changeColorStatus(data.status)} py-1 px-4 rounded font-semibold text-white`}>{data.status}</h2>

                <div className="flex items-center gap-2">
                  <button>
                    <FiCheckSquare size={24} color='#44ef7d'/>
                  </button>

                  <Link href={`/${data.id}/update`}>
                    <FiFile size={24} color='#3b82f6'/>
                  </Link>

                </div>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="text-lg text-black"><span className="font-bold text-black">Task:</span> {data.name}</h2>
              </div>
    
              <h2 className="text-lg my-2 text-black"><span className="font-bold text-black">Criada em:</span> 12/03/24</h2>

              <div className="">
                <p className="text-lg text-black font-bold">Descrição</p>
                <p className="text-black">{data.description}</p>
              </div>

              <div className="flex justify-end mt-2">
                <button onClick={() => deletedTask(data.id)} className="font-semibold py-1 px-4 bg-red-600 w-20 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default ListComponentTasks;