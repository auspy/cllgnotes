## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both frontend applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `types`: `types` used throughout the monorepo
- `logger`: `logger` functions used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```
cd cllgnotes
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd cllgnotes
pnpm dev
```