import { AlertTriangle, Clock, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Alert } from '../App';

interface AlertCardProps {
  alert: Alert;
  onClick: () => void;
}

export function AlertCard({ alert, onClick }: AlertCardProps) {
  const getSeverityBadge = () => {
    switch (alert.severity) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-700 border border-red-200">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-700 border border-orange-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-700 border border-amber-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-200">Low</Badge>;
    }
  };

  const getStatusBadge = () => {
    switch (alert.status) {
      case 'open':
        return <Badge className="bg-red-100 text-red-700 border border-red-200">Open</Badge>;
      case 'acknowledged':
        return <Badge className="bg-blue-100 text-blue-700 border border-blue-200">Acknowledged</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-700 border border-green-200">Resolved</Badge>;
    }
  };

  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-yellow-600';
    }
  };

  return (
    <Card 
      className="p-5 hover:shadow-md transition-all cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getSeverityColor()}`} />
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">{alert.checkName}</h3>
            <p className="text-gray-600">{alert.message}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getSeverityBadge()}
          {getStatusBadge()}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{alert.timestamp}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{alert.affectedRows.toLocaleString()} rows affected</span>
          </div>
        </div>
        <span className="text-blue-600 hover:text-blue-700">View details →</span>
      </div>
    </Card>
  );
}
