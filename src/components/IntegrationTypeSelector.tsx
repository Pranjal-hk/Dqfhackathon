import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Card } from './ui/card';
import { useState } from 'react';
import { SnowflakeIntegrationDialog } from './SnowflakeIntegrationDialog';

interface IntegrationType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const integrationTypes: IntegrationType[] = [
  {
    id: 'snowflake',
    name: 'Snowflake',
    description: 'Connect to your Snowflake data warehouse',
    icon: '❄️'
  }
];

interface IntegrationTypeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IntegrationTypeSelector({ open, onOpenChange }: IntegrationTypeSelectorProps) {
  const [showSnowflakeDialog, setShowSnowflakeDialog] = useState(false);

  const handleSelectType = (typeId: string) => {
    if (typeId === 'snowflake') {
      onOpenChange(false);
      setShowSnowflakeDialog(true);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Integration Type</DialogTitle>
            <DialogDescription>
              Choose a data source to integrate with DataClean Pro
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            {integrationTypes.map((type) => (
              <Card
                key={type.id}
                className="p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleSelectType(type.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
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

      <SnowflakeIntegrationDialog
        open={showSnowflakeDialog}
        onOpenChange={setShowSnowflakeDialog}
      />
    </>
  );
}
