'use client';

import { useState } from 'react';
import {
  Bell,
  Phone,
  UserPlus,
  Search,
  BarChart2,
  Users,
  Calendar,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">CRM System</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: 'Dashboard', icon: BarChart2 },
            { name: 'Contacts', icon: Users },
            { name: 'Follow-ups', icon: Calendar },
            { name: 'Reports', icon: BarChart2 },
          ].map((item) => (
            <button
              key={item.name}
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 w-full transition-colors ${
                activeTab === item.name.toLowerCase()
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : ''
              }`}
              onClick={() => setActiveTab(item.name.toLowerCase())}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => console.log('Logout')}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <Input
                className="w-64"
                type="text"
                placeholder="Search contacts..."
              />
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: 'Total Contacts',
                value: '1,234',
                icon: Users,
                color: 'bg-blue-100 text-blue-600',
              },
              {
                title: 'Calls Made Today',
                value: '42',
                icon: Phone,
                color: 'bg-green-100 text-green-600',
              },
              {
                title: 'Upcoming Follow-ups',
                value: '15',
                icon: Calendar,
                color: 'bg-yellow-100 text-yellow-600',
              },
            ].map((card) => (
              <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${card.color}`}>
                    <card.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Placeholder for other components */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Content for the selected tab will be displayed here.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
