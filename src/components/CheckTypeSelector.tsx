import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Card } from './ui/card';
import { CheckCircle, Users, Calendar, FileCheck, GitCompare, CheckSquare, Clock, Code } from 'lucide-react';

export interface CheckType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const checkTypes: CheckType[] = [
  {
    id: 'null',
    name: 'Null Check',
    description: 'Ensures selected columns have no null or empty values',
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    id: 'uniqueness',
    name: 'Uniqueness',
    description: 'Validates that column values are unique across rows',
    icon: <Users className="w-6 h-6" />
  },
  {
    id: 'format',
    name: 'Format Validation',
    description: 'Checks if data matches expected format patterns',
    icon: <FileCheck className="w-6 h-6" />
  },
  {
    id: 'range',
    name: 'Range Check',
    description: 'Validates that values fall within acceptable ranges',
    icon: <GitCompare className="w-6 h-6" />
  },
  {
    id: 'referential',
    name: 'Referential Integrity',
    description: 'Ensures foreign key relationships are maintained',
    icon: <CheckSquare className="w-6 h-6" />
  },
  {
    id: 'completeness',
    name: 'Completeness',
    description: 'Checks for required fields being filled',
    icon: <CheckSquare className="w-6 h-6" />
  },
  {
    id: 'freshness',
    name: 'Data Freshness',
    description: 'Monitors how recently data was updated',
    icon: <Clock className="w-6 h-6" />
  },
  {
    id: 'custom',
    name: 'Custom SQL',
    description: 'Write custom SQL queries for validation',
    icon: <Code className="w-6 h-6" />
  }
];

interface CheckTypeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectType: (type: CheckType) => void;
}

export function CheckTypeSelector({ open, onOpenChange, onSelectType }: CheckTypeSelectorProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Check Type</DialogTitle>
          <DialogDescription>
            Choose the type of quality check you want to add
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {checkTypes.map((type) => (
            <Card
              key={type.id}
              className="p-5 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              onClick={() => {
                onSelectType(type);
                onOpenChange(false);
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{type.name}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
