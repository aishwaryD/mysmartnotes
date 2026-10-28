import React from 'react';
import Link from '@docusaurus/Link';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              { cause: error },
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

function MobileSearchLink() {
  return (
    <Link
      className="navbar__item clean-btn msn-mobile-search-trigger"
      to="/search"
      aria-label="Search chapters"
      title="Search chapters">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </Link>
  );
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  return (
    <>
      <NavbarContentLayout
        left={
          <>
            <NavbarLogo />
            <NavbarItems items={leftItems} />
          </>
        }
        right={
          <>
            <Link className="msn-saved-shortcut" to="/saved" aria-label="Saved chapters" title="Saved chapters"><svg aria-hidden="true" width="17" height="19" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 2h12v18l-6-4-6 4z"/></svg><span>Saved chapters</span></Link>
            <MobileSearchLink />
            {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
            <NavbarItems items={rightItems} />
          </>
        }
      />
    </>
  );
}
