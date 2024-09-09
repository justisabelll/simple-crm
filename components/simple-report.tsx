'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, UserPlus, CheckCircle, TrendingUp } from 'lucide-react';

const data = [
  { date: '2023-06-01', calls: 12, newContacts: 5, completedFollowUps: 3 },
  { date: '2023-06-02', calls: 19, newContacts: 8, completedFollowUps: 6 },
  { date: '2023-06-03', calls: 3, newContacts: 1, completedFollowUps: 2 },
  { date: '2023-06-04', calls: 5, newContacts: 2, completedFollowUps: 1 },
  { date: '2023-06-05', calls: 2, newContacts: 0, completedFollowUps: 4 },
  { date: '2023-06-06', calls: 3, newContacts: 1, completedFollowUps: 2 },
  { date: '2023-06-07', calls: 10, newContacts: 4, completedFollowUps: 5 },
];

export function SimpleReport() {
  const [dateRange, setDateRange] = useState('7days');
  const [activeTab, setActiveTab] = useState('calls');

  const summaryData = {
    totalCalls: data.reduce((sum, day) => sum + day.calls, 0),
    newContacts: data.reduce((sum, day) => sum + day.newContacts, 0),
    completedFollowUps: data.reduce(
      (sum, day) => sum + day.completedFollowUps,
      0
    ),
  };

  const chartData = {
    calls: data.map((day) => ({ date: day.date, value: day.calls })),
    newContacts: data.map((day) => ({
      date: day.date,
      value: day.newContacts,
    })),
    completedFollowUps: data.map((day) => ({
      date: day.date,
      value: day.completedFollowUps,
    })),
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
            Activity Report
          </CardTitle>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              key: 'totalCalls',
              title: 'Total Calls',
              icon: Phone,
              color: 'text-blue-500',
            },
            {
              key: 'newContacts',
              title: 'New Contacts',
              icon: UserPlus,
              color: 'text-green-500',
            },
            {
              key: 'completedFollowUps',
              title: 'Completed Follow-ups',
              icon: CheckCircle,
              color: 'text-yellow-500',
            },
          ].map(({ key, title, icon: Icon, color }) => (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summaryData[key as keyof typeof summaryData]}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="newContacts">New Contacts</TabsTrigger>
            <TabsTrigger value="completedFollowUps">
              Completed Follow-ups
            </TabsTrigger>
          </TabsList>
          {Object.entries(chartData).map(([key, data]) => (
            <TabsContent key={key} value={key}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, ' $1')}{' '}
                    per Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
