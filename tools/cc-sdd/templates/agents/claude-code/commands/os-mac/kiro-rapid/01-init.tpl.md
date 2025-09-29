---
description: Initialize a MVP project in 30 seconds - no documents required
allowed-tools: Bash, Write, Read, Edit
argument-hint: <project-description>
---

# Rapid MVP Initialization

Initialize a new MVP project: **$ARGUMENTS**

## 🎯 Mission: Get Running Code in 30 Seconds

### Core Philosophy
- **No documents, just code**
- **Working demo > Perfect architecture**
- **Speed > Quality (at this stage)**

## Task: Generate Minimal Viable Skeleton

### 1. Project Setup
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

## Output

After initialization:
1. ✅ Project structure created
2. ✅ All services running via Docker
3. ✅ Browser opened with demo
4. ✅ API health check working

**Next command:** `/kiro-rapid:demo` to add actual features

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