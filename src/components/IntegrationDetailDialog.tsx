import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle2, XCircle, RefreshCw, Calendar, Database, Activity } from 'lucide-react';
import type { Integration } from '../App';
import { Card } from './ui/card';

interface SyncHistory {
  id: string;
  timestamp: string;
  status: 'success' | 'failed';
  recordsSynced: number;
  duration: string;
}

interface IntegrationDetailDialogProps {
  integration: Integration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockSyncHistory: SyncHistory[] = [
  {
    id: '1',
    timestamp: '2025-12-05 14:30:00',
    status: 'success',
    recordsSynced: 125000,
    duration: '2m 15s'
  },
  {
    id: '2',
    timestamp: '2025-12-05 14:00:00',
    status: 'success',
    recordsSynced: 123500,
    duration: '2m 10s'
  },
  {
    id: '3',
    timestamp: '2025-12-05 13:30:00',
    status: 'success',
    recordsSynced: 124200,
    duration: '2m 18s'
  },
  {
    id: '4',
    timestamp: '2025-12-05 13:00:00',
    status: 'failed',
    recordsSynced: 0,
    duration: '0s'
  },
  {
    id: '5',
    timestamp: '2025-12-05 12:30:00',
    status: 'success',
    recordsSynced: 122800,
    duration: '2m 12s'
  },
  {
    id: '6',
    timestamp: '2025-12-05 12:00:00',
    status: 'success',
    recordsSynced: 121500,
    duration: '2m 08s'
  }
];

export function IntegrationDetailDialog({ integration, open, onOpenChange }: IntegrationDetailDialogProps) {
  if (!integration) return null;

  const getStatusIcon = () => {
    switch (integration.status) {
      case 'connected':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case 'syncing':
        return <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (integration.status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-700 border border-green-200">Connected</Badge>;
      case 'syncing':
        return <Badge className="bg-blue-100 text-blue-700 border border-blue-200">Syncing</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-700 border border-red-200">Error</Badge>;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const successRate = ((mockSyncHistory.filter(h => h.status === 'success').length / mockSyncHistory.length) * 100).toFixed(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-3xl">
                {integration.icon}
              </div>
              <div>
                <DialogTitle className="text-gray-900 mb-2">{integration.name}</DialogTitle>
                <div className="flex items-center gap-2 text-gray-600">
                  <Database className="w-4 h-4" />
                  <span className="capitalize">{integration.type}</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  {getStatusBadge()}
                </div>
              </div>
            </div>
            {getStatusIcon()}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Activity className="w-4 h-4" />
                <span>Total Records</span>
              </div>
              <div className="text-gray-900">{formatNumber(integration.recordsSynced)}</div>
            </Card>

            <Card className="p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Success Rate</span>
              </div>
              <div className="text-gray-900">{successRate}%</div>
            </Card>

            <Card className="p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Last Sync</span>
              </div>
              <div className="text-gray-900">{integration.lastSync}</div>
            </Card>
          </div>

          {/* Sync History */}
          <div>
            <h3 className="text-gray-900 mb-4">Sync History</h3>
            <div className="space-y-2">
              {mockSyncHistory.map((sync) => (
                <Card key={sync.id} className="p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        {sync.status === 'success' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <Badge 
                          className={sync.status === 'success' 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-red-100 text-red-700 border border-red-200'
                          }
                        >
                          {sync.status === 'success' ? 'Success' : 'Failed'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 text-gray-600">
                        <div>
                          <span className="text-gray-500">Time: </span>
                          <span className="text-gray-900">{sync.timestamp}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Records: </span>
                          <span className="text-gray-900">{formatNumber(sync.recordsSynced)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration: </span>
                          <span className="text-gray-900">{sync.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
