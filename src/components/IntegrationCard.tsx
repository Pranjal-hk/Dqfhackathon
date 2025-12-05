import { CheckCircle2, XCircle, RefreshCw, Database } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Integration } from '../App';

interface IntegrationCardProps {
  integration: Integration;
  onClick: () => void;
}

export function IntegrationCard({ integration, onClick }: IntegrationCardProps) {
  const getStatusIcon = () => {
    switch (integration.status) {
      case 'connected':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'error':
        return <XCircle className="w-4 h-4" />;
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

  return (
    <Card 
      className="p-5 hover:shadow-md transition-all cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
            {integration.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">{integration.name}</h3>
            <div className="flex items-center gap-1 text-gray-500">
              <Database className="w-3.5 h-3.5" />
              <span className="capitalize">{integration.type}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {getStatusIcon()}
          {getStatusBadge()}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Last Sync</span>
          <span className="text-gray-900">{integration.lastSync}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Records Synced</span>
          <span className="text-gray-900">{formatNumber(integration.recordsSynced)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-blue-600 hover:text-blue-700">View sync history →</span>
      </div>
    </Card>
  );
}
