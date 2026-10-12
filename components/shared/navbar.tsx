"use client";

import Link from "next/link";
import {
  Bell,
  ChevronDown,
  CreditCard,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/service/logout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Resources", href: "#resources" },
];

type IUser = {
  success: boolean;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

type NavbarProps = {
  user: IUser | null;
};

export const Navbar = ({ user }: NavbarProps) => {

  const [isLogout, setIsLogout] = useState(false)
  const router = useRouter();
  const profile = user?.data?.profile;

  const name = profile?.name || "User";
  const email = profile?.email || "";
  const profilePhoto = profile?.profile?.profilePhoto;

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleLogout = async (action: string) => {
    if (action === "logout") {
      await logout();
      setIsLogout(true)
    }
  };

  useEffect(() => {
    if(isLogout) {
      toast.success("User Logged Out Successfully");
      router.push("/login")
    }
  }, [isLogout, router]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo and navigation */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-8">
          <Link
            href="#overview"
            className="flex shrink-0 items-center gap-2 font-semibold tracking-tight"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              N
            </span>

            <span className="hidden sm:inline">Next Js Press</span>
            <span className="sm:hidden">NJP</span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                  index === 0
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile navigation */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex size-9 items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Open main navigation"
              >
                <Menu className="size-5" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Navigate</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* User dropdown */}
        {
          user?.success ? (
            <DropdownMenu>
          <DropdownMenuTrigger className="flex shrink-0 items-center gap-2 rounded-md p-1.5 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar className="size-8">
              <AvatarImage src={profilePhoto || undefined} alt={name} />

              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {initials || "U"}
              </AvatarFallback>
            </Avatar>

            <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">
              {name}
            </span>

            <ChevronDown className="hidden size-4 text-muted-foreground sm:inline" />

            <span className="sr-only">Open user menu</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="truncate">{name}</span>

                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {email}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 size-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 size-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/billing">
                  <CreditCard className="mr-2 size-4" />
                  Billing
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/notifications">
                  <Bell className="mr-2 size-4" />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onSelect={() => handleLogout("logout")}
            >
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Log in
            </Link>
          )
        }
      </div>
    </header>
  );
};
