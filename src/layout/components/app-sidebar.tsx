import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/core/components/ui/sidebar';
import { cn } from '@/core/lib/utils';
import { SidebarNavMain } from '@/layout/components/sidebar-nav-main';
import { SidebarNavSecondary } from '@/layout/components/sidebar-nav-secondary';
import { SidebarTitle } from '@/layout/components/sidebar-title';
import { SidebarUser } from '@/layout/components/sidebar-user';
import { useNavigationItems } from '@/layout/hooks/use-navigation-items';

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const navItems = useNavigationItems();

  return (
    <Sidebar
      className={cn('border-none', className)}
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarTitle />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarNavMain groups={navItems.main} />
        <SidebarNavSecondary items={navItems.secondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}
