# Claude Code Spec-Driven Development

Kiro-style Spec Driven Development implementation using claude code slash commands, hooks and agents.

## Project Context

### Paths
- Steering: `{{KIRO_DIR}}/steering/`
- Specs: `{{KIRO_DIR}}/specs/`
- Commands: `{{AGENT_DIR}}/commands/kiro/` (Standard SDD)
- Rapid Commands: `{{AGENT_DIR}}/commands/kiro/kiro-rapid/` (MVP Development)

### Steering vs Specification

**Steering** (`{{KIRO_DIR}}/steering/`) - Guide AI with project-wide rules and context
**Specs** (`{{KIRO_DIR}}/specs/`) - Formalize development process for individual features

### Active Specifications
- Check `{{KIRO_DIR}}/specs/` for active specifications
- Use `/kiro:spec-status [feature-name]` to check progress

## Development Guidelines
{{DEV_GUIDELINES}}

## Development Approach Selection

### When to Use Kiro Standard (`/kiro:`)
- **Mature projects** with clear requirements
- **Enterprise applications** requiring documentation
- **Teams > 3 people** needing coordination
- **Regulated industries** (finance, healthcare)
- **Long-term products** (> 6 months lifespan)

### When to Use Kiro-Rapid (`/kiro-rapid:`)
- **Startups & MVPs** needing quick validation
- **Hackathons & POCs** with time constraints
- **Solo developers** or small teams
- **Uncertain requirements** needing exploration
- **Demo-first** development (investor presentations)

## Workflow

### Phase 0: Steering (Optional)
`/kiro:steering` - Create/update steering documents
`/kiro:steering-custom` - Create custom steering for specialized contexts

Note: Optional for new features or small additions. You can proceed directly to spec-init.

### Phase 1: Specification Creation
1. `/kiro:spec-init [detailed description]` - Initialize spec with detailed project description
2. `/kiro:spec-requirements [feature]` - Generate requirements document
3. `/kiro:spec-design [feature]` - Interactive: "Have you reviewed requirements.md? [y/N]"
4. `/kiro:spec-tasks [feature]` - Interactive: Confirms both requirements and design review

### Phase 2: Progress Tracking
`/kiro:spec-status [feature]` - Check current progress and phases

## Rapid MVP Workflow (Alternative Path)

### Quick Start (1 minute)
`/kiro-rapid:init "project idea"` - Generate runnable skeleton in 30 seconds

### Development Cycle (1 week to demo)
1. `/kiro-rapid:demo "feature"` - Write code directly (hardcode OK)
2. `/kiro-rapid:run` - Execute and show to stakeholders
3. `/kiro-rapid:feedback` - Collect and organize feedback
4. `/kiro-rapid:iterate "changes"` - Rapid adjustments based on feedback
5. `/kiro-rapid:lock` - Finalize MVP scope

### Quality Addition (when stable)
1. `/kiro-rapid:contract` - Add API contract tests only
2. `/kiro-rapid:core-test` - Test business logic only
3. `/kiro-rapid:refactor` - Clean up technical debt
4. `/kiro-rapid:evolve` - Transform into production system

### Status Check
`/kiro-rapid:status` - View current MVP phase and recommendations

## Development Rules

### For Kiro Standard
1. **Consider steering**: Run `/kiro:steering` before major development (optional for new features)
2. **Follow 3-phase approval workflow**: Requirements → Design → Tasks → Implementation
3. **Approval required**: Each phase requires human review (interactive prompt or manual)
4. **No skipping phases**: Design requires approved requirements; Tasks require approved design
5. **Update task status**: Mark tasks as completed when working on them
6. **Keep steering current**: Run `/kiro:steering` after significant changes
7. **Check spec compliance**: Use `/kiro:spec-status` to verify alignment

### For Kiro-Rapid
1. **Speed over perfection**: Demo functionality matters more than code quality
2. **Technical debt is OK**: Mark with `// TECH-DEBT: [RAPID]` comments
3. **Hardcode allowed**: Use fake data and mocks freely in demo phase
4. **Test later**: No tests required until `/kiro-rapid:contract` phase
5. **Iterate quickly**: Each iteration should be < 1 day
6. **Lock scope early**: Use `/kiro-rapid:lock` to prevent feature creep

## Steering Configuration

### Current Steering Files
Managed by `/kiro:steering` command. Updates here reflect command changes.

### Active Steering Files
- `product.md`: Always included - Product context and business objectives
- `tech.md`: Always included - Technology stack and architectural decisions
- `structure.md`: Always included - File organization and code patterns

### Custom Steering Files
<!-- Added by /kiro:steering-custom command -->
<!-- Format:
- `filename.md`: Mode - Pattern(s) - Description
  Mode: Always|Conditional|Manual
  Pattern: File patterns for Conditional mode
-->

### Inclusion Modes
- **Always**: Loaded in every interaction (default)
- **Conditional**: Loaded for specific file patterns (e.g., "*.test.js")
- **Manual**: Reference with `@filename.md` syntax

