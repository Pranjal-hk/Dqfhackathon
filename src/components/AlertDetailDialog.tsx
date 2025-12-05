import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertTriangle, Clock, Users, Target, Database, Table, TrendingUp } from 'lucide-react';
import type { Alert } from '../App';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface AlertDetailDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlertDetailDialog({ alert, open, onOpenChange }: AlertDetailDialogProps) {
  if (!alert) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <AlertTriangle className={`w-8 h-8 ${getSeverityColor()}`} />
              <div>
                <DialogTitle className="text-gray-900 mb-2">{alert.checkName}</DialogTitle>
                <p className="text-gray-600 mb-3">{alert.message}</p>
                <div className="flex items-center gap-3">
                  {getSeverityBadge()}
                  {getStatusBadge()}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Alert Details */}
          <div>
            <h3 className="text-gray-900 mb-4">Alert Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Triggered At</span>
                </div>
                <div className="text-gray-900">{alert.timestamp}</div>
              </Card>

              <Card className="p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Users className="w-4 h-4" />
                  <span>Affected Rows</span>
                </div>
                <div className="text-gray-900">{alert.affectedRows.toLocaleString()}</div>
              </Card>

              <Card className="p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Target className="w-4 h-4" />
                  <span>Threshold</span>
                </div>
                <div className="text-gray-900">{alert.threshold}</div>
              </Card>

              <Card className="p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Actual Value</span>
                </div>
                <div className="text-gray-900">{alert.actualValue}</div>
              </Card>
            </div>
          </div>

          {/* Monitor Context */}
          <div>
            <h3 className="text-gray-900 mb-4">Monitor Context</h3>
            <Card className="p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Monitor Name</span>
                  <div className="text-gray-900 mt-1">{alert.monitorName}</div>
                </div>
                <div>
                  <span className="text-gray-600">Check Name</span>
                  <div className="text-gray-900 mt-1">{alert.checkName}</div>
                </div>
                <div>
                  <span className="text-gray-600">Database</span>
                  <div className="flex items-center gap-1.5 text-gray-900 mt-1">
                    <Database className="w-4 h-4" />
                    <span>{alert.database}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Table</span>
                  <div className="flex items-center gap-1.5 text-gray-900 mt-1">
                    <Table className="w-4 h-4" />
                    <span>{alert.table}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Impact Analysis */}
          <div>
            <h3 className="text-gray-900 mb-4">Impact Analysis</h3>
            <Card className="p-4 border border-gray-200 bg-amber-50">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Data Quality Impact</span>
                  <span className="text-gray-900">{alert.severity === 'critical' || alert.severity === 'high' ? 'High' : 'Medium'}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Downstream Systems Affected</span>
                  <span className="text-gray-900">{alert.severity === 'critical' ? '3' : '1'} system{alert.severity === 'critical' ? 's' : ''}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Recommended Action</span>
                  <span className="text-gray-900">
                    {alert.severity === 'critical' ? 'Immediate investigation required' : 'Review and fix within 24 hours'}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Notes Section */}
          {alert.status === 'open' && (
            <div>
              <Label htmlFor="notes">Add Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this alert..."
                rows={3}
                className="mt-2"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {alert.status === 'open' && (
            <>
              <Button variant="outline">
                Acknowledge
              </Button>
              <Button>
                Resolve
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
