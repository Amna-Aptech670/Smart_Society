import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, ChevronDown } from 'lucide-react';
import { navConfig } from '../config/navConfig';
import { logout } from '../store/authSlice';

const Sidebar = ({ mobileOpen, onClose }) => {
  const role = useSelector((state) => state.auth.role);
  const links = navConfig[role] || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState(() => {
  const activeParent = links.find((l) => l.children?.some((c) => location.pathname === `/dashboard/${c.path}`));
  return activeParent ? activeParent.label : null;
});

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    if (mobileOpen) {
      onClose?.();
    }
    // Intentionally close the mobile drawer when navigation changes.
  }, [location.pathname]);

  const isGroupActive = (children) =>
    children.some((c) => location.pathname === `/dashboard/${c.path}`);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-64 max-w-[85vw] -translate-x-full flex-col border-r border-sidebar-border bg-sidebar shadow-xl transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none ${
        mobileOpen ? 'translate-x-0' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3 p-5 sm:p-6 lg:justify-start">
        <h1 className="font-heading text-2xl text-sidebar-primary">SmartSociety</h1>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-sidebar-border px-3 py-1.5 text-xs text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
        >
          Close
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {links.map((link) => {
          if (link.children) {
            const active = isGroupActive(link.children);
            const isOpen = openGroup === link.label;
            return (
              <div key={link.label}>
                <button
                  onClick={() => setOpenGroup(isOpen ? null : link.label)}
                  className={`flex items-center justify-between w-full gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
                >
                  <span className="flex items-center gap-3">
                    <link.icon size={18} />
                    {link.label}
                  </span>
                  <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="mt-1 ml-6 space-y-1 border-l border-sidebar-border pl-3">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={`/dashboard/${child.path}`}
                        end
                        onClick={onClose}
                        className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/80 hover:bg-sidebar-accent'}`}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink key={link.path} to={link.path === '' ? '/dashboard' : `/dashboard/${link.path}`} end={link.path === ''} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
              <link.icon size={18} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
