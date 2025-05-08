import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart,
  LogOut
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      {/* Header */}
      <header className="bg-white border-b border-border py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 
            className="text-xl font-bold text-brand-dark cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
            AdScribe
          </h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-60 flex-col bg-white border-r border-border p-4">
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/dashboard')}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/campaigns/create')}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/analytics')}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </nav>
        </aside>

        {/* Mobile navigation */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-border w-full">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/campaigns/create')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/analytics')}>
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
