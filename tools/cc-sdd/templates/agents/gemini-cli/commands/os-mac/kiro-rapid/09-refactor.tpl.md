---
description: Clean up the worst technical debt before going to production
allowed-tools: Read, Write, Edit, MultiEdit, Grep, Glob, Bash
argument-hint: [refactor-scope]
---

# Technical Debt Cleanup

Fix the most dangerous debt before production.

## 🎯 Mission: Make It Safe, Not Perfect

### Refactoring Priority
1. **Security holes** - Fix immediately
2. **Data loss risks** - Fix before launch
3. **Performance bottlenecks** - Fix if < 2 seconds
4. **Code duplication** - Fix if > 3 copies
5. **Everything else** - Leave it

## Task: Strategic Debt Reduction

### 1. Scan for Critical Issues

Find the dangerous debt:

```bash
# security-scan.sh
echo "🔍 Scanning for Critical Issues"
echo "==============================="

# Check for hardcoded secrets
echo "Checking for secrets..."
grep -r "password\|secret\|key\|token" --include="*.js" --include="*.env" .

# Check for SQL injection risks
echo "Checking for SQL injection..."
grep -r "query.*\+.*req\." --include="*.js" .

# Check for open CORS
echo "Checking CORS settings..."
grep -r "Access-Control-Allow-Origin.*\*" --include="*.js" .

# Check for console.logs with sensitive data
echo "Checking console.logs..."
grep -r "console.log.*password\|token" --include="*.js" .
```

### 2. Fix Security Issues

Critical security fixes only:

```javascript
// BEFORE: security-issues.js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // BAD
  next();
});

const password = 'admin123'; // BAD
db.query(`SELECT * FROM users WHERE id = ${req.params.id}`); // BAD
console.log('User password:', user.password); // BAD

// AFTER: security-fixes.js
app.use((req, res, next) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

const password = process.env.ADMIN_PASSWORD; // From environment
db.query('SELECT * FROM users WHERE id = ?', [req.params.id]); // Parameterized
console.log('User authenticated'); // No sensitive data
```

### 3. Prevent Data Loss

Fix anything that could lose user data:

```javascript
// BEFORE: data-loss-risk.js
app.post('/api/save', (req, res) => {
  // No error handling - data could be lost
  db.save(req.body);
  res.json({ success: true });
});

// AFTER: data-protection.js
app.post('/api/save', async (req, res) => {
  try {
    // Basic validation
    if (!req.body || !req.body.data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // Save with error handling
    const result = await db.save(req.body);

    // Confirm save succeeded
    if (!result.id) {
      throw new Error('Save failed');
    }

    res.json({ success: true, id: result.id });
  } catch (error) {
    // Log error for debugging
    console.error('Save error:', error.message);

    // Return error to user
    res.status(500).json({
      error: 'Could not save data',
      // TECH-DEBT: [RAPID] Better error messages
      message: 'Please try again'
    });
  }
});
```

### 4. Fix Performance Killers

Only fix if it's really bad:

```javascript
// BEFORE: performance-killer.js
app.get('/api/search', async (req, res) => {
  // N+1 query problem
  const items = await db.getItems();
  for (const item of items) {
    item.details = await db.getDetails(item.id); // BAD: 100 items = 100 queries
  }
  res.json(items);
});

// AFTER: performance-fix.js
app.get('/api/search', async (req, res) => {
  // Single query with join
  const items = await db.query(`
    SELECT i.*, d.*
    FROM items i
    LEFT JOIN details d ON i.id = d.item_id
  `);

  // Simple caching for demo
  const CACHE_TIME = 60000; // 1 minute
  if (cache.has('search') && Date.now() - cache.time < CACHE_TIME) {
    return res.json(cache.get('search'));
  }

  cache.set('search', items);
  cache.time = Date.now();

  res.json(items);
});
```

### 5. Consolidate Duplicate Code

Only if it's really duplicated:

```javascript
// BEFORE: duplicate-code.js
function calculateTotalA(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total * 1.1; // with tax
}

function calculateTotalB(products) {
  let sum = 0;
  for (const product of products) {
    sum += product.price * product.quantity;
  }
  return sum * 1.1; // with tax
}

function calculateTotalC(orders) {
  let amount = 0;
  for (const order of orders) {
    amount += order.price * order.quantity;
  }
  return amount * 1.1; // with tax
}

// AFTER: consolidated.js
function calculateTotal(items, taxRate = 0.1) {
  const subtotal = items.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  );
  return subtotal * (1 + taxRate);
  // TECH-DEBT: [RAPID] Add currency handling
}
```

### 6. Add Minimal Error Handling

Just enough to not crash:

```javascript
// error-handling.js

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  // Don't leak internal errors
  const message = process.env.NODE_ENV === 'production'
    ? 'Something went wrong'
    : err.message;

  res.status(500).json({
    error: true,
    message
  });
});

// Uncaught promise rejection
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  // Don't exit in production
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Wrapper for async routes
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
```

### 7. Environment Configuration

Move hardcoded values to config:

```javascript
// BEFORE: hardcoded.js
const PORT = 3001;
const DB_PATH = './data.db';
const SECRET = 'my-secret-key';
const MAX_ITEMS = 100;

// AFTER: config.js
require('dotenv').config();

const config = {
  port: process.env.PORT || 3001,
  db: {
    path: process.env.DB_PATH || './data.db',
    // TECH-DEBT: [RAPID] Add connection pooling
  },
  security: {
    secret: process.env.SECRET || 'change-me-in-production',
    cors: process.env.CORS_ORIGIN || 'http://localhost:3000'
  },
  limits: {
    maxItems: parseInt(process.env.MAX_ITEMS) || 100,
    maxUploadSize: process.env.MAX_UPLOAD || '10mb'
  }
};

// Validate required config
if (!config.security.secret || config.security.secret === 'change-me-in-production') {
  console.warn('⚠️ Using default secret - change for production!');
}

module.exports = config;
```

### 8. Basic Logging

Add just enough logging:

```javascript
// logging.js

// Simple logger
const logger = {
  info: (message, data) => {
    console.log(`[INFO] ${new Date().toISOString()} ${message}`,
      data ? JSON.stringify(data) : '');
  },

  error: (message, error) => {
    console.error(`[ERROR] ${new Date().toISOString()} ${message}`,
      error?.stack || error);
  },

  warn: (message) => {
    console.warn(`[WARN] ${new Date().toISOString()} ${message}`);
  }
};

// Log important events only
app.use((req, res, next) => {
  // Only log non-GET requests
  if (req.method !== 'GET') {
    logger.info(`${req.method} ${req.path}`);
  }
  next();
});
```

### 9. Database Safety

Minimal safety measures:

```javascript
// db-safety.js

// Add transaction support for critical operations
async function safeTransaction(operations) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    for (const operation of operations) {
      await operation(connection);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// Backup before destructive operations
function backupBeforeDelete() {
  const backup = `backup-${Date.now()}.db`;
  // TECH-DEBT: [RAPID] Implement actual backup
  console.log(`Backup would be saved to ${backup}`);
}
```

### 10. Document Critical Parts

Add comments only where needed:

```javascript
// documentation.js

/**
 * CRITICAL: This calculates customer billing
 * Any changes must be tested with finance team
 */
function calculateInvoiceTotal(items, customer) {
  // Business rule: VIP customers get 10% discount
  const discount = customer.type === 'VIP' ? 0.1 : 0;

  // WARNING: Tax calculation varies by region
  // TODO: Implement proper tax service
  const tax = 0.1; // Hardcoded 10% for MVP

  const subtotal = calculateSubtotal(items);
  const discountAmount = subtotal * discount;
  const taxAmount = (subtotal - discountAmount) * tax;

  return {
    subtotal,
    discount: discountAmount,
    tax: taxAmount,
    total: subtotal - discountAmount + taxAmount
  };
}
```

## Refactoring Checklist

Before considering refactoring done:

```markdown
# Refactoring Complete Checklist

## 🔒 Security
- [ ] No hardcoded passwords/keys
- [ ] SQL injection prevented
- [ ] CORS properly configured
- [ ] Sensitive data not logged

## 💾 Data Safety
- [ ] Error handling on saves
- [ ] Basic validation
- [ ] No silent failures

## ⚡ Performance
- [ ] No N+1 queries
- [ ] Basic caching added
- [ ] Response time < 2s

## 🔧 Maintainability
- [ ] Config extracted to env
- [ ] Worst duplication removed
- [ ] Critical parts commented

## 📊 Monitoring
- [ ] Basic error logging
- [ ] Health endpoint working
- [ ] Can diagnose issues
```

## What NOT to Refactor

Leave these for later:
- ❌ Code style/formatting
- ❌ Variable naming
- ❌ File organization
- ❌ Test coverage
- ❌ Documentation
- ❌ TypeScript conversion
- ❌ Framework upgrades

## Output

After refactoring:
1. ✅ Security holes patched
2. ✅ Data loss prevented
3. ✅ Worst performance fixed
4. ✅ Critical config extracted
5. ✅ Still works exactly the same

## Next Command

**Evolution:** `/kiro-rapid:evolve` to prepare for scaling