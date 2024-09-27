"use client"
import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";

export function Header() {
  return (
    <header className="w-ful flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        
        <Link href="/home"> 
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">Plenitude</span> Lista de tarefas
          </h1>
        </Link>

        <div className="flex items-baseline gap-6">
          <Link href={`/home`}>
            <FiUser size={26} color="#4b5563"/>
          </Link>
 
          <button >
            <FiLogOut size={26} color="#4b5563"/>
          </button>
        </div>

      </div>
    </header>
  )
}

export default Header;