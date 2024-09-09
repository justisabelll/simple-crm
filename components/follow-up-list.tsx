'use client';

import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const followUps = [
  {
    id: 1,
    name: 'John Doe',
    company: 'Acme Inc',
    phone: '+1 234 567 890',
    followUpDate: '2023-06-15',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'Tech Corp',
    phone: '+1 987 654 321',
    followUpDate: '2023-06-18',
    status: 'Completed',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'Global Systems',
    phone: '+1 555 123 4567',
    followUpDate: '2023-06-20',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Bob Williams',
    company: 'Innovative Solutions',
    phone: '+1 333 999 8888',
    followUpDate: '2023-06-22',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    company: 'Brown Enterprises',
    phone: '+1 777 888 9999',
    followUpDate: '2023-06-25',
    status: 'Rescheduled',
  },
];

export function FollowUpList() {
  const [sortColumn, setSortColumn] = useState('followUpDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredFollowUps = followUps.filter(
    (followUp) =>
      (filter === 'all' || followUp.status.toLowerCase() === filter) &&
      Object.values(followUp).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const sortedFollowUps = [...filteredFollowUps].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-blue-500" />
          Upcoming Follow-ups
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              className="w-64"
              type="text"
              placeholder="Search follow-ups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rescheduled">Rescheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {['Name', 'Company', 'Phone', 'Follow-up Date', 'Status'].map(
                (header) => (
                  <TableHead
                    key={header}
                    onClick={() =>
                      handleSort(header.toLowerCase().replace(' ', ''))
                    }
                  >
                    <div className="flex items-center cursor-pointer">
                      {header}
                      {sortColumn === header.toLowerCase().replace(' ', '') &&
                        (sortDirection === 'asc' ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                )
              )}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFollowUps.map((followUp) => (
              <TableRow key={followUp.id}>
                <TableCell className="font-medium">{followUp.name}</TableCell>
                <TableCell>{followUp.company}</TableCell>
                <TableCell>{followUp.phone}</TableCell>
                <TableCell>{followUp.followUpDate}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      followUp.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : followUp.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {followUp.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      title="Mark as Completed"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Reschedule">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      title="Cancel Follow-up"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
