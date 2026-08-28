# Sajad Web

Personal portfolio website built with Next.js App Router, React, TypeScript, Tailwind CSS v4, GSAP, and Three.js/react-three-fiber.

This README is the implementation handoff. It describes the code that exists in this repository today, including unfinished or disconnected areas. Treat the source files as the final authority when this document and an older comment disagree.

## Current state

The repository contains two portfolio implementations in different stages:

1. The root home route (`/`) is wired and composed from the files in `components/`. It is a full-screen, section-based vanLent-style portfolio with a light/dark theme.
2. The routes `/works`, `/works/[slug]`, `/contact`, `/achievements`, and `/certificates` reference a second Sajad-style component tree. Those imported folders are not present in the current workspace, so these routes are incomplete and the project may fail lint/build until the missing components are restored or the routes are removed.

Do not assume a listed feature is active just because an implementation exists. In particular, the `MeshBlob` and `ParticleSphere` calls are commented out in the active `Hero`, `About`, `SelectedWork`, `Services`, and `Contact` components.

## Run locally

Requirements: Node.js compatible with Next.js 16 and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Available scripts:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run lint` | Run ESLint using the Next.js Core Web Vitals and TypeScript presets. |
| `npm run build` | Create a production build and run Next.js type validation. |
| `npm start` | Serve the production build. |

## Architecture

### Root layout and home composition

- `app/layout.tsx` defines global metadata, loads `app/globals.css`, and wraps all pages in `ThemeProvider`.
- `app/page.tsx` is a client component. It creates the six active sections and passes them to `ScrollExperience` along with `Header`.
- The home section order is fixed: `hero`, `marquee`, `work`, `about`, `services`, `contact`.
- The `@/*` alias resolves to the repository root, as configured in `tsconfig.json`.

### Section contract

`components/ScrollExperience.tsx` defines the shared `SlideRenderProps` contract:

```ts
type SlideRenderProps = {
	active: boolean;
	entering: boolean;
	beatSignal: number;
};
```

Every section should render one outer element with `data-slide-content`. `active` is true for the current section and the section entering during a transition. `entering` is true only for the pending destination. `beatSignal` increments when that section is left and is intended to drive a one-shot visual reaction.

## Navigation and scrolling

`ScrollExperience` owns the viewport:

- It locks `html` and `body` native scrolling while mounted.
- Sections are absolutely stacked inside a fixed `100dvh` container.
- Wheel, Arrow Up/Down, Page Up/Down, and touch swipes call `goTo`.
- A section with an overflowing internal scroll area consumes wheel/touch movement until its top or bottom edge is reached.
- Navigation is locked during a transition. The GSAP sequence is `BEAT` (0.28s), `EXIT` (0.42s), a 0.06s overlap gap, and `ENTER` (0.5s).
- Right-side dot buttons and header navigation use the same `goTo(number | id)` path through `useScrollExperience()`.

When adding a section, update the `sections` array in `app/page.tsx`. Give it a unique id and label, and keep the rendered content inside `[data-slide-content]` so the GSAP transition can find it.

## Active home components

### `components/Header.tsx`

Fixed header with the VAN/LENT home button, mobile menu overlay, EN/NL toggle, and AM/PM theme button. The language toggle currently changes local state only; it does not translate content. Menu links target the section ids `work`, `about`, `services`, and `contact`.

### `components/Hero.tsx`

Three-column hero with “SHAPING CONCEPTS” and “BUILDING EXPERIENCES” copy, placeholder contact details, Amsterdam/availability labels, and hover-only developer labels. The dynamic import and rendered `MeshBlob` are currently commented out, so the center currently contains only brackets and labels.

### `components/Marquee.tsx`

The divider section. Keep its animation section-aware when changing it; the scroll experience can mount every section even though only the active/entering section is interactive.

### `components/SelectedWork.tsx`

Client-side carousel over a local `PROJECTS` array of three placeholder projects. Prev/next buttons wrap around. The open-project button has no destination yet. The `MeshBlob` import/use is commented out.

### `components/About.tsx`

Bio, a `react-icons/si` technology list, a contact anchor, and a placeholder visual panel. The `STACK` array is the source of truth for displayed technology icons. The `MeshBlob` display is commented out.

### `components/Services.tsx`

Six services and three testimonials are defined in local arrays. The service advances every 4.5 seconds while the section is active; testimonial navigation is manual. The stats are hard-coded. The `MeshBlob` display is commented out.

### `components/Contact.tsx`

Contact information, placeholder WhatsApp/privacy/terms links, and a client-only form. Submission prevents the browser default, shows “Message sent” for three seconds, and sends no network request. Add a server action or API endpoint before treating this as a real contact form. The `ParticleSphere` display is commented out.

## Theme and visual system

`app/theme-context.tsx` exposes `useTheme()` with `theme: "light" | "dark"` and `toggle()`.

- Initial render defaults to light.
- On the client, localStorage key `theme` wins; otherwise `prefers-color-scheme: dark` is used.
- The selected value is persisted in localStorage and written to `html[data-theme]`.
- Colors are CSS variables in `app/globals.css`; use these variables instead of hard-coded theme colors where possible.
- Light and dark variables include `--bg`, `--fg`, `--fg-muted`, `--fg-faint`, `--line`, `--line-strong`, `--accent`, `--surface`, `--surface-strong`, and `--mesh-color`.
- Shared visual utilities include `.grid-bg`, `.eyebrow`, `.hairline`, `.dev-label`, `.corner-bracket`, `.reveal`, and `.no-scrollbar`.
- The project currently uses an offline system font stack. Do not add a font dependency without deciding whether offline behavior still matters.
- `prefers-reduced-motion: reduce` shortens CSS animations/transitions and disables smooth scrolling.

Most layout styling is Tailwind utility classes. Keep component-specific CSS in a colocated CSS/module file when a utility class would become difficult to read.

## 3D and animation utilities

These files are reusable but not all are currently mounted by the active home sections:

- `components/MeshBlob.tsx`: client-only react-three-fiber canvas using an icosahedron point cloud and a custom GLSL simplex-noise displacement shader. It reacts to theme changes and `beatSignal`; inactive instances fall back to a CSS radial gradient.
- `components/ParticleSphere.tsx`: two counter-rotating random point spheres. It also has an inactive CSS fallback.
- `components/Home/SelectedWorks/three/`: a separate visual system containing procedural `NetworkStructure`, `PointCloudStructure`, and `WireframeBuilding` scenes used by the newer selected-works implementation.
- `components/Home/SelectedWorks/hooks/`: `useMousePosition` stores normalized cursor position in a ref, and `useTilt` supplies pointer-driven card tilt handlers.
- `components/useReveal.ts`: IntersectionObserver hook that adds `.in-view` once an element reaches 15% visibility.

If re-enabling a WebGL component, preserve its `next/dynamic(..., { ssr: false })` boundary. Keep expensive geometry in `useMemo`, clean up GSAP/animation effects, and pass `active` so off-screen canvases do not consume WebGL contexts.

## Data, assets, and links

The active home carousel uses the local `PROJECTS` constant in `components/SelectedWork.tsx`. The newer selected-works data model is in `components/Home/SelectedWorks/data/projects.ts` and supports:

- `slug`, `index`, `title`, `category`, `description`, and `stack`
- a `gallery` of `{ src, device, label }`
- optional `liveUrl`

Public assets are under `public/works/`. Asset URLs used in JSX must start with `/` and are resolved relative to `public`, for example `/works/psychologist-portal/thumb-1.jpg`. Check that the referenced file exists before adding it to data. Some newer data entries use `/work/...` while the visible directory is `/works/...`; verify and normalize those paths when restoring that implementation.

External links and content are intentionally placeholders (`example.com`, `#`, fake phone/address/company data). Replace them deliberately and audit accessibility labels when doing so.

## Secondary routes and unfinished tree

The following route files currently import missing modules:

| Route | Expected pieces |
| --- | --- |
| `/works` | `WorksHeader`, `SplitScrollGallery` |
| `/works/[slug]` | `work-detail-data`, `WorkDetailHeader`, `WorkImageLayout`, `WorkDetailInfo`, `Footer` |
| `/contact` | `ContactPanel`, `Footer` |
| `/achievements` | `AchievementsHeader`, `AchievementsShowcase`, `Footer` |
| `/certificates` | `CertificatesHeader`, `CertificatesCabinet`, `Footer` |

The dynamic work route expects `params` as a Promise, uses `generateStaticParams()` from `workDetails`, generates per-work metadata, and calls `notFound()` for an unknown slug. Preserve those behaviors if rebuilding the missing tree.

There is also a separate `components/Home/Navbar/` implementation with `am`/`pm` theme values and `#top/#lab` links. It is not used by `app/page.tsx`; do not mix it with the active `Header`/`ThemeProvider` without first choosing one navigation and theme contract.

## Safe extension checklist

1. Identify whether the change belongs to the active root home or the unfinished secondary route tree.
2. Read the owning component and its nearest data/constants before editing.
3. For a new home section, add it to `app/page.tsx`, give it a stable id, and implement `SlideRenderProps`.
4. For a new project, update the relevant data source and verify every public image path.
5. Keep contact, legal, and project URLs real or clearly marked as placeholders; never silently leave `#` links in a production release.
6. Keep client-only browser, GSAP, and Three.js work inside client components/effects and use SSR-disabled dynamic imports for WebGL.
7. Run `npm run lint`, then `npm run build`. A build failure in the current baseline may come from the missing secondary-route imports described above.

## Project map

```text
app/
	layout.tsx             Root metadata, global CSS, ThemeProvider
	page.tsx               Active home composition
	globals.css            Theme tokens and shared CSS utilities
	theme-context.tsx      Light/dark theme persistence
	achievements/          Incomplete secondary route
	certificates/          Incomplete secondary route
	contact/               Incomplete secondary route
	works/                 Incomplete listing and dynamic detail routes
components/
	ScrollExperience.tsx   Full-screen navigation state machine
	Header.tsx             Active home header/menu
	Hero.tsx               Active home hero
	Marquee.tsx            Active divider
	SelectedWork.tsx       Active placeholder project carousel
	About.tsx              Active about section
	Services.tsx           Active services/testimonials section
	Contact.tsx            Active client-only contact form
	MeshBlob.tsx            Reusable WebGL blob
	ParticleSphere.tsx     Reusable WebGL particle sphere
	Home/                  Separate, partially disconnected Sajad implementation
public/works/             Existing project image assets
```
