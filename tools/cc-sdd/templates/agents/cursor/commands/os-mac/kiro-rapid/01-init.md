---
description: Initialize a MVP project in 30 seconds - with spec tracking
allowed-tools: Bash, Write, Read, Edit, Glob
argument-hint: <project-description>
---

# Rapid MVP Initialization

Initialize a new MVP project: **$ARGUMENTS**

## 🎯 Mission: Get Running Code in 30 Seconds

### Core Philosophy
- **Speed first, but with tracking** - Fast development with .md documentation
- **Working demo > Perfect architecture**
- **Spec-driven even when rapid** - Every step is recorded

## Task: Generate Minimal Viable Skeleton

### Step 0: Generate Project Name
Generate a concise, kebab-case project name from the project description ($ARGUMENTS).
**Check existing `.kiro/specs/` directory to ensure the generated project name is unique. If a conflict exists, append a number suffix (e.g., project-name-2).**

Store the generated project name in a variable for use throughout this command.

### Step 1: Create Spec Directory
Create `.kiro/specs/[generated-project-name]/` directory to track all development phases.

### Step 2: Project Setup
Create a project structure that can immediately run:
```
project-name/
├── docker-compose.yml    # One command to run everything
├── backend/
│   ├── server.js         # Express server with basic routes
│   ├── package.json      # Minimal dependencies
│   └── .env.example      # Configuration template
├── frontend/
│   ├── index.html        # Bootstrap template
│   ├── app.js            # Vanilla JS or minimal React
│   └── style.css         # Basic styling
├── database/
│   └── init.sql          # SQLite schema with sample data
└── README.md             # How to run (3 lines max)
```

### 2. Technology Stack (Pre-selected)
**No decision paralysis - use what works:**
- Backend: Express.js (Node.js)
- Frontend: React with Bootstrap or plain HTML
- Database: SQLite (no setup required)
- Container: Docker Compose

### 3. Implementation Details

#### Backend (server.js)
```javascript
// TECH-DEBT: [RAPID] Minimal error handling - improve later
const express = require('express');
const app = express();

// Basic CORS - security can wait
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'running', timestamp: new Date() });
});

// TODO: [RAPID] Add actual business endpoints here

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
```

#### Frontend (index.html)
```html
<!DOCTYPE html>
<html>
<head>
  <title>MVP Demo</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-5">
    <h1>$ARGUMENTS - MVP Demo</h1>
    <div id="app">
      <!-- TECH-DEBT: [RAPID] Replace with React components -->
      <button class="btn btn-primary" onclick="testAPI()">Test API</button>
    </div>
  </div>
  <script>
    // Quick and dirty - refactor later
    async function testAPI() {
      const res = await fetch('http://localhost:3001/api/health');
      const data = await res.json();
      alert('API Status: ' + data.status);
    }
  </script>
</body>
</html>
```

#### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    volumes:
      - ./backend:/app
    command: npm run dev

  frontend:
    image: nginx:alpine
    ports:
      - "3000:80"
    volumes:
      - ./frontend:/usr/share/nginx/html
```

### 4. Auto-generate Sample Data
Create mock data generator for immediate demo capability:
- Users: John Doe, Jane Smith, etc.
- Products: Sample items with prices
- Transactions: Fake history for charts

### 5. One-Command Setup
Create `start.sh`:
```bash
#!/bin/bash
# TECH-DEBT: [RAPID] No error checking - add later
docker-compose up -d
echo "🚀 MVP running at http://localhost:3000"
open http://localhost:3000 || xdg-open http://localhost:3000
```

### Step 3: Create Initialization Documentation
Create `.kiro/specs/[generated-project-name]/01-init.md` with the following content:

```markdown
# Project Initialization - [Generated Project Name]

**Created**: [CURRENT_TIMESTAMP]
**Description**: [USER'S PROJECT DESCRIPTION from $ARGUMENTS]

## Project Information
- **Project Name**: [generated-project-name]
- **Type**: MVP Rapid Development
- **Started**: [DATE]

## Technology Stack
- **Backend**: Express.js (Node.js)
- **Frontend**: React/Bootstrap (or plain HTML)
- **Database**: SQLite
- **Container**: Docker Compose
- **Deployment**: TBD

## Structure Created
- [x] Backend skeleton (server.js, package.json)
- [x] Frontend skeleton (index.html, app.js, style.css)
- [x] Docker compose configuration
- [x] README.md with quick start
- [x] Sample data generator
- [x] Health check endpoint

## Project Location
**Root Directory**: [ABSOLUTE_PATH_TO_PROJECT]

## Technical Debt Introduced
- TECH-DEBT: [RAPID-INIT] No error handling in server.js
- TECH-DEBT: [RAPID-INIT] Open CORS policy (security risk)
- TECH-DEBT: [RAPID-INIT] Hardcoded ports (3000, 3001)
- TECH-DEBT: [RAPID-INIT] No environment validation
- TECH-DEBT: [RAPID-INIT] No logging system

## Quick Start
\`\`\`bash
cd [project-directory]
docker-compose up -d
# Open http://localhost:3000
\`\`\`

## Current Status
✅ **Initialized** - Ready for demo feature development

## Next Steps
- [ ] Add first demo feature: `/kiro-rapid:02-demo <feature-name>`
- [ ] Show to stakeholders
- [ ] Collect initial feedback

## Notes
[Any additional notes about the initialization]
```

## Output

After initialization:
1. ✅ Project structure created
2. ✅ All services running via Docker
3. ✅ Browser opened with demo
4. ✅ API health check working
5. ✅ Documentation created at `.kiro/specs/[project-name]/01-init.md`

**Show to user**:
- Generated project name: [project-name]
- Spec tracking directory: `.kiro/specs/[project-name]/`
- Next command: `/kiro-rapid:02-demo <feature-name>`

## Important Notes

### What We're NOT Doing
- ❌ No database migrations
- ❌ No authentication system
- ❌ No error handling
- ❌ No tests
- ❌ No CI/CD
- ❌ No logging

### Why This is OK
- Demo stage = proof of concept only
- Customer feedback > code quality
- Technical debt is clearly marked
- We'll fix it in `/kiro-rapid:refactor`

### Success Metrics
- Time to first run: < 1 minute
- Lines of code: < 200
- Dependencies: < 10
- Setup steps: 1 (just run docker-compose)