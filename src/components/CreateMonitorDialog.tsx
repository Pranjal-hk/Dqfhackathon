import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CreateMonitorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateMonitorDialog({ open, onOpenChange }: CreateMonitorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Monitor</DialogTitle>
          <DialogDescription>
            Set up a new data quality monitor for your table
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monitor-name">Monitor Name</Label>
              <Input 
                id="monitor-name" 
                placeholder="e.g., Customer Data Quality"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="database">Database</Label>
              <Select>
                <SelectTrigger id="database">
                  <SelectValue placeholder="Select database" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production_db">production_db</SelectItem>
                  <SelectItem value="catalog_db">catalog_db</SelectItem>
                  <SelectItem value="analytics_db">analytics_db</SelectItem>
                  <SelectItem value="staging_db">staging_db</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="table">Table Name</Label>
            <Input 
              id="table" 
              placeholder="e.g., customers"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule">Run Schedule</Label>
            <Select>
              <SelectTrigger id="schedule">
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5min">Every 5 minutes</SelectItem>
                <SelectItem value="15min">Every 15 minutes</SelectItem>
                <SelectItem value="30min">Every 30 minutes</SelectItem>
                <SelectItem value="1hour">Every hour</SelectItem>
                <SelectItem value="6hours">Every 6 hours</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input 
              id="description" 
              placeholder="Brief description of what this monitor does"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Create Monitor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
