# shadcn/ui Components Inventory

Status: **None of these components are currently imported by the page sections** (Navigation, Hero, Services, Portfolio, About, Contact). All page sections use raw Tailwind CSS classes and Framer Motion directly.

These components are available for future use when expanding the site.

## Available Components (46)

| Component | File | External Dependency |
|-----------|------|-------------------|
| Accordion | accordion.tsx | @radix-ui/react-accordion |
| Alert | alert.tsx | — |
| Alert Dialog | alert-dialog.tsx | @radix-ui/react-alert-dialog |
| Aspect Ratio | aspect-ratio.tsx | @radix-ui/react-aspect-ratio |
| Avatar | avatar.tsx | @radix-ui/react-avatar |
| Badge | badge.tsx | — |
| Breadcrumb | breadcrumb.tsx | — |
| Button | button.tsx | @radix-ui/react-slot, class-variance-authority |
| Calendar | calendar.tsx | react-day-picker |
| Card | card.tsx | — |
| Carousel | carousel.tsx | embla-carousel-react |
| Chart | chart.tsx | recharts |
| Checkbox | checkbox.tsx | @radix-ui/react-checkbox |
| Collapsible | collapsible.tsx | @radix-ui/react-collapsible |
| Command | command.tsx | cmdk |
| Context Menu | context-menu.tsx | @radix-ui/react-context-menu |
| Dialog | dialog.tsx | @radix-ui/react-dialog |
| Drawer | drawer.tsx | vaul |
| Dropdown Menu | dropdown-menu.tsx | @radix-ui/react-dropdown-menu |
| Form | form.tsx | react-hook-form |
| Hover Card | hover-card.tsx | @radix-ui/react-hover-card |
| Input | input.tsx | — |
| Input OTP | input-otp.tsx | input-otp |
| Label | label.tsx | @radix-ui/react-label |
| Menubar | menubar.tsx | @radix-ui/react-menubar |
| Navigation Menu | navigation-menu.tsx | @radix-ui/react-navigation-menu |
| Pagination | pagination.tsx | — |
| Popover | popover.tsx | @radix-ui/react-popover |
| Progress | progress.tsx | @radix-ui/react-progress |
| Radio Group | radio-group.tsx | @radix-ui/react-radio-group |
| Resizable | resizable.tsx | react-resizable-panels |
| Scroll Area | scroll-area.tsx | @radix-ui/react-scroll-area |
| Select | select.tsx | @radix-ui/react-select |
| Separator | separator.tsx | @radix-ui/react-separator |
| Sheet | sheet.tsx | @radix-ui/react-dialog |
| Sidebar | sidebar.tsx | — (uses other ui components) |
| Skeleton | skeleton.tsx | — |
| Slider | slider.tsx | @radix-ui/react-slider |
| Sonner | sonner.tsx | sonner |
| Switch | switch.tsx | @radix-ui/react-switch |
| Table | table.tsx | — |
| Tabs | tabs.tsx | @radix-ui/react-tabs |
| Textarea | textarea.tsx | — |
| Toggle | toggle.tsx | @radix-ui/react-toggle |
| Toggle Group | toggle-group.tsx | @radix-ui/react-toggle-group |
| Tooltip | tooltip.tsx | @radix-ui/react-tooltip |

## Utilities

| File | Status | Description |
|------|--------|-------------|
| utils.ts | Shared | `cn()` — clsx + tailwind-merge class helper |
| use-mobile.ts | Unused | `useIsMobile()` hook — window.matchMedia breakpoint detection |
