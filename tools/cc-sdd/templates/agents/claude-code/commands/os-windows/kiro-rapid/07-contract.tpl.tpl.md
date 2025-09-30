---
description: Add contract testing to protect API interfaces
allowed-tools: Read, Write, Edit, MultiEdit, Bash, Glob
argument-hint: [api-scope] [-y]
---

# Contract Testing Implementation

Add API contract tests without full TDD.

## 🎯 Mission: Protect Interfaces, Not Implementation

### Testing Philosophy
- **Contract > Unit tests** at this stage
- **API stability > Code quality**
- **Prevent breaking changes > 100% coverage**

## Task: Implement Contract Testing

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
   - Read `.kiro/specs/[project-name]/02-demo.md` - All API endpoints implemented
   - Read `.kiro/specs/[project-name]/06-lock.md` - Locked feature scope
   - Extract API surface and critical endpoints

3. **Build context summary** for contract testing

### 1. Identify API Surface

List all external interfaces:

```javascript
// api-inventory.js
const API_ENDPOINTS = [
  // Customer-facing APIs
  { method: 'GET', path: '/api/health', critical: true },
  { method: 'GET', path: '/api/dashboard', critical: true },
  { method: 'POST', path: '/api/items', critical: true },
  { method: 'GET', path: '/api/items/:id', critical: true },
  { method: 'PUT', path: '/api/items/:id', critical: false },
  { method: 'DELETE', path: '/api/items/:id', critical: false },
  { method: 'GET', path: '/api/export', critical: true },

  // Internal APIs (less critical)
  { method: 'GET', path: '/api/config', critical: false },
  { method: 'POST', path: '/api/mock-data', critical: false }
];

// Focus on critical endpoints first
const criticalAPIs = API_ENDPOINTS.filter(api => api.critical);
```

### 2. Define API Contracts

Create OpenAPI/Swagger spec:

```yaml
# api-contract.yaml
openapi: 3.0.0
info:
  title: MVP API Contract
  version: 1.0.0-mvp

paths:
  /api/health:
    get:
      summary: Health check
      responses:
        '200':
          description: Service is healthy
          content:
            application/json:
              schema:
                type: object
                required: [status, timestamp]
                properties:
                  status:
                    type: string
                    enum: [healthy, degraded]
                  timestamp:
                    type: string
                    format: date-time

  /api/dashboard:
    get:
      summary: Dashboard data
      responses:
        '200':
          description: Dashboard metrics
          content:
            application/json:
              schema:
                type: object
                required: [metrics, items, lastUpdate]
                properties:
                  metrics:
                    type: object
                    properties:
                      total: { type: number }
                      active: { type: number }
                      revenue: { type: number }
                  items:
                    type: array
                    items:
                      $ref: '#/components/schemas/Item'
                  lastUpdate:
                    type: string

  /api/items:
    post:
      summary: Create item
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name]
              properties:
                name: { type: string }
                value: { type: number }
      responses:
        '201':
          description: Item created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item'

components:
  schemas:
    Item:
      type: object
      required: [id, name, createdAt]
      properties:
        id: { type: integer }
        name: { type: string }
        value: { type: number }
        status: { type: string }
        createdAt: { type: string, format: date-time }
```

### 3. Simple Contract Tests

Create lightweight contract tests:

```javascript
// contract-tests.js
const assert = require('assert');
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001';

// Test contract, not implementation
async function testContracts() {
  console.log('🧪 Running Contract Tests...\n');

  // Test 1: Health endpoint returns required fields
  await test('GET /api/health', async () => {
    const response = await fetch(`${BASE_URL}/api/health`);
    const data = await response.json();

    assert(response.status === 200, 'Status should be 200');
    assert(data.status, 'Should have status field');
    assert(data.timestamp, 'Should have timestamp field');
    assert(['healthy', 'degraded'].includes(data.status), 'Status should be valid enum');
  });

  // Test 2: Dashboard returns expected structure
  await test('GET /api/dashboard', async () => {
    const response = await fetch(`${BASE_URL}/api/dashboard`);
    const data = await response.json();

    assert(response.status === 200, 'Status should be 200');
    assert(data.metrics, 'Should have metrics');
    assert(typeof data.metrics.total === 'number', 'Total should be number');
    assert(Array.isArray(data.items), 'Items should be array');
    assert(data.lastUpdate, 'Should have lastUpdate');
  });

  // Test 3: Create item returns correct structure
  await test('POST /api/items', async () => {
    const response = await fetch(`${BASE_URL}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Item' })
    });
    const data = await response.json();

    assert(response.status === 201, 'Status should be 201');
    assert(data.id, 'Should return item with id');
    assert(data.name === 'Test Item', 'Should return item name');
    assert(data.createdAt, 'Should have createdAt');
  });

  // Test 4: Export endpoint exists
  await test('GET /api/export', async () => {
    const response = await fetch(`${BASE_URL}/api/export`);

    assert(response.status === 200, 'Export should return 200');
    // Don't test content, just that it responds
  });

  console.log('\n✅ All contract tests passed!');
}

// Simple test runner
async function test(name, fn) {
  try {
    await fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    process.exit(1);
  }
}

// Run tests
testContracts().catch(console.error);
```

### 4. Response Schema Validation

Add basic schema validation:

```javascript
// schema-validator.js
function validateSchema(data, schema) {
  const errors = [];

  // Check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  // Check field types
  if (schema.properties) {
    for (const [field, fieldSchema] of Object.entries(schema.properties)) {
      if (field in data) {
        const value = data[field];
        const type = fieldSchema.type;

        if (type === 'string' && typeof value !== 'string') {
          errors.push(`${field} should be string`);
        } else if (type === 'number' && typeof value !== 'number') {
          errors.push(`${field} should be number`);
        } else if (type === 'array' && !Array.isArray(value)) {
          errors.push(`${field} should be array`);
        } else if (type === 'object' && typeof value !== 'object') {
          errors.push(`${field} should be object`);
        }
      }
    }
  }

  return errors;
}

// Use in tests
function testAPIResponse(response, schema) {
  const errors = validateSchema(response, schema);
  if (errors.length > 0) {
    throw new Error(`Schema validation failed:\n${errors.join('\n')}`);
  }
}
```

### 5. Contract Test Runner

Create simple test runner:

```bash
#!/bin/bash
# run-contract-tests.sh

echo "🔄 Starting Contract Tests"
echo "========================="

# Ensure services are running
docker-compose up -d
sleep 2

# Run contract tests
node contract-tests.js

if [ $? -eq 0 ]; then
  echo "✅ Contract tests passed"
else
  echo "❌ Contract tests failed"
  exit 1
fi

# Optional: Generate report
echo ""
echo "📊 Contract Coverage Report"
echo "=========================="
echo "Endpoints tested: 4/9"
echo "Critical endpoints: 4/4 ✅"
echo "Non-critical: 0/5 ⏭️"
echo ""
echo "Next: Add more contracts as needed"
```

### 6. Backwards Compatibility Check

Prevent breaking changes:

```javascript
// compatibility-check.js

const previousContract = {
  '/api/dashboard': {
    response: ['metrics', 'items', 'lastUpdate']
  },
  '/api/items': {
    response: ['id', 'name', 'createdAt']
  }
};

function checkCompatibility(currentContract, previousContract) {
  const breaking = [];

  for (const [endpoint, prev] of Object.entries(previousContract)) {
    const current = currentContract[endpoint];

    // Check if endpoint still exists
    if (!current) {
      breaking.push(`Endpoint removed: ${endpoint}`);
      continue;
    }

    // Check if all previous fields still exist
    for (const field of prev.response) {
      if (!current.response.includes(field)) {
        breaking.push(`Field removed from ${endpoint}: ${field}`);
      }
    }
  }

  if (breaking.length > 0) {
    console.error('⚠️ Breaking changes detected:');
    breaking.forEach(b => console.error(`  - ${b}`));
    return false;
  }

  console.log('✅ No breaking changes');
  return true;
}
```

### 7. Mock Server for Testing

Create contract-based mock server:

```javascript
// mock-server.js
const express = require('express');
const app = express();

// Generate responses based on contract
function generateMockResponse(schema) {
  const mock = {};

  if (schema.properties) {
    for (const [key, prop] of Object.entries(schema.properties)) {
      if (prop.type === 'string') {
        mock[key] = 'mock-string';
      } else if (prop.type === 'number') {
        mock[key] = 42;
      } else if (prop.type === 'array') {
        mock[key] = [];
      } else if (prop.type === 'object') {
        mock[key] = {};
      }
    }
  }

  return mock;
}

// Mock endpoints based on contract
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    metrics: { total: 100, active: 75, revenue: 50000 },
    items: [],
    lastUpdate: new Date().toISOString()
  });
});

app.listen(3002, () => {
  console.log('Mock server running on port 3002');
});
```

### 8. Update Contract Testing Documentation
Create or update `.kiro/specs/[project-name]/07-contract.md`:

```markdown
# Contract Testing - [Project Name]

**Last Updated**: [CURRENT_TIMESTAMP]
**API Scope**: [all/critical/customer-facing]

## API Contracts Defined
[List of contracts from Step 2]

## Test Coverage
**APIs Tested**: [COUNT]/[TOTAL]
**Test Status**: ✅ All passing

## Current Status
✅ Contract Tests Implemented - API surface protected

## Next Steps
- [ ] Add core business logic tests: `/kiro-rapid:08-core-test [test-focus]`
```

## Output

After implementing contracts:
1. ✅ API contracts defined
2. ✅ Contract tests running
3. ✅ Schema validation active
4. ✅ Breaking changes prevented
5. ✅ Mock server available

## What We're NOT Doing

- ❌ Unit tests for every function
- ❌ Integration tests
- ❌ E2E tests
- ❌ Performance tests
- ❌ Security tests

## Next Command

**Core testing:** `/kiro-rapid:core-test` for critical business logic only