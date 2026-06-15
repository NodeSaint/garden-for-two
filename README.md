# A Garden for Two

A tiny pixel-art garden that two people grow together, one flower at a time. It is
static and backendless: there is no login and no server. The entire garden lives
inside a single link, compressed with lz-string, so you grow it by passing the URL
back and forth.

## How the link-passing loop works

On your turn you plant up to three flowers and water the garden to help things grow
(seed → sprout → bud → bloom). Each flower carries a short note and remembers who
planted it; tap a flower to read it. When you are done, the app encodes the whole
garden into a link. Send that link to the other person. They open it, see your
garden, take their turn, and send a fresh link back. Repeat for as long as you like.

## Sceneries

Pick one of three backdrops for your garden:

- **Spring Meadow**
- **Moonlit Garden**
- **Seaside Garden**

## Develop

```
npm run dev      # local dev server
npm test         # unit tests (vitest)
npm run e2e      # playwright (chromium + webkit)
npm run build    # production build to dist/
```

## Deploy

The build is fully static, so it deploys to GitHub Pages with no extra services.
Run `npm run build` and publish the `dist/` folder (push `dist` to your Pages
branch, or serve it from the `main` branch).

## Licence

MIT. See [LICENSE](./LICENSE) and [CREDITS.md](./CREDITS.md).
