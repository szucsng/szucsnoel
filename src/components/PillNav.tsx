import React from 'react';
import { NavLink } from 'react-router-dom';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
}) => {
  return (
    <div className={`pillnav ${className}`} role="navigation" aria-label="Primary">
      {logo && (
        <div className="pillnav-logo">
          <NavLink to={items[0]?.href || '/'} aria-label="Home">
            <img src={logo} alt={logoAlt} style={{ width: 36, height: 36, borderRadius: '50%' }} />
          </NavLink>
        </div>
      )}

      <div className="pillnav-items">
        {items.map(item => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => (isActive ? 'pillnav-link pillnav-link-active' : 'pillnav-link')}
            aria-label={item.ariaLabel || item.label}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PillNav;
