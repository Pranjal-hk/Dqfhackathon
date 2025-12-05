import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { IntegrationCard } from './IntegrationCard';
import { IntegrationDetailDialog } from './IntegrationDetailDialog';
import { IntegrationTypeSelector } from './IntegrationTypeSelector';
import type { Integration } from '../App';

export function IntegrationsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isTypeSelectorOpen, setIsTypeSelectorOpen] = useState(false);

  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM BACKEND API
  useEffect(() => {
    fetch('http://localhost:8000/integration')
      .then(res => res.json())
      .then(data => {
        const formatted: Integration[] = data.map((row: any, index: number) => ({
          id: String(index + 1),                     // UI requires string id
          name: row.name,
          type: 'snowflake',                         // Since all are Snowflake
          status: 'connected',                       // You can replace later with real heartbeat
          lastSync: formatTime(row.created_at),
          recordsSynced: 0,                          // Not provided by API
          icon: '❄️'
        }));

        setIntegrations(formatted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch integrations:', err);
        setLoading(false);
      });
  }, []);

  const filteredIntegrations = integrations.filter(integration =>
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
          {loading ? (
            <p>Loading integrations...</p>
          ) : (
            filteredIntegrations.map(integration => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onClick={() => setSelectedIntegration(integration)}
              />
            ))
          )}
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

// ✅ TIME FORMAT HELPER
function formatTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}