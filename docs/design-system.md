# Design System

## Direction

- Premium dark mode only for v1
- Dark fantasy-tech aesthetic
- Clean, readable, modern panels
- Image-first, but resilient when assets are missing

## Typography

- Primary font: Inter
- Headings:
  - strong weight
  - tight tracking
  - short line lengths
- Body:
  - high-contrast stone palette
  - generous line-height

## Color tokens

- Background: `#090a10`
- Panel: `#11131b`
- Panel alt: `#171924`
- Border: `rgba(255,255,255,0.1)`
- Foreground: `#f5f5f4`
- Muted: `#a8a29e`

### Semantic accents

- Green = team buffs
- Red = boss debuffs
- Purple = companions and enhancements
- Orange = mounts and insignias
- Gold = artifacts and special powers
- Blue = utility and system
- Teal = verified and selected

## Spacing scale

- 4
- 8
- 12
- 16
- 20
- 24
- 32
- 40
- 48
- 64

## Radius scale

- Chips: 12px
- Cards: 24px
- Panels: 28px

## Borders and shadow

- Soft borders with low-opacity white
- Large panel shadow for premium depth
- Internal contrast created through layered black and panel gradients

## Layout

- Desktop-first responsive shell
- Three-column desktop pattern:
  - left nav: ~300px
  - center content: fluid
  - right rail: ~360px
- Tablet/mobile collapse:
  - stacked content
  - nav and summary content remain accessible

## Component patterns

- Card:
  - rounded
  - layered background
  - subtle depth
- Badge/chip:
  - semantic color
  - compact uppercase labeling
- Inputs:
  - dark field surfaces
  - visible focus ring
- Summary rail:
  - compact stacked cards
  - status-first communication

## States

- Verified state: teal
- Partially recovered: blue
- Inferred: orange
- Needs live check: red
- Empty state: dashed border + explanation

## Motion

- Keep transitions subtle and structural
- Focus on hover/focus clarity rather than decorative animation in v1
