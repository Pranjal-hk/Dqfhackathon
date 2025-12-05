import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface SnowflakeIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SnowflakeIntegrationDialog({ open, onOpenChange }: SnowflakeIntegrationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    account: '',
    warehouse: '',
    username: '',
    password: ''
  });

  const handleTestConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success/failure randomly
    const success = Math.random() > 0.3;
    setTestResult(success ? 'success' : 'error');
    setIsLoading(false);
  };

  const handleCreate = () => {
    console.log('Creating integration:', formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      name: '',
      account: '',
      warehouse: '',
      username: '',
      password: ''
    });
    setTestResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-3xl">
              ❄️
            </div>
            <div>
              <DialogTitle>Connect to Snowflake</DialogTitle>
              <DialogDescription>
                Enter your Snowflake credentials to establish a connection
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="integration-name">Integration Name</Label>
            <Input 
              id="integration-name" 
              placeholder="e.g., Production Snowflake"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account">Account</Label>
              <Input 
                id="account" 
                placeholder="e.g., xy12345.us-east-1"
                value={formData.account}
                onChange={(e) => setFormData({...formData, account: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warehouse">Warehouse</Label>
              <Input 
                id="warehouse" 
                placeholder="e.g., COMPUTE_WH"
                value={formData.warehouse}
                onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              placeholder="Snowflake username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              placeholder="Snowflake password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {testResult && (
            <Alert className={testResult === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <div className="flex items-center gap-2">
                {testResult === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <AlertDescription className={testResult === 'success' ? 'text-green-700' : 'text-red-700'}>
                  {testResult === 'success' 
                    ? 'Connection successful! You can now create this integration.' 
                    : 'Connection failed. Please check your credentials and try again.'}
                </AlertDescription>
              </div>
            </Alert>
          )}

          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleTestConnection}
              disabled={isLoading || !formData.account || !formData.username || !formData.password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing Connection...
                </>
              ) : (
                'Test Connection'
              )}
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate}
            disabled={testResult !== 'success'}
          >
            Create Integration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
