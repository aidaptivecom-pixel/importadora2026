// New HoyPage Layout - NBA + Hitos row, 3 equal cards, full width Pagos
// This file documents the layout changes made to the Hoy page

/*
Layout Structure:
1. Header row with greeting and timestamp
2. 4 KPI cards row (Operaciones, Caja, Embarques, Alertas)
3. Row 1: Next Best Actions (col-span-2) + Próximos Hitos (col-span-1)
4. Row 2: Operaciones en Riesgo + Docs Faltantes + Stock Crítico (3 equal h-[240px] cards)
5. Row 3: Pagos Próximos (full width table)

Changes from previous layout:
- NBA now on top left with Hitos on right (was: NBA full width)
- Three middle cards now have equal heights h-[240px] (was: h-[220px])
- Pagos Próximos now full width at bottom (was: in 2-column layout with Hitos)
- Added mockup data to ensure cards have sufficient content:
  - mockupOpsRiesgo: 2 additional operations if needed
  - mockupStock: 3 additional stock items if needed
  - mockupDocs: 4 additional doc entries if needed
*/

export const HOY_LAYOUT_VERSION = '2.0';
export const LAYOUT_DATE = '2026-01-14';
