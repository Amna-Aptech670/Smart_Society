import React from 'react'
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-end px-6 gap-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
         {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
        </div>
        <span className="text-sm font-medium">{user?.username || 'User'}</span>
      </div>
    </header>
  );
};

export default Header;