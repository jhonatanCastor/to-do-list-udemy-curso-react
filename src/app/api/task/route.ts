import { NextResponse } from "next/server";
import prismaClient from "../../lib/prisma"


export async function POST(request: Request) {
  
    const { name, description, status } = await request.json();
  
    if (!name || !description || !status) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    try {
      await prismaClient.task.create({
        data: {
          name,
          description,
          status
        }
      })
    
      return NextResponse.json({message: "Task registrada com sucesso!"})
      
     }catch(err) {
      return NextResponse.json({error: "Failed create new task"})
    } 
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("id");

  if (taskId) {
    try {
      const findTask = await prismaClient.task.findFirst({
        where: {
          id: taskId
        }
      });

      if (!findTask) {
        return NextResponse.json({ error: "Task não encontrada" }, { status: 404 });
      }

      return NextResponse.json(findTask);
    } catch (err) {
      return NextResponse.json({ error: "Falha ao buscar task" }, { status: 500 });
    }
  } else {
    // Busca de todas as tasks
    try {
      const tasks = await prismaClient.task.findMany();
      return NextResponse.json(tasks);
    } catch (err) {
      return NextResponse.json({ error: "Falha ao buscar tasks" }, { status: 500 });
    }
  }
}

export async function PUT(request: Request) {
  console.log('hehehehehehheheheheheheheh');
  
  const {searchParams} = new URL(request.url);
  const id = searchParams.get("id");

  console.log("ID Taskgggggggggggggggggg", id);
  

  if(!id){
    return NextResponse.json({ message: "ID da tarefa não fornecido" }, { status: 400 });
  };

  const {status, name, description} = await request.json();

  const findTask = await prismaClient.task.findFirst({
    where: {id}
  });

  if(!findTask) {
    return NextResponse.json({ message: "Tarefa não encontrada" }, { status: 404 });
  };

  try {
    const response = await prismaClient.task.update({
      where: {
        id: id
      }, data:{
        name,
        status,
        description
      }
    });
    return NextResponse.json(response);
  }catch (err) {
    console.error("Erro ao atualizar a tarefa:", err);
    return NextResponse.json({ message: "Falha ao atualizar a tarefa" }, { status: 500 });
  }
  
}

export async function DELETE(request: Request) {
  
  const {searchParams} = new URL(request.url);
  const taskId = searchParams.get("id");

  if(!taskId) {
    return NextResponse.json({error: "Task not found"}, {status: 400})
  }
  
  try{
    await prismaClient.task.delete({
      where: {
        id: taskId as string
      }
    });
    return NextResponse.json({message: 'Task successfully deleted'});

  }catch(err) {
    return NextResponse.json({error: "Failed deleted task"}, {status: 400})
  }
}
