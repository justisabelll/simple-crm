'use client';

import { useState, useMemo } from 'react';
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
import type { Contact } from '@/lib/db/schema';

const mockFollowUps: Contact[] = [
  {
    id: 1,
    name: 'John Doe',
    company: 'Acme Inc',
    phone: '+1 234 567 890',
    status: 'In Progress',
    email: 'john@example.com',
    notes: 'Follow up on proposal',
    nextFollowUp: new Date('2023-06-15'),
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-01'),
  },
  // ... add more mock data with all required fields
];

export function FollowUpList() {
  const [sortColumn, setSortColumn] = useState<keyof Contact>('nextFollowUp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (column: keyof Contact) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedFollowUps = useMemo(() => {
    return mockFollowUps
      .filter((followUp) => {
        const matchesFilter = filter === 'all' || followUp.status === filter;
        const matchesSearch = Object.values(followUp).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [mockFollowUps, filter, searchTerm, sortColumn, sortDirection]);

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
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {['Name', 'Company', 'Phone', 'Next Follow-up', 'Status'].map(
                (header) => (
                  <TableHead
                    key={header}
                    onClick={() =>
                      handleSort(
                        header.toLowerCase().replace(' ', '') as keyof Contact
                      )
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
            {filteredAndSortedFollowUps.map((followUp) => (
              <TableRow key={followUp.id}>
                <TableCell className="font-medium">{followUp.name}</TableCell>
                <TableCell>{followUp.company}</TableCell>
                <TableCell>{followUp.phone}</TableCell>
                <TableCell>
                  {followUp.nextFollowUp?.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      followUp.status === 'New'
                        ? 'bg-blue-100 text-blue-800'
                        : followUp.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
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
