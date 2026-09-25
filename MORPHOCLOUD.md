# MorphoCloud fork of copyparty

This fork provides the browser upload page ("drop zone") on MorphoCloud
instances. The `morphocloud` branch is the pinned upstream release plus a
small patch set; `main` tracks upstream untouched.

Instances download `copyparty-sfx.py` from this repository's releases
(see `ansible/roles/dropzone` in MorphoCloud/exosphere), so upstream release
assets are never a runtime dependency.

## Patch set

- `copyparty/web/browser.js`: the English string table (`Ls.eng`) uses plain
  wording instead of the upstream colloquialisms.
- `copyparty/web/up2k.js`, `copyparty/httpcli.py`, `copyparty/web/splash.html`:
  the few messages that live outside the string table.
- `copyparty/web/mc.css`, `copyparty/web/mc.js`: hide the parts of the UI
  MorphoCloud does not use (navpane, settings grid, media player, search,
  hash and uploader columns) and open the upload panel by default. Included
  from `browser.html`, `splash.html` and `msg.html`; listed in
  `scripts/sfx.ls` so the build accepts them.
- `.github/workflows/release.yml`: builds the sfx and publishes it.

Deployment-specific settings (port, account, permissions, parallel uploads,
`ui-*` flags) stay in the ansible role, not here.

## Bumping upstream

1. `git fetch upstream --tags`
2. `git rebase <new tag> morphocloud` and resolve the (small) conflicts.
3. Build locally or push the branch and run the workflow; check the login
   page, the upload page and one upload with headless Chrome or by hand.
4. `git tag v<upstream>-mc1 && git push origin morphocloud v<upstream>-mc1`
5. Update `dropzone_version` and `dropzone_sha256` in the ansible role.

Do not track upstream's weekly cadence; bump for security fixes or a
feature MorphoCloud needs.
