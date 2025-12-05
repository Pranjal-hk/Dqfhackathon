import { CheckCircle2, XCircle, AlertTriangle, MoreVertical } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { QualityCheck } from '../App';

interface QualityCheckCardProps {
  check: QualityCheck;
  onClick: () => void;
}

export function QualityCheckCard({ check, onClick }: QualityCheckCardProps) {
  const getStatusIcon = () => {
    switch (check.status) {
      case 'passing':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'failing':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (check.status) {
      case 'passing':
        return <Badge className="bg-green-100 text-green-700 border border-green-200">Passing</Badge>;
      case 'warning':
        return <Badge className="bg-amber-100 text-amber-700 border border-amber-200">Warning</Badge>;
      case 'failing':
        return <Badge className="bg-red-100 text-red-700 border border-red-200">Failing</Badge>;
    }
  };

  return (
    <Card 
      className="p-5 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {getStatusIcon()}
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">{check.name}</h3>
            <p className="text-gray-600">{check.description}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-gray-50">
            {check.type}
          </Badge>
          {getStatusBadge()}
        </div>
        <span className="text-gray-500">{check.lastRun}</span>
      </div>

      {check.threshold && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-gray-600">
            <span>Threshold</span>
            <span className="text-gray-900">{check.threshold}</span>
          </div>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-blue-600 hover:text-blue-700">View details →</span>
      </div>
    </Card>
  );
}