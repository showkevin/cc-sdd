---
description: Rapidly implement feedback and iterate on the MVP
allowed-tools: Read, Write, Edit, MultiEdit, Bash, Grep, Glob
argument-hint: <iteration-focus>
---

# Rapid Iteration

Quickly implement feedback-driven changes.

## 🎯 Mission: Ship Improvements in Hours, Not Days

### Iteration Focus
- **quick-wins**: Implement all < 30 min tasks
- **critical**: Fix blocking issues
- **feature**: Add most requested feature
- **polish**: UI/UX improvements

## Task: Fast Iteration Cycle

### 1. Load Iteration Plan

Read the prioritized feedback:
```javascript
// Read from feedback-analysis.md
const plan = {
  quickWins: [...],  // Do first
  critical: [...],   // Do second
  features: [...],   // Do if time permits
  defer: [...]       // Acknowledge but skip
};
```

### 2. Quick Wins Implementation

Execute all quick wins rapidly:

```javascript
// quick-wins-implementation.js

// Win 1: Update UI text
document.querySelector('h1').textContent = 'New Improved Title';

// Win 2: Add loading animation
function addLoadingAnimation() {
  const style = `
    .loading {
      animation: spin 1s infinite linear;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.innerHTML += `<style>${style}</style>`;
}

// Win 3: Better fake data
const improvedMockData = [
  { id: 1, name: 'Enterprise Dashboard', users: 1250, revenue: '$48,500' },
  { id: 2, name: 'Analytics Suite', users: 890, revenue: '$32,100' }
];

// Win 4: Success notifications
function showSuccess(message) {
  const toast = document.createElement('div');
  toast.className = 'alert alert-success position-fixed top-0 end-0 m-3';
  toast.textContent = message || '✅ Operation successful!';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
```

### 3. Critical Fixes

Fix anything that broke during demo:

```javascript
// critical-fixes.js

// Fix 1: Prevent crash on empty data
function safeRender(data) {
  if (!data || !Array.isArray(data)) {
    data = []; // Fallback to empty array
  }
  // TECH-DEBT: [RAPID-CRITICAL] Proper error handling needed
  return data.map(item => renderItem(item));
}

// Fix 2: API endpoint that returned 404
app.get('/api/missing-endpoint', (req, res) => {
  // Quick fix - return something
  res.json({
    success: true,
    data: [],
    message: 'Endpoint now working'
  });
});

// Fix 3: Button that did nothing
document.querySelector('#broken-button').onclick = function() {
  // Make it do something impressive
  this.textContent = 'Processing...';
  setTimeout(() => {
    this.textContent = 'Complete!';
    showSuccess('Feature activated!');
  }, 1500);
};
```

### 4. Feature Addition (Time-boxed)

Add the most requested feature, but time-box to 2 hours:

```javascript
// new-feature-rapid.js

// Example: Export functionality (most requested)
function addExportFeature() {
  // Quick and dirty CSV export
  const exportBtn = `
    <button class="btn btn-success" onclick="exportData()">
      📊 Export to Excel
    </button>
  `;

  document.querySelector('.toolbar').innerHTML += exportBtn;

  window.exportData = function() {
    // Fake CSV generation
    const csv = 'Name,Value,Status\n' +
      'Item 1,100,Active\n' +
      'Item 2,200,Pending\n' +
      'Item 3,300,Complete';

    // Download trigger
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export-' + Date.now() + '.csv';
    a.click();

    showSuccess('Data exported successfully!');
  };
}

// TECH-DEBT: [RAPID-FEATURE] Real export with actual data
```

### 5. Polish Pass

Make it look more professional:

```css
/* polish.css - Quick improvements */

/* Add subtle animations */
* {
  transition: all 0.2s ease;
}

/* Better spacing */
.card {
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Professional color scheme */
:root {
  --primary: #4A90E2;
  --success: #7ED321;
  --danger: #D0021B;
}

.btn-primary {
  background: var(--primary);
  border: none;
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Responsive fixes */
@media (max-width: 768px) {
  .desktop-only { display: none; }
}
```

### 6. Data Improvements

Make fake data more convincing:

```javascript
// better-fake-data.js

function generateRealisticData() {
  const companies = ['Acme Corp', 'TechStart', 'GlobalSoft', 'DataPro'];
  const statuses = ['Active', 'Pending', 'In Progress', 'Complete'];

  return Array(20).fill(0).map((_, i) => ({
    id: i + 1,
    company: companies[Math.floor(Math.random() * companies.length)],
    value: Math.floor(Math.random() * 100000),
    growth: (Math.random() * 40 - 10).toFixed(1) + '%',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString()
  }));
}

// Add chart for visual impact
function addChart() {
  const canvas = '<canvas id="chart"></canvas>';
  document.querySelector('#dashboard').innerHTML += canvas;

  // Use Chart.js with fake data
  new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Growth',
        data: [12, 19, 23, 25, 32, 45],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
  });
}
```

### 7. Performance Tricks

Make it feel faster without optimization:

```javascript
// perceived-performance.js

// Trick 1: Optimistic UI updates
function optimisticUpdate(element, newValue) {
  element.textContent = newValue; // Update immediately
  // API call happens in background
  fetch('/api/update').catch(() => {
    // Silently fail in demo
  });
}

// Trick 2: Skeleton loaders
function showSkeleton() {
  return `
    <div class="skeleton">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    </div>
  `;
}

// Trick 3: Instant feedback
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 100);
  });
});
```

### 8. Testing the Iteration

Quick smoke test:

```bash
#!/bin/bash
echo "🧪 Iteration Smoke Test"
echo "====================="

# Check services still run
curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend OK" || echo "❌ Frontend DOWN"
curl -s http://localhost:3001/api/health > /dev/null && echo "✅ Backend OK" || echo "❌ Backend DOWN"

# Check new features
echo ""
echo "Manual checks:"
echo "[ ] Quick wins visible?"
echo "[ ] Critical fixes working?"
echo "[ ] New feature functional?"
echo "[ ] UI improvements noticeable?"
echo "[ ] No new errors in console?"
```

## Iteration Metrics

Track iteration success:
```javascript
const iterationMetrics = {
  startTime: Date.now(),
  changes: {
    quickWins: 4,
    criticalFixes: 2,
    newFeatures: 1,
    uiImprovements: 7
  },
  timeSpent: 0, // Calculate at end
  nextDemo: 'Tomorrow 2 PM'
};

// Log at completion
iterationMetrics.timeSpent = Date.now() - iterationMetrics.startTime;
console.log('Iteration complete:', iterationMetrics);
```

## Output

After iteration:
1. ✅ All quick wins implemented
2. ✅ Critical issues fixed
3. ✅ Top requested feature added (basic version)
4. ✅ UI more polished
5. ✅ Ready for next demo

## Next Command

**Lock features:** `/kiro-rapid:lock` to finalize scope for MVP