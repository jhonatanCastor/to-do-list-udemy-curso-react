import React from 'react';
import { HomeHeader } from './components/HomeHeader';

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return(
    <>
      <HomeHeader/>
      {children}
    </>
  )
}