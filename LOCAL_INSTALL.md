# 本地開發版本安裝指南

本文檔說明如何使用本地開發版本的 cc-sdd 工具，而非 npm 官方發布版本。

## 🔄 安裝方式比較

### 線上安裝（官方版本）
```bash
# 使用 npm 官方版本
npx cc-sdd@latest --lang zh-TW
```

### 本地安裝（開發版本）
```bash
# 使用本地開發版本
cd tools/cc-sdd
npm install && npm run build
node dist/cli.js --lang zh-TW
```

## 🚀 本地開發版本安裝

### 方法 1：直接執行本地專案

#### 1. 準備本地環境
```bash
# 進入 cc-sdd 工具目錄
cd /path/to/cc-sdd/tools/cc-sdd

# 安裝依賴
npm install
```

#### 2. 建置專案
```bash
# 編譯 TypeScript 源碼
npm run build

# 驗證建置結果
ls -la dist/
```

#### 3. 執行本地版本

**基本用法：**
```bash
# 基本安裝（預設：英文，Claude Code）
node dist/cli.js

# 繁體中文版本
node dist/cli.js --lang zh-TW

# 指定不同的 AI 代理
node dist/cli.js --claude-code --lang zh-TW
node dist/cli.js --cursor --lang zh-TW
node dist/cli.js --gemini-cli --lang zh-TW
node dist/cli.js --qwen-code --lang zh-TW
```

**進階選項：**
```bash
# 預覽模式（不實際安裝）
node dist/cli.js --lang zh-TW --dry-run

# 指定作業系統
node dist/cli.js --lang zh-TW --os mac
node dist/cli.js --lang zh-TW --os windows
node dist/cli.js --lang zh-TW --os linux

# 自訂 Kiro 目錄
node dist/cli.js --lang zh-TW --kiro-dir docs/specs

# 備份現有檔案
node dist/cli.js --lang zh-TW --backup

# 強制覆寫模式
node dist/cli.js --lang zh-TW --overwrite force
```

## 📁 使用流程範例

### 在目標專案中使用繁體中文版本

```bash
# 1. 進入你的開發專案目錄
cd /path/to/your/project

# 2. 執行本地 cc-sdd（繁體中文）
node /path/to/cc-sdd/tools/cc-sdd/dist/cli.js --lang zh-TW

# 3. 驗證安裝結果
ls -la .claude/commands/kiro/  # Claude Code 指令
ls -la .kiro/                  # 規格與指導目錄
cat CLAUDE.md                  # 專案配置檔案
```

### 完整開發工作流程

```bash
# 1. 使用本地版本安裝 cc-sdd（繁體中文）
node /path/to/cc-sdd/tools/cc-sdd/dist/cli.js --lang zh-TW

# 2. 開始使用 Kiro 工作流程
/kiro:steering                                 # 建立專案記憶
/kiro:spec-init 使用者認證系統                # 初始化規格
/kiro:spec-requirements auth-system            # 產生需求
/kiro:spec-design auth-system                  # 技術設計
/kiro:spec-tasks auth-system                   # 實作任務
/kiro:spec-impl auth-system                    # TDD 實作
```

## 🔧 開發與測試

### 修改與重新建置
```bash
# 修改源碼後重新建置
cd tools/cc-sdd
npm run build

# 執行測試
npm test

# 監控模式測試
npm run test:watch
```

### 版本確認
```bash
# 檢查本地版本
node dist/cli.js --version
# 輸出：cc-sdd v1.1.5

# 檢查支援的語言
node dist/cli.js --help
```

## ✅ 優勢

**本地開發版本優勢：**
- 🔄 即時使用最新修改
- 🛠️ 可自由客製化功能
- 🌐 支援所有最新功能（v1.1.5）
- 🎯 無需網路連線
- 🚀 包含所有最新改進：
  - Qwen Code 支援
  - 12 種語言支援
  - 模板檔案優化
  - 錯誤處理改善

## 📝 注意事項

1. **依賴管理**：確保已執行 `npm install`
2. **建置確認**：修改後需重新執行 `npm run build`
3. **路徑設定**：使用絕對路徑避免路徑錯誤
4. **版本同步**：本地版本為 v1.1.5，與最新 upstream 同步

## 🆚 與線上版本差異

| 特性 | 線上版本 (npx) | 本地版本 (node) |
|------|---------------|----------------|
| 安裝方式 | `npx cc-sdd@latest` | `node dist/cli.js` |
| 版本控制 | 固定 npm 版本 | 本地開發版本 |
| 修改能力 | 無法修改 | 可自由修改 |
| 網路需求 | 需要網路 | 無需網路 |
| 功能更新 | 等待 npm 發布 | 即時可用 |

## 🔗 相關文檔

- [主要 README](README.md) - 專案總覽
- [工具文檔](tools/cc-sdd/README.md) - 詳細使用說明
- [繁體中文文檔](tools/cc-sdd/README_zh-TW.md) - 繁體中文完整指南