import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { IntegrationCard } from './IntegrationCard';
import { IntegrationDetailDialog } from './IntegrationDetailDialog';
import { IntegrationTypeSelector } from './IntegrationTypeSelector';
import type { Integration } from '../App';

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Production Snowflake',
    type: 'snowflake',
    status: 'connected',
    lastSync: '5 minutes ago',
    recordsSynced: 1250000,
    icon: '❄️'
  },
  {
    id: '2',
    name: 'Analytics Snowflake',
    type: 'snowflake',
    status: 'connected',
    lastSync: '1 hour ago',
    recordsSynced: 850000,
    icon: '❄️'
  },
  {
    id: '3',
    name: 'Staging Snowflake',
    type: 'snowflake',
    status: 'error',
    lastSync: '2 days ago',
    recordsSynced: 0,
    icon: '❄️'
  }
];

export function IntegrationsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isTypeSelectorOpen, setIsTypeSelectorOpen] = useState(false);

  const filteredIntegrations = mockIntegrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 mb-1">Integrations</h1>
            <p className="text-gray-500">Connect and manage your data sources</p>
          </div>
          <Button onClick={() => setIsTypeSelectorOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Integration
          </Button>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredIntegrations.map(integration => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onClick={() => setSelectedIntegration(integration)}
            />
          ))}
        </div>
      </div>

      <IntegrationDetailDialog
        integration={selectedIntegration}
        open={selectedIntegration !== null}
        onOpenChange={(open) => !open && setSelectedIntegration(null)}
      />

      <IntegrationTypeSelector
        open={isTypeSelectorOpen}
        onOpenChange={setIsTypeSelectorOpen}
      />
    </div>
  );
}
