# Changelog

All notable changes to this project are documented here.

## [Unreleased] — initial build (branch: dev)

- Static, backendless React + TypeScript pixel-art game; entire garden state encoded in the URL via lz-string (no backend, no login).
- Core loop: plant up to 3 flowers per turn + water to grow (seed→sprout→bud→bloom), each flower carries an ≤80-char note and remembers who planted it; tap a flower to read it.
- Three choosable sceneries: Spring Meadow, Moonlit Garden, Seaside Garden.
- 6 flower types × 6 colour palettes, rendered from in-repo pixel matrices to a scaled, pixelated canvas; sway + bloom-in animation.
- Share sheet with a safe clipboard fallback (no false "copied" on failure) + WhatsApp deep link.
- Pure model + codec fully unit-tested; component tests via Testing Library.
