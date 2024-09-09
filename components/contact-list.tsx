'use client';

import { useState } from 'react';
import {
  Phone,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const contacts = [
  {
    id: 1,
    name: 'John Doe',
    company: 'Acme Inc',
    phone: '+1 234 567 890',
    status: 'New',
    nextFollowUp: '2023-06-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'Tech Corp',
    phone: '+1 987 654 321',
    status: 'In Progress',
    nextFollowUp: '2023-06-18',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'Global Systems',
    phone: '+1 555 123 4567',
    status: 'Closed',
    nextFollowUp: '2023-06-20',
  },
  {
    id: 4,
    name: 'Bob Williams',
    company: 'Innovative Solutions',
    phone: '+1 333 999 8888',
    status: 'New',
    nextFollowUp: '2023-06-22',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    company: 'Brown Enterprises',
    phone: '+1 777 888 9999',
    status: 'In Progress',
    nextFollowUp: '2023-06-25',
  },
];

export function ContactList() {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      (statusFilter === 'all' ||
        contact.status.toLowerCase() === statusFilter) &&
      Object.values(contact).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              className="w-64"
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Contact
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {[
                'Name',
                'Company',
                'Phone',
                'Lead Status',
                'Next Follow-up',
              ].map((header) => (
                <TableHead
                  key={header}
                  onClick={() => handleSort(header.toLowerCase())}
                >
                  <div className="flex items-center cursor-pointer">
                    {header}
                    {sortColumn === header.toLowerCase() &&
                      (sortDirection === 'asc' ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      contact.status === 'New'
                        ? 'bg-blue-100 text-blue-800'
                        : contact.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {contact.status}
                  </span>
                </TableCell>
                <TableCell>{contact.nextFollowUp}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
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
