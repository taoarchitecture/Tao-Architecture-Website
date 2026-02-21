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
    className={`flex items-center px-6 py-4 transition-all duration-300 font-agenda uppercase tracking-widest text-xs ${
      active 
        ? 'bg-neutral-off-black text-white border-r-2 border-primary-red' 
        : 'text-neutral-light-grey hover:bg-neutral-off-black hover:text-white'
    }`}
  >
    <Icon className="w-4 h-4 mr-3" />
    <span className="font-bold">{label}</span>
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
    <div className="flex min-h-screen bg-neutral-bg-light">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-black text-white hidden md:flex flex-col fixed h-full z-10 border-r border-neutral-off-black">
        <div className="h-20 border-b border-neutral-off-black flex items-center justify-center bg-neutral-black">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-white font-agenda">
            TAO<span className="text-primary-red">ARC</span>
          </h1>
        </div>
        
        <nav className="flex-1 py-8 space-y-1">
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
            label="Applications" 
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

        <div className="p-4 border-t border-neutral-off-black bg-neutral-black">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-light-grey hover:text-primary-red transition-colors border border-transparent hover:border-neutral-off-black"
          >
            <FiLogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-10 overflow-y-auto min-h-screen bg-[#f7f7f7]">
        {children}
      </main>
    </div>
  );
}
