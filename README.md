# Asset Registry

Simple IT Asset Inventory & Lifecycle Management prototype. Implements core backend services with pluggable data providers and minimal API.

## Development

```bash
npm install # install dependencies (requires internet)
DATA_BACKEND=memory npm run dev
```

## Tests

```bash
npm test
```

## Environment

- `DATA_BACKEND` selects data provider (`memory`|`sheet`|`postgres`|`azure`). Currently only an in-memory provider is fully implemented.

## Scripts

- `scripts/seed.ts` seeds sample data into the in-memory provider.

## Note

This repository includes scaffolding for a full-stack asset management system. Due to environment limits, external adapters (Google Sheets, Postgres, Azure) are placeholders and require further implementation.
