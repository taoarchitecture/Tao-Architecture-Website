import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { FiHome, FiGrid, FiLogOut, FiSettings, FiFileText, FiMail, FiLayers, FiEdit3, FiUsers, FiBarChart2, FiMenu, FiX } from 'react-icons/fi';

interface AdminLayoutProps {
  children: ReactNode;
}

const SidebarItem = ({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active: boolean }) => (
  <Link 
    href={href}
    className={`flex items-center px-6 py-4 transition-all duration-300 font-agenda uppercase tracking-widest text-xs ${
      active 
        ? 'bg-neutral-off-black text-white border-r-2 border-primary-red' 
        : 'text-neutral-medium-grey hover:bg-neutral-off-black hover:text-white'
    }`}
  >
    <Icon className="w-4 h-4 mr-3" />
    <span className="font-bold">{label}</span>
  </Link>
);

const SidebarSection = ({ title, children }: { title: string, children: ReactNode }) => (
  <div className="mb-2">
    <div className="px-6 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-medium-grey">
      {title}
    </div>
    {children}
  </div>
);

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    // Await this — navigating away before the response lands could drop the
    // Set-Cookie header that actually clears the session cookie.
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Network hiccup: localStorage is already cleared, and the cookie will
      // simply expire on its own in the worst case. Still proceed to login.
    }
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-neutral-bg-light">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-neutral-black text-white flex flex-col fixed h-full z-30 border-r border-neutral-off-black transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="h-20 border-b border-neutral-off-black flex items-center justify-center bg-neutral-black">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-white font-agenda">
            TAO<span className="text-primary-red">ARC</span>
          </h1>
        </div>
        
        <nav className="flex-1 py-6 space-y-0 overflow-y-auto">
          <SidebarSection title="Overview">
            <SidebarItem 
              icon={FiHome} 
              label="Dashboard" 
              href="/admin/dashboard" 
              active={pathname === '/admin/dashboard'} 
            />
          </SidebarSection>

          <SidebarSection title="Content">
            <SidebarItem 
              icon={FiGrid} 
              label="Projects" 
              href="/admin/projects" 
              active={pathname.startsWith('/admin/projects')} 
            />
            <SidebarItem 
              icon={FiLayers} 
              label="Services" 
              href="/admin/services" 
              active={pathname.startsWith('/admin/services')} 
            />
            <SidebarItem 
              icon={FiUsers} 
              label="Studio / Team" 
              href="/admin/studio" 
              active={pathname.startsWith('/admin/studio')} 
            />
            <SidebarItem 
              icon={FiEdit3} 
              label="Page Content" 
              href="/admin/pages" 
              active={pathname.startsWith('/admin/pages')} 
            />
            <SidebarItem 
              icon={FiHome} 
              label="Home Config" 
              href="/admin/home" 
              active={pathname.startsWith('/admin/home')} 
            />
          </SidebarSection>

          <SidebarSection title="Inbox">
            <SidebarItem 
              icon={FiFileText} 
              label="Applications" 
              href="/admin/careers" 
              active={pathname.startsWith('/admin/careers')} 
            />
            <SidebarItem 
              icon={FiMail} 
              label="Messages" 
              href="/admin/contact" 
              active={pathname.startsWith('/admin/contact')} 
            />
          </SidebarSection>

          <SidebarSection title="System">
            <SidebarItem 
              icon={FiBarChart2} 
              label="Observability" 
              href="/admin/observability" 
              active={pathname.startsWith('/admin/observability')} 
            />
            <SidebarItem 
              icon={FiSettings} 
              label="Settings" 
              href="/admin/settings" 
              active={pathname === '/admin/settings'} 
            />
          </SidebarSection>
        </nav>

        <div className="p-4 border-t border-neutral-off-black bg-neutral-black">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-medium-grey hover:text-primary-red transition-colors border border-transparent hover:border-neutral-off-black"
          >
            <FiLogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto bg-neutral-bg md:ml-64 flex flex-col relative">
        {/* Mobile Top Bar */}
        <div className="md:hidden h-14 bg-neutral-black text-white flex items-center px-4 shrink-0 shadow-sm sticky top-0 z-10">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-white hover:text-primary-red transition-colors"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold tracking-[0.2em] text-white font-agenda ml-4">
            TAO<span className="text-primary-red">ARC</span>
          </h1>
        </div>

        <div className="flex-1 p-4 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
