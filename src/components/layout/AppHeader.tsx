import { Bell, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import { useState } from "react";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

export function AppHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur md:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted md:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <VisuallyHidden><SheetTitle>Menu</SheetTitle></VisuallyHidden>
          <AppSidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Busca imóvel, lead, conversa..."
            className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-16 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
            ⌘K
          </kbd>
        </div>
      </div>

      <button
        type="button"
        className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Notificações"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
      </button>
    </header>
  );
}
