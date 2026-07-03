# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Blue Hills Camp Hospitality ERP — a local-first demo ERP (front office, restaurant/kitchen, housekeeping & activities, procurement & stores, finance) for a real Zimbabwean camp. Per `project_context.md.txt`, the non-negotiable design goal is **offline-first**: it must keep working with no internet, running on a LAN. There is currently no backend — this repo is a React SPA whose entire "database" is `localStorage`, standing in for the eventual LAN server.

## Commands

```bash
npm install
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build — always run this (or at least `npx tsc -b`) after changes, it's the only typecheck
npm run preview   # preview a production build
```

There is no test suite and no lint script configured — don't invent commands for either. Verification in this codebase means: `npx tsc -b`, `npx vite build`, and then actually driving the app (see "Verifying changes" below).

## Architecture

**Everything is in `src/App.tsx`** (~7700 lines) plus `src/styles.css` (~1600 lines). There is no component-file splitting — types, seed data, pure helper/`computeXAlerts` functions, the `App()` root component, the six page components, shared UI primitives, and every create/approve drawer or modal all live in this one file, roughly top-to-bottom in that order. Search by function/type name rather than expecting a directory structure.

### State

One big `DemoState` object (rooms, reservations, orders, purchaseRequests, purchaseOrders, inventoryItems, suppliers, stockMovements, stockTakes, activities, activityChecklists, safetyIncidents, kitchenChecklists, housekeepingChecklists, complaints, manualTasks, etc.) is created by `createSeedState()`, held in `useLocalDemoState()`, and persisted to `localStorage` under a versioned key (`storageKey = "blue-hills-erp-demo-vN"`).

Every mutation goes through `save()` or, more commonly, `withAudit(nextState, message, actor)`, which also prepends an entry to `state.audit` (shown in the dashboard's "Recent Audit Trail"). Handlers in `App()` follow the same shape throughout: `withAudit({ ...state, someArray: [...] }, "human-readable audit line", "Actor Name")`.

**Bump `storageKey`'s version suffix whenever `DemoState`'s shape changes.** `useLocalDemoState()` does `{...createSeedState(), ...JSON.parse(stored)}` — a stale localStorage blob from an older shape gets shallow-merged over fresh seed data and can leave old-shaped records missing new required fields (this has caused real breakage across sessions; the fix each time was bumping the version so old clients just fall back to fresh seed data).

The "business date" is a hardcoded constant (`businessDateLabel`, currently `"Jul 02"` against `businessDateIso = "2026-07-02"`), separate from the real system clock (`todayIsoDate()`, `nowTime()`). Date pickers default to the real clock, but "is this submitted for *today*" checks compare against the fixed business date — so freshly-created checklists/orders can legitimately show "not submitted today" in a live demo. That's expected, not a bug.

### Navigation & pages

Six top-level modules (`ModuleId`), switched via `activeModule` state and the `navigation` array: Dashboard, Front Office, Restaurant & Kitchen, Housekeeping & Activities, Procurement & Stores, Finance & Night Audit. Each is one large component (`Dashboard`, `FrontOffice`, `RestaurantKitchen`, `Operations`, `Procurement`, `Finance`) that receives `state` plus a pile of `onXxx` callbacks from `App()`.

### Conventions to follow when extending a module

- **Create flows use `Drawer` (side panel) or `Modal` (centered)**, wrapping `Field`-labeled inputs, with the primary action `disabled` until required fields are valid. The corresponding `App()` handler builds the new record and calls `withAudit`.
- **Status/severity renders via `<Badge label="..." />`**, which lowercases the label and maps it to a `.badge.<slug>` CSS rule in `styles.css` (grouped by color: green/orange/red/blue/grey). Reusing an existing status *string* automatically inherits that color even if the new meaning differs — check `styles.css`'s badge groups before picking a label, or use a distinctly-named label (e.g. an unsafe-to-operate checklist state was named "Course Closed" rather than "Closed" specifically because "Closed" already meant success-green for a different entity).
- **Alerts/attention items must be computed live from state**, never hardcoded JSX text. Every `computeXAlerts(...)`-style function (low stock, activity equipment, kitchen checklist, safety incidents) follows the same pattern: filter/derive from the relevant array, return a typed list, render via the shared `Attention` component. Hardcoded placeholder alerts have been a recurring bug found and fixed in this codebase — don't reintroduce one.
- **A module isn't done until it's on the Executive Dashboard.** `buildDashboardMetrics()` computes everything the `Dashboard` component's KPI row and Attention Queue read from; new workflows should add both a metric and (when actionable) an Attention Queue entry. `.kpi-grid` uses `repeat(auto-fit, minmax(220px, 1fr))` specifically so new KPI cards don't require touching breakpoint CSS.
- **Every "New X" button needs a real `onAction`/`onClick`.** The single most common bug found while extending this app has been a page action button or menu tile rendered with no handler at all (POS ordering, Activities booking, and Purchase Requests were all found completely non-functional this way before being wired up) — always confirm the button you add actually opens something.

### Responsive layout

- Sidebar is a normal flex column on desktop; below 960px it becomes an off-canvas drawer (`sidebarOpen` state + `.menu-toggle` hamburger + backdrop).
- Wide content (data tables, the occupancy density chart, checklist grids) must scroll horizontally *inside its own panel* (`.panel { overflow-x: auto }`), not the page — after layout changes, sanity-check `document.documentElement.scrollWidth <= clientWidth` at a mobile viewport width.
- Drawers/Modals become full-width bottom sheets under 640px automatically via the shared `.overlay`/`.drawer-panel`/`.modal-panel` CSS — new drawers get this for free as long as they're built with the existing `Drawer`/`Modal` wrapper components.

### Design reference docs (repo root)

- `UI_Guidelines.txt` — visual language: navy `#0F4C81` primary / gold `#C9A227` accent, Inter font, enterprise-density tables, badge color semantics.
- `project_context.md.txt` — business goals, non-negotiable offline/LAN requirement, the full department list the ERP is meant to eventually cover.
- `workflows.md.txt` — the target step-by-step workflow for each department (reservations, check-in/out, restaurant order, activities booking, purchase request, goods received, stock issue, night audit, etc.) — the spec each module's flow is digitizing.
- `*.docx` manuals (`Front Office Manual`, `KITCHEN AND DINING MANUAL`, `Outdoor Activities Manual`, `Food and Beverage Manual`) — the camp's actual paper procedures. The `Read` tool can't open `.docx` directly; extract text with a short Python script using `zipfile` + `xml.etree.ElementTree` against `word/document.xml`, walking paragraphs and table rows.

When a module diverges from these docs, that's usually the thing worth fixing — several past sessions here were gap audits against a specific manual followed by implementing the missing pieces.

### Verifying changes

There's no automated test suite, so the working pattern in this repo is: `npx tsc -b` + `npx vite build`, then run `npx vite --port <port>` in the background and drive it with Playwright (Chromium at `/opt/pw-browsers/chromium` in this environment) — click through the actual create/approve/reconcile flow and screenshot it, at both a desktop and a ~390px mobile viewport. Given how often "button has no handler" has been the actual bug, clicking the real UI catches things a typecheck won't.
