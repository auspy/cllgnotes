## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages
## Apps
- `web`: a [Next.js](https://nextjs.org/) app
- `api`: a GraphQl based backend
## Packages
- `ui`: a stub React component library shared by both frontend applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `types`: `types` used throughout the monorepo
- `logger`: `logger` functions used throughout the monorepo

### Prerequisites

`pnpm` : need to install [pnpm](https://pnpm.io/installation) as package manager

### Install

Install dependencies before running dev or build commands

```
cd cllgnotes
pnpm install
```

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```
