import React, { useEffect, useState } from 'react';
import { FiMap, FiBook, FiStar, FiUsers } from 'react-icons/fi';
import { dashboardService } from '../../services/api';
import { StatsSkeleton } from '../../components/Skeleton';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <StatsSkeleton />
    </div>
  );

  const cards = [
    {
      title: 'Total Destinasi',
      value: stats?.totalDestinasi || 0,
      icon: FiMap,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Materi',
      value: stats?.totalMateri || 0,
      icon: FiBook,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Review',
      value: stats?.totalReview || 0,
      icon: FiStar,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: FiUsers,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{card.title}</p>
                    <p className="text-4xl font-bold mt-2">{card.value}</p>
                  </div>
                  <Icon size={48} className="opacity-80" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
