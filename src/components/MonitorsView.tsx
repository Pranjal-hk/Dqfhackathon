import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MonitorCard } from './MonitorCard';
import { CreateMonitorDialog } from './CreateMonitorDialog';
import type { Monitor } from '../App';

const mockMonitors: Monitor[] = [
  {
    id: '1',
    name: 'Customer Data Quality',
    table: 'customers',
    database: 'production_db',
    status: 'active',
    lastRun: '2 minutes ago',
    passRate: 95,
    checks: [
      {
        id: 'c1',
        name: 'Null Check - Email',
        type: 'Null Check',
        status: 'passing',
        lastRun: '2 minutes ago',
        description: 'Ensures email column has no null values',
        threshold: '< 1%'
      },
      {
        id: 'c2',
        name: 'Uniqueness - Customer ID',
        type: 'Uniqueness',
        status: 'passing',
        lastRun: '2 minutes ago',
        description: 'Validates customer_id uniqueness',
        threshold: '100%'
      },
      {
        id: 'c3',
        name: 'Format Validation - Phone',
        type: 'Format',
        status: 'warning',
        lastRun: '2 minutes ago',
        description: 'Checks phone number format',
        threshold: '> 98%'
      }
    ]
  },
  {
    id: '2',
    name: 'Transaction Integrity',
    table: 'transactions',
    database: 'production_db',
    status: 'active',
    lastRun: '5 minutes ago',
    passRate: 88,
    checks: [
      {
        id: 'c4',
        name: 'Range Check - Amount',
        type: 'Range',
        status: 'passing',
        lastRun: '5 minutes ago',
        description: 'Validates transaction amounts are positive',
        threshold: '> 0'
      },
      {
        id: 'c5',
        name: 'Referential Integrity',
        type: 'Referential',
        status: 'failing',
        lastRun: '5 minutes ago',
        description: 'Checks foreign key relationships',
        threshold: '100%'
      }
    ]
  },
  {
    id: '3',
    name: 'Product Catalog Health',
    table: 'products',
    database: 'catalog_db',
    status: 'active',
    lastRun: '10 minutes ago',
    passRate: 100,
    checks: [
      {
        id: 'c6',
        name: 'Completeness - Description',
        type: 'Completeness',
        status: 'passing',
        lastRun: '10 minutes ago',
        description: 'Ensures product descriptions are filled',
        threshold: '> 95%'
      },
      {
        id: 'c7',
        name: 'Data Freshness',
        type: 'Freshness',
        status: 'passing',
        lastRun: '10 minutes ago',
        description: 'Monitors data update recency',
        threshold: '< 24h'
      }
    ]
  },
  {
    id: '4',
    name: 'User Activity Logs',
    table: 'activity_logs',
    database: 'analytics_db',
    status: 'inactive',
    lastRun: '2 hours ago',
    passRate: 92,
    checks: [
      {
        id: 'c8',
        name: 'Timestamp Validation',
        type: 'Format',
        status: 'passing',
        lastRun: '2 hours ago',
        description: 'Validates timestamp format',
        threshold: '100%'
      }
    ]
  }
];

interface MonitorsViewProps {
  onSelectMonitor: (monitor: Monitor) => void;
}

export function MonitorsView({ onSelectMonitor }: MonitorsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredMonitors = mockMonitors.filter(monitor =>
    monitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    monitor.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
    monitor.database.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 mb-1">Data Quality Monitors</h1>
            <p className="text-gray-500">Monitor and validate your data quality across tables</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Monitor
          </Button>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search monitors, tables, or databases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredMonitors.map(monitor => (
            <MonitorCard
              key={monitor.id}
              monitor={monitor}
              onClick={() => onSelectMonitor(monitor)}
            />
          ))}
        </div>
      </div>

      <CreateMonitorDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
