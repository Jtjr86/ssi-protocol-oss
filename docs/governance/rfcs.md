# RFC Process — Request for Comments

## 1. Overview

The **RFC (Request for Comments)** process is how changes to the SSI Protocol are proposed, reviewed, and adopted.

Anyone can submit an RFC. All RFCs are public and subject to community review.

## 2. RFC Lifecycle

```
Draft → Review → Public Comment → Decision → Published/Rejected
```

### 1. Draft
- Author creates RFC document using template
- Includes motivation, technical design, alternatives considered
- Submits via GitHub pull request to rfcs/ directory

### 2. Review
- Assigned to relevant working group
- Technical review and discussion
- May iterate with author on revisions
- SERB review if safety-relevant

### 3. Public Comment
- Announced on website and mailing lists
- Open comment period (typically 30 days)
- Community provides feedback
- Author responds and may revise

### 4. Decision
- Working group makes recommendation
- Standards Board votes (for major changes)
- Decision documented with reasoning

### 5. Publication
- Accepted RFCs assigned numbers and published
- Incorporated into official specifications
- Rejected RFCs archived with explanation

## 3. RFC Types

### Protocol RFCs
Changes to core protocol specs (kernel, gateway, RPX, envelopes)  
**Requires:** Working group approval + Standards Board ratification

### Governance RFCs
Changes to governance processes, policies, structures  
**Requires:** Standards Board approval

### Informational RFCs
Best practices, guidelines, educational content  
**Requires:** Working group endorsement (no formal vote)

### Experimental RFCs
Proposals for experimental features or research  
**Requires:** Working group sponsorship

## 4. RFC Template

```markdown
# RFC-XXXX: [Title]

## Status
Draft | Review | Accepted | Rejected | Superseded

## Authors
- Name <email>

## Summary
One-paragraph summary of the proposal.

## Motivation
Why is this change needed? What problem does it solve?

## Design
Technical details of the proposal.

## Alternatives Considered
What other approaches were evaluated? Why was this chosen?

## Security & Safety Implications
How does this affect safety? Any new risks?

## Compatibility
Impact on existing implementations?

## Implementation
Reference implementation or path to implementation.

## Open Questions
Unresolved issues or areas for discussion.
```

## 5. Review Criteria

RFCs are evaluated on:
- **Technical soundness:** Does it work as designed?
- **Safety:** Does it maintain or improve safety guarantees?
- **Compatibility:** Does it break existing implementations?
- **Clarity:** Is it well-specified and implementable?
- **Value:** Does it solve a real problem?

## 6. Appeal Process

If an RFC is rejected, authors may:
1. Revise and resubmit with changes
2. Appeal to Standards Board with new evidence
3. Pursue as experimental RFC for further research
