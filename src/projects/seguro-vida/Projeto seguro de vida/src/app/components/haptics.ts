/**
 * Haptic feedback utility using the Vibration API
 * Provides different intensity patterns for various interaction types.
 * Falls back silently on devices/browsers without vibration support.
 */

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

/** Light tap — tab switch, small toggle, selection */
export function hapticLight() {
  vibrate(6);
}

/** Medium tap — button press, card tap, navigation */
export function hapticMedium() {
  vibrate(12);
}

/** Heavy tap — confirm action, sinistro, destructive */
export function hapticHeavy() {
  vibrate(20);
}

/** Success — completion feedback */
export function hapticSuccess() {
  vibrate([8, 60, 8]);
}

/** Warning — alert, error, attention */
export function hapticWarning() {
  vibrate([12, 40, 12, 40, 12]);
}

/** Soft selection tick — list item, option pick */
export function hapticTick() {
  vibrate(4);
}
