import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobileNav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 lg:flex lg:bg-white">
      <Sidebar />
      <div className="flex-1 min-w-0 h-full overflow-hidden">
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
