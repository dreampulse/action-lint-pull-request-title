# action-lint-pull-request-title

This is a [Github Action](https://github.com/features/actions) that ensures that your PR title matches the [Commitlint Spec](https://github.com/conventional-changelog/commitlint) according to the configuration file.

This is helpful when using the "Squash and merge" strategy, Github will suggest to use the PR title as the commit message. With this action you can validate that the PR title will lead to a correct commit message.

## Validation

Examples for valid PR titles:
- fix(some-scope): correct typo.
- feat(scope): add support for Node 12.

### The commit config

This actions uses the following commitlint configuration

```
{
  "body-leading-blank": [1, "always"],
  "body-max-line-length": [2, "always", 100],
  "footer-leading-blank": [1, "always"],
  "footer-max-line-length": [2, "always", 100],
  "header-max-length": [2, "always", 100],
  "scope-empty": [2, "never"],
  "scope-case": [2, "always", "lower-case"],
  "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
  "subject-empty": [2, "never"],
  "subject-full-stop": [2, "never", "."],
  "type-case": [2, "always", "lower-case"],
  "type-empty": [2, "never"],
  "type-enum": [
    2,
    "always",
    ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]
  ]
}
```

You can adjust the `commitlint.config.js` if required.


## Example github action config in your project

```yml
name: "Lint PR Title"
on:
  pull_request_target:
    types:
      - opened
      - edited
      - synchronize

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: dreampulse/action-lint-pull-request-title@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
