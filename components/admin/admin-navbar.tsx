"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, FolderOpen, LogOut } from 'lucide-react';

interface AdminNavbarProps {
  onLogout: () => void;
}

export function AdminNavbar({ onLogout }: AdminNavbarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/admin',
      label: 'Articles',
      icon: FileText,
      active: pathname === '/admin'
    },
    {
      href: '/admin/projects',
      label: 'Projets',
      icon: FolderOpen,
      active: pathname === '/admin/projects'
    }
  ];

  return (
    <nav className="bg-orange-100 dark:bg-orange-900 border-b border-orange-200 dark:border-orange-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-orange-900 dark:text-orange-100 font-semibold">Administration</span>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    item.active
                      ? 'bg-orange-500 text-white'
                      : 'text-orange-700 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center space-x-2 px-4 py-2 text-orange-700 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800 rounded-lg transition-colors duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </nav>
  );
}
