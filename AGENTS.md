# Project Architecture Rules

This project is a minimal, idiomatic Node.js web app using:
- Express
- TypeScript (strict)
- Nunjucks
- GOV.UK Frontend
- MOJ Frontend

## Page Structure

Each page MUST live in its own folder under `src/pages`.

Example:
src/pages/
  home/
    index.ts
    view.njk
  moj-example/
    index.ts
    view.njk

Rules:
- Each page folder contains:
  - `index.ts`: an Express Router responsible only for routing and rendering
  - `view.njk`: the Nunjucks template for that page
- Pages must not share templates (except `views/layout.njk`)
- No inline routes in `server.ts`

## Routing

- `server.ts` is responsible only for:
  - app setup
  - Nunjucks configuration
  - mounting page routers
- All routes must be mounted via `app.use("/path", pageRouter)`

## Views

- Global layout lives in `views/layout.njk`
- Page templates live alongside their controller under `src/pages/**/view.njk`
- Nunjucks search paths include:
  - `views/`
  - `src/pages/`
  - `node_modules/govuk-frontend/dist`
  - `node_modules/@ministryofjustice/frontend`

## Design System Usage

- Use GOV.UK and MOJ Nunjucks macros directly
- Do not copy frontend assets into the project
- Serve assets directly from `node_modules`

## Constraints

- No React
- No MVC frameworks
- No additional abstractions
- Keep code simple, explicit, and idiomatic Express
