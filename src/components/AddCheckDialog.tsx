import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import type { CheckType } from './CheckTypeSelector';
import { useState } from 'react';

interface AddCheckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  monitorName: string;
  tableName: string;
  selectedCheckType: CheckType | null;
}

// Mock columns for the table
const mockColumns = [
  'id',
  'customer_id',
  'email',
  'phone',
  'first_name',
  'last_name',
  'address',
  'city',
  'state',
  'zip_code',
  'created_at',
  'updated_at'
];

export function AddCheckDialog({ open, onOpenChange, monitorName, tableName, selectedCheckType }: AddCheckDialogProps) {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [checkName, setCheckName] = useState('');
  const [action, setAction] = useState('');

  if (!selectedCheckType) return null;

  const handleSubmit = () => {
    console.log('Check created:', {
      type: selectedCheckType.id,
      column: selectedColumn,
      name: checkName,
      action: action
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configure {selectedCheckType.name}</DialogTitle>
          <DialogDescription>
            Set up a {selectedCheckType.name.toLowerCase()} for {monitorName} on table {tableName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="check-name">Check Name</Label>
            <Input 
              id="check-name" 
              placeholder={`e.g., ${selectedCheckType.name} - Email`}
              value={checkName}
              onChange={(e) => setCheckName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="column">Select Column</Label>
            <Select value={selectedColumn} onValueChange={setSelectedColumn}>
              <SelectTrigger id="column">
                <SelectValue placeholder="Choose a column" />
              </SelectTrigger>
              <SelectContent>
                {mockColumns.map((column) => (
                  <SelectItem key={column} value={column}>
                    {column}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="action">Action on Failure</Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger id="action">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="logging">Logging</SelectItem>
                <SelectItem value="drop">Drop</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-gray-500">
              {action === 'logging' && 'Failed records will be logged for review'}
              {action === 'drop' && 'Failed records will be dropped from the dataset'}
              {!action && 'Choose what happens when a record fails this check'}
            </p>
          </div>

          {selectedCheckType.id === 'range' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-value">Minimum Value</Label>
                <Input 
                  id="min-value" 
                  placeholder="e.g., 0"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-value">Maximum Value</Label>
                <Input 
                  id="max-value" 
                  placeholder="e.g., 1000"
                  type="number"
                />
              </div>
            </div>
          )}

          {selectedCheckType.id === 'format' && (
            <div className="space-y-2">
              <Label htmlFor="pattern">Format Pattern</Label>
              <Input 
                id="pattern" 
                placeholder="e.g., ^[0-9]{3}-[0-9]{3}-[0-9]{4}$ for phone"
              />
            </div>
          )}

          {selectedCheckType.id === 'custom' && (
            <div className="space-y-2">
              <Label htmlFor="custom-sql">Custom SQL Query</Label>
              <Textarea 
                id="custom-sql" 
                placeholder="SELECT COUNT(*) FROM table WHERE condition"
                rows={4}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="threshold">Threshold (%)</Label>
            <Input 
              id="threshold" 
              placeholder="e.g., 99"
              type="number"
              min="0"
              max="100"
            />
            <p className="text-gray-500">
              Minimum percentage of records that must pass this check
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="check-description">Description (Optional)</Label>
            <Textarea 
              id="check-description" 
              placeholder="Describe what this check validates"
              rows={2}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Check
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}