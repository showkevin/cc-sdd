---
description: Collect and organize user feedback for rapid iteration
allowed-tools: Read, Write, Edit, Grep
argument-hint: [feedback-source]
---

# Collect & Process Feedback

Organize stakeholder feedback for rapid iteration.

## 🎯 Mission: Turn Feedback into Action Items

### Feedback Sources
- **demo**: From live demo session
- **email**: From email responses
- **meeting**: From meeting notes
- **survey**: From feedback forms

## Task: Process and Prioritize Feedback

### 1. Collect Raw Feedback

Read from various sources and consolidate:

```markdown
# Feedback Collection - [DATE]

## Source: [Demo/Meeting/Email]

### Positive Feedback 👍
- "I love how [FEATURE] works"
- "The [ASPECT] is exactly what we need"
- "This could save us [TIME/MONEY]"

### Concerns 🤔
- "What about [EDGE_CASE]?"
- "How does it handle [SCENARIO]?"
- "Can it integrate with [SYSTEM]?"

### Feature Requests 💡
- "It would be great if it could [ACTION]"
- "We need [FEATURE] for our workflow"
- "Can you add [CAPABILITY]?"

### Bugs/Issues 🐛
- "[FEATURE] didn't work when I [ACTION]"
- "The [UI_ELEMENT] is confusing"
- "Loading time for [OPERATION] is too long"
```

### 2. Categorize Feedback

Create `feedback-analysis.md`:

```markdown
# Feedback Analysis

## Priority Matrix

### 🔥 High Impact + Quick Win
> Do these immediately in next iteration

1. [FEATURE]: Requested by 3+ stakeholders
2. [BUG_FIX]: Blocking demo flow
3. [UI_CHANGE]: Simple but impressive

### 📊 High Impact + More Effort
> Plan for next major iteration

1. [INTEGRATION]: Valuable but complex
2. [NEW_FEATURE]: Game-changing but needs design
3. [REFACTOR]: Required for scaling

### ⏸️ Low Priority
> Acknowledge but defer

1. [NICE_TO_HAVE]: Not critical for MVP
2. [EDGE_CASE]: Affects < 5% of users
3. [OPTIMIZATION]: Premature at this stage

### ❌ Out of Scope
> Politely decline

1. [FEATURE]: Doesn't align with core value
2. [INTEGRATION]: Too complex for MVP
3. [REQUIREMENT]: Enterprise-only need
```

### 3. Generate Response Template

```markdown
# Stakeholder Response

Thank you for taking the time to review our MVP demo!

## What We Heard

✅ **You loved:**
- [POSITIVE_ASPECT_1]
- [POSITIVE_ASPECT_2]

🎯 **You requested:**
- [FEATURE_1] - *We'll add this in the next iteration*
- [FEATURE_2] - *Planned for next week*
- [FEATURE_3] - *Under consideration*

⏰ **Timeline:**
- Next demo: [DATE]
- Key features added: [LIST]

## Questions?
Happy to discuss any specific requirements.
```

### 4. Create Iteration Plan

Generate `iteration-plan.md`:

```javascript
// Pseudo-code for iteration planning
const feedbackItems = [
  { id: 1, type: 'feature', impact: 'high', effort: 'low', votes: 5 },
  { id: 2, type: 'bug', impact: 'high', effort: 'low', votes: 3 },
  { id: 3, type: 'feature', impact: 'medium', effort: 'high', votes: 2 }
];

// Sort by ROI (impact/effort) and votes
const prioritized = feedbackItems
  .map(item => ({
    ...item,
    score: (item.impact === 'high' ? 3 : 1) *
           item.votes /
           (item.effort === 'high' ? 3 : 1)
  }))
  .sort((a, b) => b.score - a.score);

// Take top 3 for next sprint
const nextSprint = prioritized.slice(0, 3);
```

### 5. Update Technical Debt Log

Track what corners we cut:

```markdown
# Technical Debt Log

## From Feedback Session

### New Debt Incurred
- **Hardcoded [FEATURE]**: Customer wants configurability
  - TECH-DEBT: [RAPID] Make configurable
  - Priority: HIGH
  - Effort: 2 hours

- **No error handling in [FLOW]**: User got confused
  - TECH-DEBT: [RAPID] Add basic error messages
  - Priority: MEDIUM
  - Effort: 1 hour

### Debt We Can Ignore (For Now)
- Proper authentication: Not needed for demo
- Database optimization: < 100 users
- Code duplication: Working fine
```

### 6. Quick Wins Identification

Find changes that take < 30 minutes but look impressive:

```javascript
// quick-wins.js
const quickWins = [
  {
    task: "Change button color to match brand",
    time: "5 min",
    impact: "Looks professional"
  },
  {
    task: "Add loading spinner",
    time: "10 min",
    impact: "Feels responsive"
  },
  {
    task: "Add success notification",
    time: "15 min",
    impact: "Better UX"
  },
  {
    task: "Update demo data to be realistic",
    time: "20 min",
    impact: "More convincing"
  }
];

// Do all quick wins first
quickWins.forEach(win => console.log(`⚡ ${win.task} (${win.time})`));
```

### 7. Metrics Tracking

Track feedback trends:

```javascript
const metrics = {
  totalFeedback: 24,
  positive: 15,
  negative: 3,
  neutral: 6,

  topRequests: [
    { feature: 'Dashboard', mentions: 8 },
    { feature: 'Export', mentions: 5 },
    { feature: 'Mobile', mentions: 3 }
  ],

  sentiment: {
    excited: 60,  // %
    interested: 30,
    skeptical: 10
  }
};

// Save for comparison
localStorage.setItem('feedback-metrics', JSON.stringify(metrics));
```

### 8. Action Items Generator

```markdown
# Immediate Actions (Do Today)

## Quick Wins (< 30 min each)
- [ ] Fix typo in header
- [ ] Change demo data to realistic values
- [ ] Add company logo
- [ ] Enable button that was disabled

## Critical Fixes (< 2 hours each)
- [ ] Fix the crash when clicking [BUTTON]
- [ ] Add missing [FEATURE] to demo flow
- [ ] Update API endpoint to return correct data

## Stakeholder Communication
- [ ] Send thank you email with summary
- [ ] Schedule follow-up demo for [DATE]
- [ ] Share iteration plan

## Next Iteration Planning
- [ ] Update backlog with new requests
- [ ] Prioritize top 3 features
- [ ] Estimate effort for each
```

## Output Files

After processing feedback:
1. `feedback-summary.md` - Consolidated feedback
2. `iteration-plan.md` - What to build next
3. `quick-wins.md` - Immediate improvements
4. `tech-debt.md` - Updated debt log
5. `response-email.md` - Stakeholder communication

## Success Metrics

Good feedback processing means:
- ✅ All feedback acknowledged within 24 hours
- ✅ Clear plan for next iteration
- ✅ At least 3 quick wins identified
- ✅ Stakeholders feel heard

## Next Command

**Execute plan:** `/kiro-rapid:iterate` with the prioritized changes