import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b border-border bg-background px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu size={18} />
      </button>

      <div className="flex-1" />

      <Link to="/dashboard/profile" className="flex min-w-0 items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 transition-colors hover:bg-accent">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
          {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="hidden min-w-0 text-left leading-tight sm:block">
          <div className="truncate text-sm font-medium">{user?.username || 'User'}</div>
          <div className="truncate text-[11px] uppercase tracking-wide text-muted-foreground">{user?.role || 'Member'}</div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
