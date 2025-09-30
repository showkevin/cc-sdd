---
description: Check current MVP development stage and get recommendations
allowed-tools: Read, Bash, Glob, Grep
argument-hint: [detailed] [-y]
---

# MVP Status Check

Analyze current project stage and recommend next actions.

## 🎯 Mission: Know Where You Are, Know Where to Go

## Task: Intelligent Stage Detection

### Step 0: Read All Spec Documentation
**Load all existing specifications to build complete project status:**

1. **Find all projects**:
   - List all directories in `.kiro/specs/`
   - If no projects exist: Report "No projects initialized"
   - If projects exist: Continue with analysis

2. **For each project, read ALL phase documentation**:
   - Read `.kiro/specs/[project-name]/01-init.md` (if exists) - Initialization status
   - Read `.kiro/specs/[project-name]/02-demo.md` (if exists) - Demo features
   - Read `.kiro/specs/[project-name]/03-run.md` (if exists) - Demo execution
   - Read `.kiro/specs/[project-name]/04-feedback.md` (if exists) - Feedback processing
   - Read `.kiro/specs/[project-name]/05-iterate.md` (if exists) - Iterations done
   - Read `.kiro/specs/[project-name]/06-lock.md` (if exists) - Feature lock status
   - Read `.kiro/specs/[project-name]/07-contract.md` (if exists) - Contract tests
   - Read `.kiro/specs/[project-name]/08-core-test.md` (if exists) - Core tests
   - Read `.kiro/specs/[project-name]/09-refactor.md` (if exists) - Refactoring done
   - Read `.kiro/specs/[project-name]/10-evolve.md` (if exists) - Evolution status

3. **Determine project stage** based on which .md files exist:
   - Only 01-init.md: Stage 0 - INITIALIZED
   - 02-demo.md exists: Stage 1 - DEMO
   - 04-feedback.md exists: Stage 2 - ITERATION
   - 06-lock.md exists: Stage 3 - LOCKED
   - 07-contract.md + 08-core-test.md exist: Stage 4 - TESTING
   - 09-refactor.md exists: Stage 5 - REFACTORING
   - 10-evolve.md exists: Stage 6 - EVOLUTION/PRODUCTION

4. **Extract key metrics from documentation**:
   - Features count (from 02-demo.md)
   - Technical debt items (from all .md files)
   - Test coverage (from 08-core-test.md)
   - Production readiness score (from 10-evolve.md)

### 1. Detect Project Metrics

Gather key indicators:

```javascript
// stage-detection.js
async function detectProjectStage() {
  const metrics = {
    // Check if basic structure exists
    hasBackend: await fileExists('server.js') || await fileExists('app.js'),
    hasFrontend: await fileExists('index.html') || await fileExists('src/App.js'),
    hasDatabase: await fileExists('*.db') || await fileExists('migrations/'),

    // Check for testing
    hasTests: await fileExists('*.test.js') || await fileExists('test/'),
    hasContractTests: await fileExists('contract-tests.js'),
    hasUnitTests: await countFiles('*.test.js') > 5,

    // Check for production readiness
    hasAuth: await grepInFiles('jwt|auth|login'),
    hasErrorHandling: await grepInFiles('try.*catch|.catch'),
    hasConfig: await fileExists('.env') || await fileExists('config/'),
    hasDocker: await fileExists('docker-compose.yml'),

    // Check for documentation
    hasReadme: await fileExists('README.md'),
    hasApiDocs: await fileExists('swagger.json') || await fileExists('openapi.yaml'),

    // Estimate user count (from logs, db, or config)
    estimatedUsers: await estimateUserCount(),

    // Check git history
    daysSinceStart: await getDaysSinceFirstCommit(),
    commitCount: await getCommitCount(),
    contributorCount: await getContributorCount()
  };

  return metrics;
}
```

### 2. Stage Classification

Determine current stage:

```javascript
function classifyStage(metrics) {
  // Stage 0: Not started
  if (!metrics.hasBackend && !metrics.hasFrontend) {
    return {
      stage: 'NOT_STARTED',
      phase: 0,
      description: 'Project not initialized'
    };
  }

  // Stage 1: Demo phase
  if (!metrics.hasTests && metrics.daysSinceStart < 7) {
    return {
      stage: 'DEMO',
      phase: 1,
      description: 'Building initial demo'
    };
  }

  // Stage 2: Feedback iteration
  if (!metrics.hasAuth && metrics.commitCount > 20) {
    return {
      stage: 'ITERATION',
      phase: 2,
      description: 'Iterating based on feedback'
    };
  }

  // Stage 3: Feature locked
  if (!metrics.hasContractTests && metrics.hasAuth) {
    return {
      stage: 'LOCKED',
      phase: 3,
      description: 'Features locked, needs testing'
    };
  }

  // Stage 4: Testing phase
  if (metrics.hasContractTests && !metrics.hasUnitTests) {
    return {
      stage: 'TESTING',
      phase: 3.5,
      description: 'Adding test coverage'
    };
  }

  // Stage 5: Production ready
  if (metrics.hasUnitTests && metrics.hasApiDocs) {
    return {
      stage: 'PRODUCTION',
      phase: 4,
      description: 'Ready for production'
    };
  }

  return {
    stage: 'UNKNOWN',
    phase: -1,
    description: 'Could not determine stage'
  };
}
```

### 3. Generate Status Report

Create comprehensive status:

```markdown
# 📊 MVP Status Report

Generated: [DATE]

## Current Stage: [STAGE_NAME]
**Phase**: [PHASE_NUMBER] of 5
**Description**: [STAGE_DESCRIPTION]

## Metrics Summary

### 🏗️ Structure
- Backend: [✅/❌]
- Frontend: [✅/❌]
- Database: [✅/❌]
- Docker: [✅/❌]

### 🧪 Testing
- Contract Tests: [✅/❌]
- Unit Tests: [COUNT]
- E2E Tests: [✅/❌]
- Coverage: [PERCENTAGE]%

### 🚀 Production Readiness
- Authentication: [✅/❌]
- Error Handling: [✅/❌]
- Configuration: [✅/❌]
- Documentation: [✅/❌]

### 📈 Project Health
- Days Active: [DAYS]
- Total Commits: [COUNT]
- Contributors: [COUNT]
- Estimated Users: [COUNT]

## Technical Debt Tracker

### 🔴 Critical (Fix immediately)
- [List critical issues]

### 🟡 Major (Fix before launch)
- [List major issues]

### 🟢 Minor (Fix eventually)
- [List minor issues]

## Recommended Next Steps

Based on your current stage, here's what to do next:

### Immediate (Today)
1. [SPECIFIC_ACTION_1]
2. [SPECIFIC_ACTION_2]
3. [SPECIFIC_ACTION_3]

### Short-term (This week)
- [WEEKLY_GOAL_1]
- [WEEKLY_GOAL_2]

### Long-term (This month)
- [MONTHLY_GOAL_1]
- [MONTHLY_GOAL_2]
```

### 4. Smart Recommendations

Provide stage-specific guidance:

```javascript
function getRecommendations(stage, metrics) {
  const recommendations = {
    NOT_STARTED: {
      immediate: [
        'Run: /kiro-rapid:init "your-project-idea"',
        'Define your core value proposition',
        'Identify your first demo audience'
      ],
      command: '/kiro-rapid:init'
    },

    DEMO: {
      immediate: [
        'Run: /kiro-rapid:demo "main-feature"',
        'Focus on one impressive feature',
        'Prepare demo script'
      ],
      command: '/kiro-rapid:demo'
    },

    ITERATION: {
      immediate: [
        'Run: /kiro-rapid:feedback',
        'Process user feedback',
        'Prioritize top 3 changes'
      ],
      command: '/kiro-rapid:iterate'
    },

    LOCKED: {
      immediate: [
        'Run: /kiro-rapid:contract',
        'Add API contract tests',
        'Document API endpoints'
      ],
      command: '/kiro-rapid:contract'
    },

    TESTING: {
      immediate: [
        'Run: /kiro-rapid:core-test',
        'Test business logic',
        'Fix critical bugs'
      ],
      command: '/kiro-rapid:core-test'
    },

    PRODUCTION: {
      immediate: [
        'Run: /kiro-rapid:evolve',
        'Setup monitoring',
        'Plan deployment'
      ],
      command: '/kiro-rapid:evolve'
    }
  };

  return recommendations[stage] || recommendations.NOT_STARTED;
}
```

### 5. Progress Tracking

Show progress visually:

```javascript
function generateProgressBar(phase) {
  const stages = ['Init', 'Demo', 'Iterate', 'Test', 'Prod'];
  const progress = Math.floor((phase / 4) * 100);

  let bar = 'Progress: [';
  for (let i = 0; i < 5; i++) {
    if (i < phase) {
      bar += '✅';
    } else if (i === Math.floor(phase)) {
      bar += '🔄';
    } else {
      bar += '⬜';
    }
  }
  bar += `] ${progress}%\n\n`;

  stages.forEach((stage, i) => {
    if (i < phase) {
      bar += `✅ ${stage} (Complete)\n`;
    } else if (i === Math.floor(phase)) {
      bar += `🔄 ${stage} (In Progress)\n`;
    } else {
      bar += `⬜ ${stage} (Pending)\n`;
    }
  });

  return bar;
}
```

### 6. Time Estimates

Estimate time to completion:

```javascript
function estimateTimeToCompletion(currentPhase, velocity) {
  const phaseDurations = {
    0: 1,   // Init: 1 day
    1: 5,   // Demo: 5 days
    2: 3,   // Iterate: 3 days
    3: 2,   // Test: 2 days
    4: 3    // Production: 3 days
  };

  let remainingDays = 0;
  for (let phase = Math.ceil(currentPhase); phase <= 4; phase++) {
    remainingDays += phaseDurations[phase] || 0;
  }

  // Adjust based on team velocity
  remainingDays = Math.ceil(remainingDays / velocity);

  return {
    optimistic: remainingDays,
    realistic: remainingDays * 1.5,
    pessimistic: remainingDays * 2,
    launchDate: new Date(Date.now() + remainingDays * 24 * 60 * 60 * 1000)
  };
}
```

### 7. Health Indicators

Check project health:

```javascript
function getHealthIndicators(metrics) {
  const health = {
    velocity: 'UNKNOWN',
    quality: 'UNKNOWN',
    risk: 'UNKNOWN'
  };

  // Velocity check
  const commitsPerDay = metrics.commitCount / metrics.daysSinceStart;
  if (commitsPerDay > 5) health.velocity = 'HIGH';
  else if (commitsPerDay > 2) health.velocity = 'MEDIUM';
  else health.velocity = 'LOW';

  // Quality check
  if (metrics.hasTests && metrics.hasErrorHandling) {
    health.quality = 'GOOD';
  } else if (metrics.hasErrorHandling) {
    health.quality = 'FAIR';
  } else {
    health.quality = 'POOR';
  }

  // Risk check
  const risks = [];
  if (!metrics.hasBackup) risks.push('No backup');
  if (!metrics.hasAuth) risks.push('No authentication');
  if (!metrics.hasTests) risks.push('No tests');

  health.risk = risks.length === 0 ? 'LOW' :
                risks.length < 3 ? 'MEDIUM' : 'HIGH';

  return health;
}
```

### 8. Command Suggestions

Suggest specific commands:

```javascript
function suggestNextCommand(stage, metrics) {
  const suggestions = [];

  // Always suggest status check
  suggestions.push({
    command: '/kiro-rapid:status',
    reason: 'Check progress',
    priority: 'LOW'
  });

  // Stage-specific suggestions
  if (stage === 'DEMO') {
    if (!metrics.hasFrontend) {
      suggestions.push({
        command: '/kiro-rapid:demo "user-interface"',
        reason: 'Need visible UI for demo',
        priority: 'HIGH'
      });
    }
  }

  if (stage === 'ITERATION') {
    if (metrics.daysSinceLastFeedback > 3) {
      suggestions.push({
        command: '/kiro-rapid:feedback',
        reason: 'Collect recent feedback',
        priority: 'HIGH'
      });
    }
  }

  if (stage === 'PRODUCTION' && !metrics.hasDocker) {
    suggestions.push({
      command: 'docker init',
      reason: 'Containerize for deployment',
      priority: 'MEDIUM'
    });
  }

  return suggestions.sort((a, b) =>
    a.priority === 'HIGH' ? -1 : b.priority === 'HIGH' ? 1 : 0
  );
}
```

### 9. Generate Action Plan

Create specific action plan:

```markdown
# 🎯 Action Plan

## Right Now (Next 30 minutes)
```bash
# Command to run immediately
[SUGGESTED_COMMAND]
```

## Today's Goals
- [ ] [SPECIFIC_TASK_1]
- [ ] [SPECIFIC_TASK_2]
- [ ] [SPECIFIC_TASK_3]

## This Week's Milestones
- [ ] Complete [STAGE_NAME] phase
- [ ] Get feedback from [NUMBER] users
- [ ] Fix [NUMBER] critical issues

## Blockers to Address
- 🚫 [BLOCKER_1]: [HOW_TO_RESOLVE]
- 🚫 [BLOCKER_2]: [HOW_TO_RESOLVE]

## Success Metrics
- Measure: [METRIC_1]
- Target: [TARGET_1]
- Current: [CURRENT_1]
```

### 10. Final Summary

Concise status output:

```bash
#!/bin/bash
# status-output.sh

echo "╔════════════════════════════════════╗"
echo "║      KIRO-RAPID STATUS CHECK       ║"
echo "╚════════════════════════════════════╝"
echo ""
echo "📍 Current Stage: $STAGE ($PHASE/5)"
echo "📈 Progress: $PROGRESS_BAR"
echo "⏱️ Time to Launch: ~$DAYS days"
echo "❤️ Health: Velocity=$VELOCITY Quality=$QUALITY Risk=$RISK"
echo ""
echo "🎯 Next Action:"
echo "   $NEXT_COMMAND"
echo ""
echo "💡 Pro Tip: $RANDOM_TIP"
echo ""
echo "For detailed report, run: /kiro-rapid:status detailed"
```

## Output Examples

### Quick Status
```
Stage: DEMO (1/5)
Progress: [✅🔄⬜⬜⬜] 25%
Next: /kiro-rapid:demo "main-feature"
Time to MVP: ~10 days
```

### Detailed Status
Full report with metrics, recommendations, and action plan

## Success Indicators

Good status means:
- ✅ Clear understanding of current stage
- ✅ Specific next actions identified
- ✅ Realistic time estimates
- ✅ Health indicators positive
- ✅ No critical blockers

## Tips Database

Random tips to show:
- "Perfect is the enemy of done"
- "Ship early, ship often"
- "Customer feedback > Your assumptions"
- "Technical debt is a tool, not a failure"
- "1 working feature > 10 planned features"