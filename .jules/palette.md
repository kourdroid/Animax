# Palette's Journal

This journal records critical UX and accessibility learnings.

## Format
`## YYYY-MM-DD - [Title]`
`**Learning:** [UX/a11y insight]`
`**Action:** [How to apply next time]`

## 2026-02-04 - Search Card Interaction & Accessibility
**Learning:** Users expect the entire card surface (especially images) to be clickable. Restricting links to text areas creates friction. Loading states without `role="status"` are invisible to screen readers.
**Action:** Wrap full card components in `Link` tags for better affordance. Ensure all async states have proper ARIA attributes.
