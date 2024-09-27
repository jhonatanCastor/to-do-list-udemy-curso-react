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

export async function GET() {
  
  try {
    const response = await prismaClient.task.findMany()
    return NextResponse.json(response);
    
   }catch(err) {
    return NextResponse.json({error: "Failed create new task"})
  } 
}

export async function PUT(request: Request) {

  const {id, status, name, description} = await request.json();

  const findTicket = await prismaClient.task.findFirst({
    where: {
      id: id as string
    }
  });

  if(!findTicket) {
    return NextResponse.json({message: "Filed update ticket"})
  };

  try{
    const response = await prismaClient.task.update({
      where: {
        id: id as string
      },
      data: {
        status: status,
        name: name,
        description: description
      }
    });

    return NextResponse.json(response);

  }catch(err) {
    return NextResponse.json({message: "Filed update ticket"})
  };
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