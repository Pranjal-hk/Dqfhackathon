import { Database, Activity, Bell, Plug } from 'lucide-react';

interface SidebarProps {
  currentView: 'monitors' | 'integrations' | 'alerts';
  onViewChange: (view: 'monitors' | 'integrations' | 'alerts') => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span className="text-gray-900">DataClean Pro</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <button 
            onClick={() => onViewChange('monitors')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left ${
              currentView === 'monitors' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span>Monitors</span>
          </button>
          <button 
            onClick={() => onViewChange('alerts')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left ${
              currentView === 'alerts' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span>Alerts</span>
          </button>
          <button 
            onClick={() => onViewChange('integrations')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left ${
              currentView === 'integrations' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Plug className="w-5 h-5" />
            <span>Integrations</span>
          </button>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600">JD</span>
          </div>
          <div className="flex-1">
            <div className="text-gray-900">John Doe</div>
            <div className="text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}