import React from 'react';
import { StatsOverview } from './StatsOverview';
import { CategoryOverview } from './CategoryOverview';
import { RecentActivity } from './RecentActivity';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <StatsOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryOverview />
        <RecentActivity />
      </div>
    </div>
  );
}