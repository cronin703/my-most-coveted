/**
 * Set once the app has hydrated after the first full page load. Lets components
 * tell "first paint of the session" apart from a later client-side navigation.
 */
let hydrated = false;

export function markHydrated() {
  hydrated = true;
}

export function isHydrated() {
  return hydrated;
}
