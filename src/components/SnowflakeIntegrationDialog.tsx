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
  onCreated?: () => void;   // ✅ callback to refresh integration list
}

export function SnowflakeIntegrationDialog({
  open,
  onOpenChange,
  onCreated
}: SnowflakeIntegrationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    account: '',
    warehouse: '',
    username: '',
    password: ''
  });

  // ✅ OPTIONAL: Replace with real connection-test API later
  const handleTestConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    setApiError(null);

    try {
      // TEMP mock delay – you can replace with real API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestResult('success');
    } catch (err) {
      setTestResult('error');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ ✅ REAL CREATE → POST TO FASTAPI
  const handleCreate = async () => {
    setIsLoading(true);
    setApiError(null);

    try {
      const res = await fetch('http://localhost:8000/integration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          account: formData.account,
          warehouse: formData.warehouse,
          username: formData.username,
          password: formData.password,
          schema_name: 'hackathon',        // ✅ required by backend?
          database_name: 'hackathon'       // ✅ required by backend?
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to create integration');
      }

      // ✅ Success
      onOpenChange(false);
      onCreated?.();     // refresh integration list

      // ✅ Reset Form
      setFormData({
        name: '',
        account: '',
        warehouse: '',
        username: '',
        password: ''
      });

      setTestResult(null);
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            <Label>Integration Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Account</Label>
              <Input
                value={formData.account}
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Warehouse</Label>
              <Input
                value={formData.warehouse}
                onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* ✅ TEST RESULT */}
          {testResult && (
            <Alert className={testResult === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <div className="flex items-center gap-2">
                {testResult === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <AlertDescription>
                  {testResult === 'success'
                    ? 'Connection successful!'
                    : 'Connection failed'}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* ✅ API ERROR */}
          {apiError && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {apiError}
              </AlertDescription>
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
                  Testing...
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
            disabled={testResult !== 'success' || isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Integration'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}