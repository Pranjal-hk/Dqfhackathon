import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle2, XCircle, AlertTriangle, X, TrendingUp, TrendingDown, Calendar, Activity, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import type { QualityCheck } from '../App';
import { Card } from './ui/card';

interface CheckDetailDialogProps {
  check: QualityCheck | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckDetailDialog({ check, open, onOpenChange }: CheckDetailDialogProps) {
  if (!check) return null;

  // Generate mock historical data for the chart
  const generateHistoricalData = () => {
    const data = [];
    const baseValue = check.status === 'passing' ? 98 : check.status === 'warning' ? 85 : 65;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variance = Math.random() * 10 - 5;
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.min(100, Math.max(0, baseValue + variance))
      });
    }
    return data;
  };

  const generateExecutionTimes = () => {
    const data = [];
    for (let i = 14; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: Math.random() * 500 + 100
      });
    }
    return data;
  };

  const historicalData = generateHistoricalData();
  const executionData = generateExecutionTimes();
  const trend = historicalData[historicalData.length - 1].value - historicalData[0].value;
  const currentPassRate = historicalData[historicalData.length - 1].value;

  const getStatusIcon = () => {
    switch (check.status) {
      case 'passing':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      case 'failing':
        return <XCircle className="w-6 h-6 text-red-600" />;
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {getStatusIcon()}
              <div>
                <DialogTitle className="text-gray-900 mb-2">{check.name}</DialogTitle>
                <p className="text-gray-600">{check.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge variant="outline" className="bg-gray-50">
                    {check.type}
                  </Badge>
                  {getStatusBadge()}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Activity className="w-4 h-4" />
                <span>Current Pass Rate</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-gray-900">{currentPassRate.toFixed(1)}%</span>
                <div className="flex items-center gap-1 pb-0.5">
                  {trend >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(trend).toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Target className="w-4 h-4" />
                <span>Threshold</span>
              </div>
              <div className="text-gray-900">{check.threshold || 'N/A'}</div>
            </Card>

            <Card className="p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Last Run</span>
              </div>
              <div className="text-gray-900">{check.lastRun}</div>
            </Card>
          </div>

          {/* Pass Rate Trend */}
          <div>
            <h3 className="text-gray-900 mb-4">Pass Rate Trend (Last 30 Days)</h3>
            <div className="h-72 bg-gray-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop 
                        offset="5%" 
                        stopColor={check.status === 'passing' ? '#10b981' : check.status === 'warning' ? '#f59e0b' : '#ef4444'} 
                        stopOpacity={0.3}
                      />
                      <stop 
                        offset="95%" 
                        stopColor={check.status === 'passing' ? '#10b981' : check.status === 'warning' ? '#f59e0b' : '#ef4444'} 
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Pass Rate (%)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 12 } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Pass Rate']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={check.status === 'passing' ? '#10b981' : check.status === 'warning' ? '#f59e0b' : '#ef4444'}
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Execution Time */}
          <div>
            <h3 className="text-gray-900 mb-4">Execution Time (Last 15 Days)</h3>
            <div className="h-64 bg-gray-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={executionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 12 } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`${value.toFixed(0)}ms`, 'Execution Time']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Check Configuration */}
          <div>
            <h3 className="text-gray-900 mb-4">Check Configuration</h3>
            <Card className="p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Check Type</span>
                  <div className="text-gray-900 mt-1">{check.type}</div>
                </div>
                <div>
                  <span className="text-gray-600">Threshold</span>
                  <div className="text-gray-900 mt-1">{check.threshold || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Severity</span>
                  <div className="text-gray-900 mt-1">High</div>
                </div>
                <div>
                  <span className="text-gray-600">Run Frequency</span>
                  <div className="text-gray-900 mt-1">Every 15 minutes</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            Edit Check
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
