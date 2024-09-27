'use client'
import { api } from "@/app/lib/api";
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
  const [task, setTask] = useState<TaskProps[] | null>([]);
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
  
  return (
    <div className="">
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold mb-4">Tarefas do dia</h1>
        
        <div className="flex gap-4 flex-col md:flex-row">

          {task?.map((data) => (
            <div key={data.id} className="flex p-3 flex-col bg-gray-200 border border-gray-400 w-[450px] rounded">
              <div className="flex items-center justify-between  gap-2">
                <h2 className="bg-yellow-600  px-4 rounded font-semibold text-white">{data.status}</h2>

                <div className="flex items-center gap-2">
                  <button>
                    <FiCheckSquare size={24} color='#44ef7d'/>
                  </button>

                  <button>
                    <FiFile size={24} color='#3b82f6'/>
                  </button>

                </div>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="text-lg text-black"><span className="font-bold text-black">Task:</span> {data.name}</h2>
              </div>
    
              <h2 className="text-lg my-2 text-black"><span className="font-bold text-black">Criada em:</span> 12/03/24</h2>

              <div className="">
                <p className="text-lg text-black font-bold">Descrição</p>
                <p className="text-lg text-black">{data.description}</p>
              </div>

              <div className="flex justify-end">
                <button onClick={() => deletedTask(data.id)} className="font-semibold py-1 px-4 bg-red-600 w-20 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))
            
          }

        </div>

      </div>
    </div>
  )
}

export default ListComponentTasks;