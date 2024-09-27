
'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Container } from '../Container';

export function HomeHeader() {

  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
    }
  }, []);

  return (
    <Container>
     <header className='w-full bg-gray-900 my-4 p-3 rounded flex gap-4 items-center'>
      <Link className='text-white hover:font-bold duration-300' href={`/tasks`}>
        Historico das tarefas
      </Link>

      <Link className='text-white hover:font-bold duration-300' href={`/new`}>
        Criar nova tarefa
      </Link>
     </header>
    </Container>
  )
}