'use client'

import { api } from "@/app/lib/api";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';;
import { useRouter } from "next/navigation";


const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatorio"),
  description: z.string().min(1, "O campo email é obrigatorio"),
  status: z.string().min(1, "O campo status e obrigatorio")
});

type FormData = z.infer<typeof schema>

export const CreateNewtask = () => {
  const router = useRouter();

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  
  async function handleRegisterTask(data: FormData) {
    
    await api.post("/api/task", {
      name: data.name,
      description: data.description,
      status: data.status,
    });

    router.refresh();
    router.replace("/home")
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold">Criar nova tarefa</h1>

      <form onSubmit={handleSubmit(handleRegisterTask)} className="flex flex-col w-full mt-6">

        <label htmlFor="" className="font-medium ml-1">Nome</label>
        <input 
          className="bg-gray-200 py-1 pl-1 h-11 rounded" 
          {...register("name")}
          type="text" 
          placeholder="Digite o nome da tarefa" 
        />
      
        <label htmlFor="" className="font-medium ml-1 mt-4">Status</label>
        <input 
          className="bg-gray-200 py-1 pl-1 h-11 rounded mb-4"  
          type="text" 
          {...register("status")} 
          placeholder="Digite o nome da tarefa" 
        />
          
        <label htmlFor="" className="mb-1 font-medium ml-1 text-lg">Descreva o problema</label>
        <textarea
          className="w-full border-2 pl-2 rounded-md px-2mb-2 h-24"
          placeholder="Descreva o problema..."
          required
          {...register("description")}
        ></textarea>

        <button type='submit' className='bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold'>
          Cadastrar
        </button>

      </form>
    </div>
  )
}