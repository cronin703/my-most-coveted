"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { markHydrated } from "@/lib/hydration";
import { mq } from "@/lib/motion";

/**
 * Route cross-fade using the View Transitions API (duration and easing in CSS:
 * --dur-route). Falls back to a normal navigation where unsupported or when the
 * visitor prefers reduced motion. Elements with the same view-transition-name on
 * both pages (e.g. a look image) morph between them.
 */
const NavigateContext = createContext<((href: string) => void) | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const finish = useRef<(() => void) | null>(null);

  useEffect(() => markHydrated(), []);

  // The new route has committed: let the browser animate to it.
  useEffect(() => {
    finish.current?.();
    finish.current = null;
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      const target = new URL(href, window.location.href);
      const samePage = target.pathname === window.location.pathname;
      if (
        samePage ||
        !("startViewTransition" in document) ||
        window.matchMedia(mq.reduce).matches
      ) {
        router.push(href);
        return;
      }
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            finish.current = resolve;
            router.push(href);
            window.setTimeout(resolve, 1500); // never hold the page if something stalls
          }),
      );
    },
    [router],
  );

  return <NavigateContext.Provider value={navigate}>{children}</NavigateContext.Provider>;
}

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Drop-in for next/link on internal links that should cross-fade. */
export function TransitionLink({ href, onClick, ...props }: Props) {
  const navigate = useContext(NavigateContext);
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      !navigate ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      !href.startsWith("/") ||
      href.startsWith("/#")
    ) {
      return;
    }
    event.preventDefault();
    navigate(href);
  };
  return <Link href={href} onClick={handleClick} {...props} />;
}
