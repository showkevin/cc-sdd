---
description: Lock core features and define MVP scope
allowed-tools: Read, Write, Edit, Glob
argument-hint: [scope-decision] [-y]
---

# Feature Lock & Scope Definition

Finalize what's in and out of the MVP.

## 🎯 Mission: Draw the Line - Ship or Skip

### Scope Decisions
- **core**: Lock essential features only
- **extended**: Include nice-to-haves
- **minimal**: Absolute minimum viable

## Task: Define and Lock MVP Scope

### Step 0: Read Project Context
**Load existing specifications to understand project state:**

1. **Find the active project**:
   - List all directories in `.kiro/specs/`
   - If only one project exists: Use that project
   - If multiple projects exist:
     - List all project names with their descriptions (from 01-init.md)
     - If $2 != "-y": Prompt user to select project
     - If $2 == "-y": Use the most recently modified project
   - If no projects exist: ERROR - Must run `/kiro-rapid:01-init` first

2. **Read previous phase documentation**:
   - Read `.kiro/specs/[project-name]/01-init.md` - Project info
   - Read `.kiro/specs/[project-name]/02-demo.md` - All implemented features
   - Read `.kiro/specs/[project-name]/04-feedback.md` - Stakeholder feedback (if exists)
   - Read `.kiro/specs/[project-name]/05-iterate.md` - Iterations done (if exists)
   - Extract complete feature inventory and current status

3. **Build context summary** for scope definition

### 1. Feature Inventory

Catalog everything built so far:

```markdown
# Current Feature Inventory

## ✅ Implemented & Working
- [FEATURE_1]: Basic functionality complete
- [FEATURE_2]: Demo-ready with mock data
- [FEATURE_3]: UI complete, backend partial
- [FEATURE_4]: Added during iteration

## 🚧 Partially Complete
- [FEATURE_5]: Frontend done, no backend
- [FEATURE_6]: API exists, no UI
- [FEATURE_7]: Works but buggy

## 📋 Requested but Not Started
- [FEATURE_8]: High demand, complex
- [FEATURE_9]: Nice to have
- [FEATURE_10]: Enterprise only
```

### 2. Decision Matrix

Create `mvp-scope.md`:

```markdown
# MVP Scope Decision

## 🎯 Core Features (MUST HAVE)
> These define our product

| Feature | Status | Effort to Complete | Decision |
|---------|--------|-------------------|----------|
| User Dashboard | 90% done | 2 hours | ✅ INCLUDE |
| Basic CRUD | Working | 0 hours | ✅ INCLUDE |
| Data Export | 70% done | 3 hours | ✅ INCLUDE |

## 🌟 Stretch Features (NICE TO HAVE)
> Include if time permits

| Feature | Status | Effort to Complete | Decision |
|---------|--------|-------------------|----------|
| Advanced Filters | 30% done | 8 hours | ⏸️ DEFER |
| Mobile View | Not started | 12 hours | ❌ EXCLUDE |
| API Integration | Planned | 16 hours | ❌ EXCLUDE |

## 🚫 Out of Scope (NOT NOW)
> Explicitly excluded from MVP

- Multi-tenant support
- Advanced analytics
- Custom workflows
- Enterprise SSO
- Audit logging
- Internationalization
```

### 3. Technical Debt Assessment

What debt is acceptable for MVP:

```markdown
# Acceptable Technical Debt for MVP

## ✅ Debt We'll Keep
- Hardcoded configuration values
- No input validation
- Minimal error handling
- No automated tests
- Code duplication
- Inline styles
- Mock data for some features

## ❌ Debt We Must Fix
- Security vulnerabilities (if any)
- Data loss bugs
- Complete feature failures
- Infinite loops or crashes

## 📅 Post-MVP Debt
- Proper authentication
- Database optimization
- Code refactoring
- Test coverage
- Documentation
```

### 4. Feature Freeze Declaration

```javascript
// feature-freeze.js
const MVP_SCOPE = {
  version: "1.0.0-mvp",
  frozenDate: new Date().toISOString(),

  features: {
    included: [
      "User Dashboard",
      "Basic CRUD Operations",
      "Data Export (CSV only)",
      "Simple Search",
      "Basic Reports"
    ],

    excluded: [
      "Advanced Filters",
      "Mobile Apps",
      "API Integrations",
      "Custom Themes",
      "Multi-language"
    ],

    maxChangesAllowed: 0 // No more features!
  },

  qualityBar: {
    mustWork: [
      "Core user flow",
      "Data persistence",
      "Export functionality"
    ],

    canFail: [
      "Edge cases",
      "Concurrent users",
      "Large datasets",
      "Browser compatibility (IE)"
    ]
  }
};

// Lock it
Object.freeze(MVP_SCOPE);
localStorage.setItem('mvp-scope', JSON.stringify(MVP_SCOPE));
```

### 5. Stakeholder Communication

Generate `scope-announcement.md`:

```markdown
# MVP Scope Finalized

Dear Stakeholders,

After incorporating your valuable feedback, we've finalized the MVP scope.

## ✅ What's Included (Available Now)

### Core Functionality
- **Dashboard**: Real-time overview of key metrics
- **Management**: Create, edit, delete operations
- **Export**: Download data as CSV
- **Search**: Find items quickly
- **Reports**: Basic reporting functionality

### Quality Commitments
- Works on Chrome, Firefox, Safari
- Handles up to 1,000 records
- Response time < 2 seconds
- Available 9 AM - 6 PM

## ⏰ What's Coming Next (Post-MVP)

### Phase 2 (2-4 weeks)
- Mobile responsive design
- Advanced filtering
- API for integrations

### Phase 3 (1-2 months)
- Enterprise features
- Advanced analytics
- Custom workflows

## 📊 Success Metrics

We'll measure MVP success by:
- User adoption rate
- Feature usage analytics
- Performance metrics
- User feedback scores

## 🚀 Launch Plan

- **Soft Launch**: [DATE] - 10 beta users
- **Feedback Period**: 1 week
- **Public Launch**: [DATE + 2 weeks]

Questions? Let's discuss in our next meeting.

Best regards,
The Team
```

### 6. Create Release Checklist

```markdown
# MVP Release Checklist

## Pre-Launch (Before Soft Launch)
- [ ] All core features working
- [ ] Basic error pages added
- [ ] Contact information visible
- [ ] Feedback mechanism in place
- [ ] Basic analytics installed

## Soft Launch (Beta Users)
- [ ] Onboarding email sent
- [ ] Support channel created
- [ ] Monitoring dashboard ready
- [ ] Rollback plan prepared
- [ ] Success metrics defined

## Public Launch
- [ ] Marketing site updated
- [ ] Documentation available
- [ ] Support team briefed
- [ ] Backup systems tested
- [ ] Celebration planned! 🎉
```

### 7. Final Configuration

Lock down configuration for MVP:

```javascript
// config-lock.js
const MVP_CONFIG = {
  environment: 'production-mvp',

  features: {
    ENABLE_DASHBOARD: true,
    ENABLE_EXPORT: true,
    ENABLE_ADVANCED_FILTERS: false, // Locked out
    ENABLE_MOBILE: false,            // Locked out
    ENABLE_API: false                // Locked out
  },

  limits: {
    MAX_USERS: 100,
    MAX_RECORDS: 1000,
    MAX_EXPORT_ROWS: 500,
    SESSION_TIMEOUT: 3600000 // 1 hour
  },

  support: {
    email: 'mvp-support@company.com',
    response_time: '24 hours',
    channels: ['email', 'in-app']
  }
};

// Save and communicate
console.log('MVP Configuration Locked:', MVP_CONFIG);
```

### 8. No-Change Policy

Document the freeze:

```markdown
# ⛔ FEATURE FREEZE IN EFFECT

Starting from: [DATE]
Until: MVP Launch + 2 weeks

## No Changes Allowed To:
- Core functionality
- UI layout
- Data models
- API contracts

## Exceptions Only For:
- Critical bugs
- Security issues
- Complete failures

## To Request Exception:
1. Document critical need
2. Get stakeholder approval
3. Impact < 2 hours work
4. No risk to stability

Remember: Every change delays launch!
```

### 9. Update Feature Lock Documentation
Create or update `.kiro/specs/[project-name]/06-lock.md`:

```markdown
# Feature Lock & MVP Scope - [Project Name]

**Last Updated**: [CURRENT_TIMESTAMP]
**Scope Decision**: [core/extended/minimal]
**Feature Freeze Date**: [FREEZE_DATE]

## MVP Scope

### ✅ Included Features (LOCKED)
[List from Step 2 decision matrix]

### 🚫 Excluded Features (NOT NOW)
[List from Step 2 decision matrix]

## Technical Debt Status
[Summary from Step 3]

## Configuration Frozen
[Content from MVP_CONFIG.json]

## Current Status
✅ Features Locked - Ready for quality phase

## Next Steps
- [ ] Add contract testing: `/kiro-rapid:07-contract [api-scope]`
```

## Output

After locking scope:
1. ✅ Clear list of included features
2. ✅ Explicit list of excluded features
3. ✅ Stakeholder communication sent
4. ✅ Configuration frozen
5. ✅ Team aligned on "no changes"

## Next Command

**Begin quality phase:** `/kiro-rapid:contract` to add basic testing