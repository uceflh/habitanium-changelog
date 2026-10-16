# Habitanium team changelog

This repository publishes the Habitanium team's changelog at
<https://changelog.habitanium.com>. The changes, stories, pull requests and
screenshots are encrypted (`.bin` files on the `gh-pages` branch) and open
only with the team password.

The workflow in `.github/workflows/publish.yml` rebuilds the site every 15
minutes from the private repository, with a read-only key. The setup steps
are in that repository's `docs/ops/changelog-site.md`.
