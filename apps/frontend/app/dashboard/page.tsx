"use client"
import React from 'react';
import { Header } from './Header';
import { Dashboard } from './Dashboard';

function page() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <Dashboard />
    </div>
  );
}

export default page;
