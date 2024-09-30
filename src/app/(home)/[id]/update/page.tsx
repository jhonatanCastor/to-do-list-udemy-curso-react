'use client'
import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { ServicesTask } from "../../components/ServicesTask";
import { api } from "@/app/lib/api";
import { useParams } from "next/navigation";

interface Props {
  name: string;
  description: string;
  status: string;
}

const UpdateTask = () => {
  const [data, setData] = useState<Props | null>(null);
  const {id} = useParams();

  useEffect(() => {
    getDataTask(id);
  }, [id]);

  async function getDataTask(id: string | string[]) {
    const response = await api.get("/api/task", {
      params: {
        id: id
      }
    });
    
    setData(response.data);
  }

  return(
    <Container>
      <ServicesTask taskValue={data ? data : undefined}/>
    </Container>
  )
}
export default UpdateTask;