export type AgentType = 'claude-code' | 'gemini-cli' | 'qwen-code' | 'cursor';

export interface AgentLayout {
  commandsDir: string;
  agentDir: string;
  docFile: string;
  commandsDirs?: string[];  // Support multiple command directories
}

export interface CCSddConfig {
  agentLayouts?: Partial<Record<AgentType, Partial<AgentLayout>>>;
}

export const resolveAgentLayout = (agent: AgentType, config?: CCSddConfig): AgentLayout => {
  const defaults: Record<AgentType, AgentLayout> = {
    'claude-code': {
      commandsDir: '.claude/commands/kiro',
      commandsDirs: ['.claude/commands/kiro', '.claude/commands/kiro-rapid'],
      agentDir: '.claude',
      docFile: 'CLAUDE.md',
    },
    'gemini-cli': {
      commandsDir: '.gemini/commands/kiro',
      commandsDirs: ['.gemini/commands/kiro', '.gemini/commands/kiro-rapid'],
      agentDir: '.gemini',
      docFile: 'GEMINI.md',
    },
    'qwen-code': {
      commandsDir: '.qwen/commands/kiro',
      commandsDirs: ['.qwen/commands/kiro', '.qwen/commands/kiro-rapid'],
      agentDir: '.qwen',
      docFile: 'QWEN.md',
    },
    'cursor': {
      commandsDir: '.cursor/commands/kiro',
      commandsDirs: ['.cursor/commands/kiro', '.cursor/commands/kiro-rapid'],
      agentDir: '.cursor',
      docFile: 'AGENTS.md',
    },
  };

  const base = defaults[agent];
  const override = config?.agentLayouts?.[agent] ?? {};
  return { ...base, ...override } as AgentLayout;
};
