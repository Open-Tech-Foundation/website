import { Link, router } from "@opentf/web";

// Mobile top-level navigation.
//
// The @opentf/web-docs navbar only moves its links into a drawer on pages that mount a
// <Sidebar> (`:root[data-otfw-has-sidebar]`). This site has no sidebar anywhere, so
// below the theme's 768px breakpoint the links would stay in the bar and overflow it.
// global.css hides `.otfw-navbar-nav` there and this strip takes over: a scrollable row
// of pills under the bar, driven by the same `config.docs.nav` array.
//
// Active state follows the theme's own NavbarLink rule — exact match, or a section
// prefix — read straight off the reactive `router.pathname`.
export default function MobileNav(props) {
  const links = props.links || [];

  return (
    <nav aria-label="Primary mobile" class="mobile-nav">
      <ul class="mobile-nav-list">
        {links.map((l) => {
          const isActive =
            router.pathname === l.href ||
            router.pathname.startsWith(l.href + "/");
          return (
            <li>
              <Link
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                class={
                  isActive ? "mobile-nav-link is-active" : "mobile-nav-link"
                }
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
