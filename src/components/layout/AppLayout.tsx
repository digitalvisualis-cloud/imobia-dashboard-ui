import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="hidden md:block sticky top-0 h-screen">
        <AppSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
