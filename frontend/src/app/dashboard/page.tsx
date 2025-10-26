'use client';

import React from 'react';
import MainLayout from '../main-layout';
import SearchBar from '@/components/common/SearchBar';
import Recommendations from '@/components/sections/Recommendations';
import Watchlist from '@/components/sections/Watchlist';
import NewsFeed from '@/components/sections/NewsFeed';
import AboutUs from '@/components/sections/AboutUs';
import { TrendingUp, LineChart, Wallet, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="min-h-screen">
        <SearchBar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 px-4 max-w-7xl mx-auto">
          <div className="lg:col-span-3 space-y-6">
            <Recommendations />
            <Watchlist />
          </div>

          <div className="lg:col-span-6">
            <NewsFeed />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <AboutUs />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
