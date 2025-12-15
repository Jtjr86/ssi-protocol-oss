# Contributing to the SSI Protocol

First off – thank you for your interest in contributing to the Sovereign Synthetic Intelligence (SSI) Protocol.  
SSI is intended to become a shared, open infrastructure layer for AI governance and safety.

This document explains how to:
- Ask questions or file issues
- Propose changes to the protocol via RFCs
- Contribute code, docs, or reference implementations
- Participate in working groups (future)

---

## 1. Questions & Issues

If you have a question, find a bug, or want to request a feature:

1. Check existing issues to see if it's already being discussed.
2. If not, open a new GitHub Issue with:
   - Clear title
   - Description of the problem or question
   - Steps to reproduce (if applicable)
   - Any logs, screenshots, or links that help explain the context

Please tag issues with:
- `protocol`
- `docs`
- `reference-impl`
- `governance`
as appropriate.

---

## 2. Proposing Changes via RFCs

### ⚠️ RFC Process Status: Pre-Governance Phase

**Current state:** SSI accepts **informational and experimental RFCs** for archival purposes only. No decision authority exists yet.

See [`rfcs/README.md`](./rfcs/README.md) for complete details.

**Important:**
- No governance structure is operational
- Submissions are archived, not approved
- No implementation commitments are made
- This is a signal collection phase

### Quick Start (Non-Binding Submissions)

1. Copy `rfcs/0000-template.md`
2. Fill in all required sections
3. Submit PR with title: `RFC: [Your Title]`
4. Add label: `rfc-informational` or `rfc-experimental`
5. Engage in community discussion

**Current status:** 0 RFCs submitted. Governance formation depends on external pull.

---

## 3. Code & Documentation Contributions

We welcome contributions in these areas:

- Protocol documentation (`/docs`)
- Website and developer portal (`/app`, `/components`)
- Reference implementations (`/reference`)
- SDKs and tooling
- Safety and security analyses

### Pull Request Guidelines

1. Fork the repo and create a feature branch:
   ```bash
   git checkout -b feature/my-change
   ```

2. Make your changes.
3. Ensure the project builds:
   ```bash
   npm install
   npm run build
   ```

4. Commit with a clear message:
   ```bash
   git commit -m "feat: describe concise change"
   ```

5. Open a Pull Request against `main`:
   * Describe the motivation and what changed
   * Link to any related issues or RFCs

Small, focused PRs are easier to review and merge.

---

## 4. Working Groups (Future)

**Status:** Planned but not yet operational.

The SSI Protocol is designed to be maintained by domain-specific working groups (e.g., trading, healthcare, content moderation, safety, multi-agent systems).

Until formal working groups are established, you can:

* Use GitHub issues and discussions for technical proposals
* Reference specific domains in issue titles and tags
* Submit informational RFCs describing domain-specific patterns

Once governance structures are formed, details will be published in:

* `docs/governance/working-groups.md`
* The SSI Governance section of the website

**Timeline:** Unknown. Depends on ecosystem adoption and external pull.

---

## 5. Code of Conduct

All contributors are expected to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

If you experience or witness unacceptable behavior, please contact:

`contact@ssi-protocol.org`
