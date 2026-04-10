export default {
  "*.{js,ts,tsx}": [
    "pnpm exec nx affected -t lint --files"
  ],
  "*.{css,scss}": [
    "pnpm exec nx affected -t lint --files"
  ],
  "*.{md,json}": [
    "prettier --write"
  ]
};
