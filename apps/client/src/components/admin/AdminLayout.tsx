import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { FiHome, FiGrid, FiLogOut, FiSettings, FiFileText } from 'react-icons/fi';

interface AdminLayoutProps {
  children: ReactNode;
}

const SidebarItem = ({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active: boolean }) => (
  <Link 
    href={href}
    className={`flex items-center px-6 py-3 transition-colors duration-200 ${
      active 
        ? 'bg-primary-red text-white border-r-4 border-primary-gold' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="font-medium">{label}</span>
  </Link>
);

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-800 flex items-center justify-center">
          <h1 className="text-2xl font-bold tracking-widest text-white">
            TAO<span className="text-primary-red">ARC</span>
          </h1>
        </div>
        
        <nav className="flex-1 py-6 space-y-1">
          <SidebarItem 
            icon={FiHome} 
            label="Dashboard" 
            href="/admin/dashboard" 
            active={pathname === '/admin/dashboard'} 
          />
          <SidebarItem 
            icon={FiGrid} 
            label="Projects" 
            href="/admin/projects" 
            active={pathname.startsWith('/admin/projects')} 
          />
          <SidebarItem 
            icon={FiFileText} 
            label="Career Applications" 
            href="/admin/career" 
            active={pathname.startsWith('/admin/career')} 
          />
          <SidebarItem 
            icon={FiSettings} 
            label="Settings" 
            href="/admin/settings" 
            active={pathname === '/admin/settings'} 
          />
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <FiLogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
