---
description: Write demo features directly - hardcode and fake data allowed
allowed-tools: Bash, Write, Read, Edit, MultiEdit, Grep, Glob
argument-hint: <feature-name> [-y]
---

# Rapid Demo Development

Implement demo feature: **$ARGUMENTS**

## 🎯 Mission: Make It Work, Make It Demo-able

### Development Rules
1. **Hardcode is fine** - We'll fix it later
2. **Fake data is encouraged** - Looks real enough
3. **Copy-paste is OK** - DRY can wait
4. **No error handling** - Happy path only
5. **UI can be ugly** - Bootstrap default is enough
6. **Document the demo** - Update tracking files

## Task: Implement Feature for Demo

### Step 0: Read Project Context
**Load existing specifications from `.kiro/specs/` to understand the project:**

1. **Find the active project**:
   - List all directories in `.kiro/specs/`
   - If only one project exists: Use that project
   - If multiple projects exist:
     - List all project names with their descriptions (from 01-init.md)
     - If $2 != "-y": Prompt user to select project
     - If $2 == "-y": Use the most recently modified project
   - If no projects exist: ERROR - Must run `/kiro-rapid:01-init` first

2. **Read initialization context**:
   - Read `.kiro/specs/[project-name]/01-init.md` to extract:
     - Project name and description
     - Tech stack
     - Project location
     - Existing technical debt

3. **Read previous demo features** (if exists):
   - Read `.kiro/specs/[project-name]/02-demo.md` to extract:
     - Already implemented features
     - Existing endpoints and UI components
     - Accumulated technical debt

4. **Build context summary** for use in implementation

### Step 1: Analyze Feature Request
Parse the feature name ($ARGUMENTS) and identify:
- What needs to be visible in the UI
- What API endpoints to create
- What fake data to generate

### 2. Frontend Implementation

#### Quick UI Addition
```javascript
// TECH-DEBT: [RAPID-DEMO] Inline styles and hardcoded values
function FeatureComponent() {
  const [data, setData] = useState([
    { id: 1, name: "Demo Item 1", price: 99.99 },
    { id: 2, name: "Demo Item 2", price: 149.99 }
  ]);

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">$ARGUMENTS</h5>
        {/* FIXME: [RAPID] Replace with real data */}
        {data.map(item => (
          <div key={item.id}>
            {item.name} - ${item.price}
            <button className="btn btn-sm btn-success ms-2">
              Action
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Alternative: Plain JavaScript
```javascript
// TODO: [RAPID-REFACTOR] Convert to proper component
function addFeatureToPage() {
  const html = `
    <div class="feature-demo">
      <h3>$ARGUMENTS</h3>
      <button onclick="demoAction()">Click for Demo</button>
      <div id="demo-result"></div>
    </div>
  `;
  document.getElementById('app').innerHTML += html;
}

function demoAction() {
  // Fake it till you make it
  document.getElementById('demo-result').innerHTML =
    'Feature working! (using mock data)';
}
```

### 3. Backend Implementation

#### Quick Endpoint Addition
```javascript
// In server.js - just append to existing file

// TECH-DEBT: [RAPID-DEMO] No validation, no auth, no error handling
app.get('/api/demo-feature', (req, res) => {
  // Hardcoded response for demo
  const mockData = [
    { id: 1, status: 'active', value: Math.random() * 1000 },
    { id: 2, status: 'pending', value: Math.random() * 1000 }
  ];

  // Simulate some processing delay for realism
  setTimeout(() => {
    res.json({
      success: true,
      data: mockData,
      timestamp: new Date()
    });
  }, 300);
});

app.post('/api/demo-action', (req, res) => {
  // Just return success for now
  res.json({
    success: true,
    message: 'Action completed!',
    // FIXME: [RAPID] Actually process the request
    processed: req.body
  });
});
```

### 4. Database (if needed)

#### Quick SQLite Table
```sql
-- Just add to init.sql
-- TECH-DEBT: [RAPID-DEMO] No indexes, no constraints
CREATE TABLE IF NOT EXISTS demo_feature (
  id INTEGER PRIMARY KEY,
  data TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Pre-populate with demo data
INSERT INTO demo_feature (data) VALUES
  ('{"type": "demo", "value": 100}'),
  ('{"type": "demo", "value": 200}'),
  ('{"type": "demo", "value": 300}');
```

### 5. Quick Integration

#### Connect Everything (Duct Tape Style)
```javascript
// In app.js
async function loadFeature() {
  try {
    const response = await fetch('http://localhost:3001/api/demo-feature');
    const data = await response.json();

    // Just dump it on the page
    document.getElementById('feature-container').innerHTML =
      JSON.stringify(data, null, 2);
  } catch (e) {
    // Ignore errors in demo
    console.log('Using fallback demo data');
    displayFakeData();
  }
}

function displayFakeData() {
  // When API fails, show fake data
  const fakeData = generateMockData();
  // Display logic here
}
```

### 6. Demo Enhancement Tricks

#### Make it Look Real
```javascript
// Add these to make demo impressive

// Fake loading spinner
function showLoading() {
  document.body.innerHTML += '<div class="spinner-border"></div>';
  setTimeout(() => {
    document.querySelector('.spinner-border').remove();
  }, 1000);
}

// Fake notifications
function showSuccess() {
  alert('✅ Feature successfully demonstrated!');
}

// Fake metrics
function showMetrics() {
  const metrics = {
    users: Math.floor(Math.random() * 10000),
    revenue: '$' + (Math.random() * 100000).toFixed(2),
    growth: '+' + Math.floor(Math.random() * 100) + '%'
  };
  console.log('Demo Metrics:', metrics);
}
```

### Step 2: Update Demo Documentation
Create or update `.kiro/specs/[project-name]/02-demo.md`:

**If file doesn't exist**: Create new file with template
**If file exists**: Add new feature section, preserve existing content

```markdown
# Demo Features - [Project Name]

**Last Updated**: [CURRENT_TIMESTAMP]

## Implemented Features

### Feature: [Feature Name from $ARGUMENTS]
**Added**: [DATE]
**Status**: ✅ Demo-ready

#### Frontend Changes
- **Files Modified**: [list of frontend files changed]
- **UI Components**: [description of UI elements added]
- **User Actions**: [what users can do]

#### Backend Changes
- **Endpoints Added**:
  - `[METHOD] [PATH]` - [description]
- **Files Modified**: [list of backend files changed]
- **Data Source**: [mock data / hardcoded / fake API]

#### Mock Data Used
\`\`\`javascript
[example of mock data structure]
\`\`\`

#### Demo Script
1. [Step to demo the feature]
2. [Step to demo the feature]
3. [Expected result]

#### Technical Debt Added
- TECH-DEBT: [RAPID-DEMO] [specific issue] in [file:line]
- TECH-DEBT: [RAPID-DEMO] [specific issue] in [file:line]

---

[Previous features section if updating existing file]

## Summary
- **Total Features**: [count]
- **Total Endpoints**: [count]
- **Total Technical Debt Items**: [count]

## Current Status
✅ **Demo Phase** - Features can be demonstrated but not production-ready

## Next Steps
- [ ] Run demo: `/kiro-rapid:03-run`
- [ ] Show to stakeholders
- [ ] Collect feedback: `/kiro-rapid:04-feedback`
```

## Output Checklist

After implementing the demo feature:
- [ ] Feature visible in UI
- [ ] Clicking buttons does something
- [ ] Data appears (even if fake)
- [ ] No error messages shown
- [ ] Can be demonstrated in 2 minutes
- [ ] Documentation updated in `.kiro/specs/[project-name]/02-demo.md`

## What NOT to Implement

Skip these completely:
- ❌ Input validation
- ❌ Error messages
- ❌ Edge cases
- ❌ Performance optimization
- ❌ Security checks
- ❌ Unit tests
- ❌ (No need for separate documentation - it's in 02-demo.md)

## Demo Tips

### Making it Impressive
1. **Add animations** - CSS transitions make everything better
2. **Use random data** - Makes it look dynamic
3. **Add timestamps** - Shows "real-time" updates
4. **Include charts** - Chart.js with random data
5. **Fake success messages** - Always show positive feedback

### Common Patterns
```javascript
// Pattern 1: Optimistic UI
function optimisticUpdate() {
  updateUI(); // Update immediately
  apiCall().catch(() => {}); // Ignore failures
}

// Pattern 2: Fake Async
function fakeAsync(callback) {
  setTimeout(callback, Math.random() * 1000);
}

// Pattern 3: Lorem Ipsum Data
function generateData(count) {
  return Array(count).fill(0).map((_, i) => ({
    id: i,
    name: `Item ${i}`,
    value: Math.random() * 100
  }));
}
```

## Next Steps

**Run:** `/kiro-rapid:run` to test the demo
**Then:** `/kiro-rapid:feedback` after showing to stakeholders

Remember: **Perfect is the enemy of done!**