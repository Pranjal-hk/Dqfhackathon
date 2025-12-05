import { ArrowLeft, Plus, Play, Settings, Database, Table } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QualityCheckCard } from './QualityCheckCard';
import { AddCheckDialog } from './AddCheckDialog';
import { CheckDetailDialog } from './CheckDetailDialog';
import { CheckTypeSelector, CheckType } from './CheckTypeSelector';
import { useState } from 'react';
import type { Monitor, QualityCheck } from '../App';

interface MonitorDetailProps {
  monitor: Monitor;
  onBack: () => void;
}

export function MonitorDetail({ monitor, onBack }: MonitorDetailProps) {
  const [isCheckTypeSelectorOpen, setIsCheckTypeSelectorOpen] = useState(false);
  const [isAddCheckDialogOpen, setIsAddCheckDialogOpen] = useState(false);
  const [selectedCheckType, setSelectedCheckType] = useState<CheckType | null>(null);
  const [selectedCheck, setSelectedCheck] = useState<QualityCheck | null>(null);

  const handleCheckTypeSelect = (type: CheckType) => {
    setSelectedCheckType(type);
    setIsAddCheckDialogOpen(true);
  };

  const getStatusBadge = () => {
    if (monitor.status === 'inactive') {
      return <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Inactive</Badge>;
    }
    return <Badge className="bg-green-100 text-green-700 border border-green-200">Active</Badge>;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Monitors
          </Button>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-gray-900">{monitor.name}</h1>
              {getStatusBadge()}
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1.5">
                <Database className="w-4 h-4" />
                <span>{monitor.database}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Table className="w-4 h-4" />
                <span>{monitor.table}</span>
              </div>
              <span>•</span>
              <span>Last run: {monitor.lastRun}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
            <Button variant="outline" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Run Now
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900 mb-1">Quality Checks</h2>
              <p className="text-gray-500">
                {monitor.checks.length} {monitor.checks.length === 1 ? 'check' : 'checks'} configured
              </p>
            </div>
            <Button onClick={() => setIsCheckTypeSelectorOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Check
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {monitor.checks.map(check => (
              <QualityCheckCard 
                key={check.id} 
                check={check}
                onClick={() => setSelectedCheck(check)}
              />
            ))}
          </div>
        </div>
      </div>

      <CheckTypeSelector
        open={isCheckTypeSelectorOpen}
        onOpenChange={setIsCheckTypeSelectorOpen}
        onSelectType={handleCheckTypeSelect}
      />

      <AddCheckDialog
        open={isAddCheckDialogOpen}
        onOpenChange={setIsAddCheckDialogOpen}
        monitorName={monitor.name}
        tableName={monitor.table}
        selectedCheckType={selectedCheckType}
      />

      <CheckDetailDialog
        check={selectedCheck}
        open={selectedCheck !== null}
        onOpenChange={(open) => !open && setSelectedCheck(null)}
      />
    </div>
  );
}