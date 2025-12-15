# RFC NNNN: Title of the Proposal

**Status:** Draft  
**Author(s):** Your Name `<you@example.com>`  
**Created:** YYYY-MM-DD  
**Updated:** YYYY-MM-DD  
**Target Version:** (e.g., SSI v1.0, post-v1, etc.)

---

## 1. Summary

A short, high-level description of the proposal.  
Explain what this RFC changes in the SSI Protocol in 2–3 sentences.

---

## 2. Motivation

- What problem does this solve?
- Why is this change necessary?
- Who benefits (e.g., implementers, regulators, developers, end-users)?

Be explicit about:
- Pain points in the current protocol or implementations
- Why this is better than the status quo

---

## 3. Specification

This is the **normative** section.

Describe exactly what changes:

- New or updated data structures
- New endpoints, fields, or flags
- Protocol flows and state machines
- Validation rules and invariants
- Governance or process changes

Use:
- Diagrams where useful
- Pseudocode or JSON examples
- Clear MUST/SHOULD/MAY language

---

## 4. Security Considerations

Explain how this proposal affects:

- Security posture of systems implementing SSI
- Attack surface (what new risks are introduced?)
- Mitigations and invariants that must hold
- Interactions with threat model in `docs/safety/threat-model.md`

If there are known risks or tradeoffs, call them out explicitly.

---

## 5. Backwards Compatibility

- Does this change break existing implementations?
- Is it strictly additive?
- How should older versions behave?
- Is version negotiation required?

If breaking, describe migration and deprecation strategy.

---

## 6. Reference Implementation

If applicable:

- Link to a reference implementation PR or repository
- Describe any implementation-specific learnings
- Note performance or operational impacts

Example:
- `reference/gateway`
- `reference/client-trader`
- New SDKs or tools

---

## 7. Adoption Plan

- Who needs to implement this (gateways, kernels, clients, SDKs)?
- In what order should components adopt it?
- Are there feature flags or rollout stages?

Optionally, include:
- Metrics or signals to evaluate success
- Suggested timeline for adoption

---

## 8. Alternatives Considered

List alternatives and why they were not chosen.

---

## 9. Open Questions

Track any remaining questions that must be resolved before merging or before declaring the RFC "Accepted".