import React from 'react';
import { TrendingUp, Wallet, Users, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const priceData = [
    { name: 'Jan', price: 0.12 },
    { name: 'Feb', price: 0.15 },
    { name: 'Mar', price: 0.18 },
    { name: 'Apr', price: 0.22 },
    { name: 'May', price: 0.19 },
    { name: 'Jun', price: 0.25 },
    { name: 'Jul', price: 0.28 },
  ];

  const portfolioData = [
    { name: 'FLASK', value: 45, color: '#3B82F6' },
    { name: 'BNB', value: 25, color: '#F59E0B' },
    { name: 'BUSD', value: 20, color: '#10B981' },
    { name: 'Others', value: 10, color: '#8B5CF6' },
  ];

  const stats = [
    {
      title: 'Total Value Locked',
      value: '$12,456,789',
      change: '+12.5%',
      icon: <TrendingUp className="text-green-400" size={24} />,
      positive: true,
    },
    {
      title: 'Your Portfolio',
      value: '$0.00',
      change: '0%',
      icon: <Wallet className="text-blue-400" size={24} />,
      positive: true,
    },
    {
      title: 'Active Users',
      value: '45,678',
      change: '+8.2%',
      icon: <Users className="text-purple-400" size={24} />,
      positive: true,
    },
    {
      title: '24h Volume',
      value: '$2,345,678',
      change: '-3.1%',
      icon: <Activity className="text-orange-400" size={24} />,
      positive: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Welcome to LabSwap DEX - Your DeFi Hub</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div>{stat.icon}</div>
                <span className={`text-sm font-medium ${
                  stat.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Price Chart */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-white text-xl font-semibold mb-6">FLASK Price Chart</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Portfolio Distribution */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-white text-xl font-semibold mb-6">Portfolio Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-300 text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-white text-xl font-semibold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-medium transition-colors">
              Trade Tokens
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-medium transition-colors">
              Add Liquidity
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-medium transition-colors">
              Start Farming
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg font-medium transition-colors">
              Stake Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;