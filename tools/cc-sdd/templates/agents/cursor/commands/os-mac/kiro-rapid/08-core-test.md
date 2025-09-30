---
description: Test only critical business logic - skip everything else
allowed-tools: Read, Write, Edit, MultiEdit, Bash, Glob
argument-hint: [test-focus] [-y]
---

# Core Business Logic Testing

Test only what matters for the business.

## 🎯 Mission: Test Money, Not Menus

### Testing Priority
1. **Money calculations** - Pricing, billing, totals
2. **Business rules** - Validations, limits, workflows
3. **Data integrity** - Critical CRUD operations
4. **Everything else** - Skip it

## Task: Implement Minimal Core Tests

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
   - Read `.kiro/specs/[project-name]/01-init.md` - Project info and business rules
   - Read `.kiro/specs/[project-name]/02-demo.md` - Implemented features
   - Read `.kiro/specs/[project-name]/06-lock.md` - MVP scope and critical features
   - Read `.kiro/specs/[project-name]/07-contract.md` - API contracts (if exists)
   - Extract critical business logic that needs testing

3. **Build context summary** for core testing

### 1. Identify Core Business Logic

Find the code that matters:

```javascript
// core-logic-inventory.js
const CORE_BUSINESS_LOGIC = {
  // These MUST work correctly
  critical: [
    'calculateTotal()',      // Money involved
    'applyDiscount()',       // Money involved
    'validateOrder()',       // Business rule
    'checkInventory()',      // Business constraint
    'generateInvoice()'      // Legal requirement
  ],

  // These should work
  important: [
    'searchItems()',         // User experience
    'filterResults()',       // User experience
    'sortData()'            // User experience
  ],

  // These can fail (for now)
  ignore: [
    'formatDate()',         // Cosmetic
    'validateEmail()',      // Can fix later
    'resizeImage()',        // Not critical
    'logActivity()'        // Nice to have
  ]
};
```

### 2. Simple Test Framework

Don't overthink it - use basic assertions:

```javascript
// simple-test.js
const tests = [];
let passed = 0;
let failed = 0;

function test(description, fn) {
  tests.push({ description, fn });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      message || `Expected ${expected}, got ${actual}`
    );
  }
}

async function runTests() {
  console.log('🧪 Running Core Tests\n');

  for (const { description, fn } of tests) {
    try {
      await fn();
      console.log(`✅ ${description}`);
      passed++;
    } catch (error) {
      console.log(`❌ ${description}: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}
```

### 3. Core Business Logic Tests

Test the money and rules:

```javascript
// core-business-tests.js

// Test 1: Pricing calculations
test('Calculate total with tax', () => {
  const items = [
    { price: 100, quantity: 2 },  // 200
    { price: 50, quantity: 1 }    // 50
  ];
  const subtotal = calculateSubtotal(items); // 250
  const tax = calculateTax(subtotal, 0.1);   // 25
  const total = subtotal + tax;              // 275

  assertEqual(total, 275, 'Total should be 275');
});

// Test 2: Discount application
test('Apply percentage discount', () => {
  const original = 100;
  const discount = 0.2; // 20%
  const result = applyDiscount(original, discount);

  assertEqual(result, 80, 'Should apply 20% discount');
});

// Test 3: Business rule validation
test('Order validation rules', () => {
  // Minimum order amount
  const smallOrder = { total: 5 };
  const validOrder = { total: 50 };

  assert(!validateOrder(smallOrder), 'Should reject small order');
  assert(validateOrder(validOrder), 'Should accept valid order');
});

// Test 4: Inventory checks
test('Inventory availability', () => {
  const inventory = { itemA: 10, itemB: 0 };

  assert(checkInventory('itemA', 5, inventory), 'Should have stock');
  assert(!checkInventory('itemA', 15, inventory), 'Should not have enough');
  assert(!checkInventory('itemB', 1, inventory), 'Should be out of stock');
});

// Test 5: Critical data operations
test('Data integrity for create/update', () => {
  const newItem = createItem({ name: 'Test' });

  assert(newItem.id, 'Should generate ID');
  assert(newItem.createdAt, 'Should have timestamp');
  assert(newItem.name === 'Test', 'Should preserve data');

  const updated = updateItem(newItem.id, { name: 'Updated' });
  assert(updated.name === 'Updated', 'Should update data');
  assert(updated.id === newItem.id, 'Should keep same ID');
});
```

### 4. Edge Cases (Only for Money)

Test edge cases where money is involved:

```javascript
// money-edge-cases.js

test('Handle negative amounts', () => {
  const result = calculateTotal(-100);
  assert(result === 0, 'Should not allow negative totals');
});

test('Handle decimal precision', () => {
  const price = 19.99;
  const quantity = 3;
  const total = price * quantity; // 59.97, not 59.970000000000006

  // Use proper decimal handling
  const correct = Math.round(total * 100) / 100;
  assertEqual(correct, 59.97, 'Should handle decimals correctly');
});

test('Maximum order limit', () => {
  const hugeOrder = { total: 1000000 };
  assert(!validateOrder(hugeOrder), 'Should reject huge orders');
});

test('Discount limits', () => {
  const discount100 = applyDiscount(100, 1.0); // 100% discount
  assert(discount100 >= 0, 'Should not go negative');

  const discountNegative = applyDiscount(100, -0.1); // Negative discount
  assert(discountNegative === 100, 'Should ignore negative discount');
});
```

### 5. Data Validation Tests

Only for critical data:

```javascript
// data-validation-tests.js

test('Required fields validation', () => {
  // Only test fields that break the system if missing
  const invalidItem = { /* missing name */ };
  const validItem = { name: 'Product' };

  assert(!validateItem(invalidItem), 'Should require name');
  assert(validateItem(validItem), 'Should accept valid item');
});

test('Data type validation', () => {
  // Only if wrong type causes crashes
  const badPrice = { price: 'not-a-number' };
  const goodPrice = { price: 99.99 };

  assert(!validatePrice(badPrice), 'Should reject non-numeric price');
  assert(validatePrice(goodPrice), 'Should accept numeric price');
});
```

### 6. Performance Tests (Skip Most)

Only test if performance affects money:

```javascript
// performance-critical.js

test('Batch processing performance', () => {
  const start = Date.now();

  // Process 1000 orders (if this is a real use case)
  const orders = Array(1000).fill({ amount: 100 });
  const results = processBatch(orders);

  const duration = Date.now() - start;

  // Only fail if ridiculously slow
  assert(duration < 5000, 'Batch processing too slow');
});
```

### 7. Test Helpers

Create helpers for common test scenarios:

```javascript
// test-helpers.js

function createTestOrder(overrides = {}) {
  return {
    id: Math.random().toString(36),
    items: [],
    total: 0,
    status: 'pending',
    ...overrides
  };
}

function createTestUser(overrides = {}) {
  return {
    id: Math.random().toString(36),
    name: 'Test User',
    email: 'test@example.com',
    ...overrides
  };
}

// Generate test data quickly
function generateTestData(count, generator) {
  return Array(count).fill(0).map((_, i) => generator(i));
}

// Test async operations
async function testAsync(fn, timeout = 1000) {
  return Promise.race([
    fn(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}
```

### 8. Run Core Tests

Simple test runner script:

```bash
#!/bin/bash
# run-core-tests.sh

echo "🎯 Running Core Business Logic Tests"
echo "===================================="

# Only test what matters
node core-business-tests.js
node money-edge-cases.js

# Skip these in MVP
# node ui-tests.js          # Not critical
# node integration-tests.js # Too complex
# node e2e-tests.js        # Time consuming

echo ""
echo "📊 Test Coverage Report"
echo "======================"
echo "Core Logic: 80% ✅"
echo "UI Components: 0% ⏭️"
echo "API Endpoints: Contract tests only ✅"
echo "Database: Not tested ⏭️"
echo "Edge Cases: Money only ✅"
echo ""
echo "Good enough for MVP!"
```

### 9. What NOT to Test

Save time by skipping:

```javascript
// DO NOT TEST THESE IN MVP:

// ❌ UI components
test.skip('Button renders correctly', () => {});

// ❌ Styling
test.skip('Has correct CSS class', () => {});

// ❌ Logging
test.skip('Logs correct message', () => {});

// ❌ Third-party integrations
test.skip('Sends email via SendGrid', () => {});

// ❌ Browser compatibility
test.skip('Works in IE11', () => {});

// ❌ Accessibility
test.skip('Has proper ARIA labels', () => {});

// ❌ Internationalization
test.skip('Displays in Spanish', () => {});
```

## Test Coverage Goals

For MVP, aim for:
- 🎯 **Core business logic**: 80%
- 💰 **Money calculations**: 100%
- 📋 **Business rules**: 70%
- 🎨 **UI components**: 0%
- 🔗 **Integrations**: 0%
- 📱 **Responsive design**: 0%

### 10. Update Core Testing Documentation
Create or update `.kiro/specs/[project-name]/08-core-test.md`:

```markdown
# Core Business Logic Testing - [Project Name]

**Last Updated**: [CURRENT_TIMESTAMP]
**Test Focus**: [money/rules/data/all]

## Test Coverage
**Core Logic**: [PERCENTAGE]%
**Money Calculations**: [PERCENTAGE]%
**Business Rules**: [PERCENTAGE]%

## Test Results
**Status**: ✅ All tests passing
**Execution Time**: [SECONDS]s

## Current Status
✅ Core Tests Implemented - Business logic protected

## Next Steps
- [ ] Clean up technical debt: `/kiro-rapid:09-refactor [refactor-scope]`
```

## Output

After core testing:
1. ✅ Money calculations tested
2. ✅ Business rules validated
3. ✅ Critical paths covered
4. ✅ Edge cases (money) handled
5. ✅ Tests run in < 30 seconds

## Next Command

**Clean up:** `/kiro-rapid:refactor` to fix the worst technical debt