'use client'

import { api } from "@/app/lib/api";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  description: z.string().min(1, "O campo descrição é obrigatório"),
  status: z.string().min(1, "O campo status é obrigatório")
});

type FormData = z.infer<typeof schema>;

interface Props {
  id?: string; 
  name: string;
  description: string;
  status: string;
}

export const ServicesTask = ({ taskValue }: { taskValue?: Props }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (taskValue) {
      setValue('name', taskValue.name);
      setValue('description', taskValue.description);
      setValue('status', taskValue.status);
    }
  }, [taskValue, setValue]);

  
  async function handleUpdateTask(data: FormData) {

    console.log('data updated task', data);
    
    if (!taskValue?.id) return; 
    setLoading(true);


    try {
      await api.put(`/api/task?id=${taskValue.id}`, {
        name: data.name,
        description: data.description,
        status: data.status
      });

      router.refresh();
      router.replace("/home");
    } catch (error) {
      console.error("Failed to update task", error);
    } finally {
      setLoading(false); 
    }
  }

  async function handleRegisterTask(data: FormData) {
    setLoading(true); 
    try {
      await api.post("/api/task", {
        name: data.name,
        description: data.description,
        status: data.status,
      });

      router.refresh();
      router.replace("/home");
    } catch (error) {
      console.error("Failed to create task", error);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold">{taskValue ? 'Editar' : 'Criar nova'} tarefa</h1>

      <form 
        onSubmit={handleSubmit(taskValue ? handleUpdateTask : handleRegisterTask)} 
        className="flex flex-col w-full mt-6"
      >
        <label htmlFor="" className="font-medium ml-1">Nome</label>
        <input 
          className="bg-gray-200 py-1 pl-1 h-11 rounded" 
          {...register("name")}
          type="text" 
          placeholder="Digite o nome da tarefa"
        />

        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      
        <label htmlFor="" className="font-medium ml-1 mt-4">Status</label>
        <input 
          className="bg-gray-200 py-1 pl-1 h-11 rounded mb-4"  
          type="text" 
          {...register("status")} 
          placeholder="Digite o status da tarefa" 
        />

        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
          
        <label htmlFor="" className="mb-1 font-medium ml-1 text-lg">Descrição</label>
        <textarea
          className="w-full border-2 pl-2 rounded-md px-2mb-2 h-24"
          placeholder="Descreva a tarefa..."
          {...register("description")}
        ></textarea>

        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        <button type="submit" className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold">
          {loading ? "Salvando..." : taskValue ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  )
}
