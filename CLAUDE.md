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

**Everything is in `src/App.tsx`** (~9700 lines) plus `src/styles.css` (~1700 lines). There is no component-file splitting — types, seed data, pure helper/`computeXAlerts` functions, the `App()` root component, the seven page components, shared UI primitives, and every create/approve drawer or modal all live in this one file, roughly top-to-bottom in that order. Search by function/type name rather than expecting a directory structure.

### State

One big `DemoState` object (rooms, reservations, orders, purchaseRequests, purchaseOrders, inventoryItems, suppliers, stockMovements, stockTakes, activities, activityChecklists, safetyIncidents, kitchenChecklists, housekeepingChecklists, complaints, manualTasks, cashRegisters, expenses, nightAuditRuns, businessDay, clients, conferences, conferenceTasks, etc.) is created by `createSeedState()`, held in `useLocalDemoState()`, and persisted to `localStorage` under a versioned key (`storageKey = "blue-hills-erp-demo-vN"`, currently v8).

Every mutation goes through `save()` or, more commonly, `withAudit(nextState, message, actor)`, which also prepends an entry to `state.audit` (shown in the dashboard's "Recent Audit Trail"). Handlers in `App()` follow the same shape throughout: `withAudit({ ...state, someArray: [...] }, "human-readable audit line", "Actor Name")`.

**Bump `storageKey`'s version suffix whenever `DemoState`'s shape changes.** `useLocalDemoState()` does `{...createSeedState(), ...JSON.parse(stored)}` — a stale localStorage blob from an older shape gets shallow-merged over fresh seed data and can leave old-shaped records missing new required fields (this has caused real breakage across sessions; the fix each time was bumping the version so old clients just fall back to fresh seed data).

The "business date" is a hardcoded constant (`businessDateLabel`, currently `"Jul 02"` against `businessDateIso = "2026-07-02"`), separate from the real system clock (`todayIsoDate()`, `nowTime()`). Date pickers default to the real clock, but "is this submitted for *today*" checks compare against the fixed business date — so freshly-created checklists/orders can legitimately show "not submitted today" in a live demo. That's expected, not a bug.

### Navigation & pages

Seven top-level modules (`ModuleId`), switched via `activeModule` state and the `navigation` array: Dashboard, Front Office, Restaurant & Kitchen, Housekeeping & Activities, Procurement & Stores, Finance & Night Audit, Conferences & Events. Each is one large component (`Dashboard`, `FrontOffice`, `RestaurantKitchen`, `Operations`, `Procurement`, `Finance`, `Conference`) that receives `state` plus a pile of `onXxx` callbacks from `App()`.

### Finance: guest folios, revenue, and Night Audit

Finance is not a standalone ledger — it's a live read of every other module's data, per `FINANCE_AND_NIGHT_AUDIT_SPECIFICATION.md`. The key patterns:

- **`buildGuestFolio(state, reservation)`** is the one place a guest's charges get totalled: accommodation (`nights × rate`) + `PosOrder`s with `payment: "Room Charge"` matched by `order.guest === reservation.guest` + `ActivityBooking`s with `payment: "Room Charge"` matched the same way. It's reused by the reservation drawer, the check-out folio, and the Finance Guest Ledger table — don't recompute a guest's balance ad hoc in a new call site, call this instead.
- **`payment`/`settledAt` on `PosOrder` and `ActivityBooking`** track money, not kitchen/activity status. `payment` is `"Cash" | "Card" | "Room Charge"`; Cash/Card get `settledAt` stamped at creation (paid immediately), Room Charge orders/bookings only get `settledAt` when the guest's reservation is checked out (`confirmCheckOut` in `App()` stamps every matching unsettled order/booking). An unsettled Room Charge item is what makes `buildGuestFolio`'s `totalOutstanding` nonzero even when `reservation.balance` is already `0`.
- **`computeFinanceTotals(state)`** is the single source for revenue-by-department and payment-method-received figures — `App()`'s `totals.revenue`/`totals.outstanding` and `Dashboard`'s finance KPIs both read from it. Don't reintroduce a second, parallel revenue calculation (the module's biggest pre-existing bug was exactly that: a hardcoded `$640` KPI and a `balance === 0 ? 320 : 0` heuristic that didn't match this function at all).
- **Cash registers (`CashRegister`) are per-outlet sessions**, not a single global float: `computeExpectedCash(state, register)` derives expected cash from opening float + that outlet's cash receipts − paid out − refunds; `computeCashVariance` compares it to the manually counted `actualCash`. A register only reaches `"Variance Approved"` when a manager name is supplied alongside a nonzero variance.
- **Night Audit (`NightAuditRun`) is a real, persisted wizard**, not a checklist that resets on reload — `state.nightAuditRuns` holds the in-progress/completed run, `NIGHT_AUDIT_STEPS` is the six-step source of truth both the wizard UI and `closeBusinessDay()`'s validation iterate over. `closeBusinessDay()` refuses to run while any kitchen ticket is open, any today-departure hasn't checked out, any register is uncounted, or any variance is unapproved — these gates mirror the spec's business rules and should stay in sync with `NIGHT_AUDIT_STEPS` if you add/remove a step.
- **Closing Business Day does not advance `businessDateIso`/`businessDateLabel`.** Those are still the fixed constants described below — rolling them forward would touch every arrival/departure/date comparison in the app. Instead `state.businessDay.status` flips `"Trading"` → `"Closed"` to represent the day being locked (satisfies the spec's "can only close once" rule) without changing what "today" means elsewhere in the demo.

### Conferences & Events: the cross-department differentiator

Per `CONFERENCE_BOOKING.md`, a conference is a **project**, not a reservation — it's the module that most differentiates this ERP from a generic hotel PMS, since it's the one screen where accommodation, catering, activities, procurement and finance roll up under one client/budget. Key patterns:

- **`Conference` is a standalone entity** (`state.conferences`), linked out to other modules by an optional `conferenceId` field on `Reservation`, `PosOrder`, `PurchaseRequest`, and `ActivityBooking` — never by name-matching. A conference's rooms are however-many `Reservation`s share its `conferenceId` (this is how a multi-room group booking works, since `Reservation.room` is still a single room per record).
- **`computeConferenceFinancials(state, conference)`** is the live "actual vs budget" read: actual revenue sums linked reservations' `nights × rate` + linked `PosOrder.total` + linked `ActivityBooking.price`; actual procurement cost sums `PurchaseOrder`s whose `requestId` traces back to a linked `PurchaseRequest`. Don't recompute a conference's actuals ad hoc elsewhere — call this.
- **`generateConferenceProcurementItems(conference)`** is the "27 guests × 2 nights × meal package → procurement list" auto-calculation from the spec, driven by `CONFERENCE_PROCUREMENT_TEMPLATE` (per-guest-per-meal quantities for a fixed item list) and `CONFERENCE_MEAL_MULTIPLIER` (meals/day by package). `onGenerateProcurement` turns that into a real `PurchaseRequest` tagged with `conferenceId`, so it shows up in the normal Procurement & Stores approval flow.
- **`CONFERENCE_STATUS_ORDER` is the single source of truth for the status pipeline** — `advanceConferenceStatus` in `App()` walks it one step at a time and gates two transitions: into `"Planning"` (blocked until the deposit is fully received) and into `"Ready"` (blocked until `roomsRequired` rooms are allocated). Keep these gates in sync with the order if you add/remove a status.
- **Deliberately out of scope**: the spec's "Future Enhancements" (SMS/WhatsApp/Teams/Google Calendar sync, online enquiries, AI forecasting) all require internet connectivity and were cut to keep the module honest about the offline-first constraint — don't build stubs for them.

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
- `FINANCE_AND_NIGHT_AUDIT_SPECIFICATION.md` — the Finance module spec: revenue consolidation, guest ledger, payment/cash register handling, the 10-step Night Audit workflow (condensed to `NIGHT_AUDIT_STEPS`'s six in the implementation), and the business rules `closeBusinessDay()` enforces.
- `CONFERENCE_BOOKING.md` — the Conferences & Events module spec: the conference lifecycle, budget vs actual, automated procurement generation, and the cross-department task board.
- `*.docx` manuals (`Front Office Manual`, `KITCHEN AND DINING MANUAL`, `Outdoor Activities Manual`, `Food and Beverage Manual`) — the camp's actual paper procedures. The `Read` tool can't open `.docx` directly; extract text with a short Python script using `zipfile` + `xml.etree.ElementTree` against `word/document.xml`, walking paragraphs and table rows.

When a module diverges from these docs, that's usually the thing worth fixing — several past sessions here were gap audits against a specific manual followed by implementing the missing pieces.

### Verifying changes

There's no automated test suite, so the working pattern in this repo is: `npx tsc -b` + `npx vite build`, then run `npx vite --port <port>` in the background and drive it with Playwright (Chromium at `/opt/pw-browsers/chromium` in this environment) — click through the actual create/approve/reconcile flow and screenshot it, at both a desktop and a ~390px mobile viewport. Given how often "button has no handler" has been the actual bug, clicking the real UI catches things a typecheck won't.
