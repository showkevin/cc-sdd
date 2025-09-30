# Kiro-Rapid: MVP 快速開發系統

## 🎯 系統定位

Kiro-Rapid 是 Kiro 體系下專為新創和 MVP 快速驗證設計的開發模式。
與 Kiro 標準版共享品牌，但採用完全不同的開發哲學：**先驗證價值，再追求品質**。

## 🆚 與 Kiro Standard 的差異

| 特性 | Kiro Standard | Kiro Rapid |
|------|---------------|------------|
| **適用場景** | 需求明確的成熟專案 | 新創 MVP 快速驗證 |
| **開發順序** | Spec→Requirements→Design→Code | Code→Demo→Feedback→Iterate |
| **測試策略** | TDD 優先，完整測試覆蓋 | Demo 優先，漸進式測試 |
| **文件要求** | 完整規格文件 | 最小文件，程式碼即文件 |
| **審批流程** | 多階段審批 | 無審批，快速迭代 |
| **時間目標** | 2-3 週完整流程 | 1 週內可展示 Demo |

## 📖 使用指南

### 快速開始
```bash
# 1. 初始化專案（30秒）
/kiro-rapid:init "電商購物車系統"

# 2. 開發 Demo 功能（直接寫 code）
/kiro-rapid:demo "加入購物車功能"

# 3. 執行展示
/kiro-rapid:run
```

### 完整工作流程

#### 📍 階段 0：專案啟動（1分鐘內）
```bash
/kiro-rapid:init "專案描述"
```
- 自動選擇技術棧（Express + React + SQLite）
- 生成可立即運行的骨架
- 包含 Docker Compose 配置
- 無需任何文件或設計

#### 📍 階段 1：Demo 驗證（1週內）
```bash
/kiro-rapid:demo "功能名稱"    # 直接寫功能，允許 hardcode
/kiro-rapid:run                 # 執行並展示給客戶/投資人
```
- 功能優先，品質其次
- 允許假資料和 hardcode
- UI 使用 Bootstrap 模板即可
- 無需處理例外情況

#### 📍 階段 2：需求確認（持續迭代）
```bash
/kiro-rapid:feedback            # 整理收集到的回饋
/kiro-rapid:iterate "調整內容"  # 根據回饋快速調整
/kiro-rapid:lock                # 確定並鎖定核心功能
```
- 與客戶確認功能方向
- 快速調整不符期待的部分
- 記錄技術債供後續處理

#### 📍 階段 3：補測試基礎（需求穩定後）
```bash
/kiro-rapid:contract            # 定義 API 契約測試
/kiro-rapid:core-test          # 僅測試核心業務邏輯
```
- 優先契約測試，保護介面
- 只測試核心邏輯（計價、驗證等）
- 非核心部分暫不測試

#### 📍 階段 4：核心重構（用戶增長後）
```bash
/kiro-rapid:refactor           # 清理累積的技術債
/kiro-rapid:evolve            # 升級為正式產品架構
```
- 重構 Demo 階段的 hacky code
- 導入分層架構（DDD/Hexagonal）
- 建立完整測試金字塔

#### 📍 輔助命令
```bash
/kiro-rapid:status            # 查看當前開發階段和建議
```

## 🎯 核心理念

### 速度指標
- **Time to Demo**: < 1 週
- **Time to Feedback**: < 2 天
- **Time to Pivot**: < 1 天

### 開發原則
1. **先跑起來，再優化**
2. **客戶回饋 > 程式品質**
3. **漸進式測試，不一次到位**
4. **技術債明確標記，延後處理**

### 階段判斷邏輯
```javascript
function detectPhase(project) {
  if (!project.hasUsers) return "Demo"      // 無用戶：Demo 模式
  if (project.users < 10) return "MVP"      // <10 用戶：MVP 模式
  if (project.users < 100) return "Beta"    // <100 用戶：Beta 測試
  if (project.users < 1000) return "Growth" // <1000 用戶：成長期
  return "Scale"                            // >1000 用戶：規模化
}
```

## 📊 測試策略演進

| 階段 | 測試方式 | 工具範例 | 覆蓋範圍 |
|------|----------|---------|----------|
| Demo | 手動測試 | Browser | 主流程能跑通 |
| MVP | E2E Smoke | Playwright | Happy path |
| Beta | 契約測試 | Pact | API 介面 |
| Growth | 單元測試 | Jest | 核心邏輯 60% |
| Scale | 完整測試 | Jest + Pact | 全面覆蓋 80% |

## ⚠️ 注意事項

### 何時使用 Kiro-Rapid
✅ 新創專案 POC
✅ 快速驗證商業假設
✅ 投資人 Demo
✅ 黑客松專案
✅ 內部創新實驗

### 何時使用 Kiro Standard
✅ 需求明確的專案
✅ 有既定規範的企業專案
✅ 需要完整文件的專案
✅ 團隊規模 > 5 人
✅ 金融、醫療等高監管產業

## 🔄 從 Rapid 升級到 Standard

當專案成熟後（用戶 > 100），可以逐步遷移：

```bash
# 1. 使用 evolve 升級架構
/kiro-rapid:evolve

# 2. 補充完整規格文件
/kiro:spec-init "從 rapid 遷移的專案"
/kiro:spec-requirements
/kiro:spec-design

# 3. 導入完整測試
/kiro:spec-impl --tdd
```

## 📝 技術債管理

所有 Rapid 開發產生的技術債都會標記：

```javascript
// TECH-DEBT: [RAPID] 需要重構 - Demo 階段 hardcode
// TODO: [RAPID-REFACTOR] 升級後需要處理
// FIXME: [RAPID-SECURITY] 生產環境前必須修復
```

技術債分級：
- 🔴 **Critical**: 上線前必須處理
- 🟡 **Major**: 用戶增長前處理
- 🟢 **Minor**: 有空再處理

## 🚀 命令快速參考

### 基礎流程
```bash
/kiro-rapid:init "idea"        # 初始化
/kiro-rapid:demo "feature"     # 開發功能
/kiro-rapid:run                # 執行展示
```

### 迭代優化
```bash
/kiro-rapid:feedback           # 收集回饋
/kiro-rapid:iterate "changes"  # 快速調整
/kiro-rapid:lock               # 鎖定功能
```

### 品質提升
```bash
/kiro-rapid:contract           # 契約測試
/kiro-rapid:core-test         # 核心測試
```

### 產品成熟
```bash
/kiro-rapid:refactor          # 清理技術債
/kiro-rapid:evolve            # 升級架構
```

### 狀態查詢
```bash
/kiro-rapid:status            # 查看階段
```

## 📂 命令檔案說明

| 檔案 | 命令 | 用途 |
|------|------|------|
| 01-init.md | `/kiro-rapid:init` | 快速初始化專案 |
| 02-demo.md | `/kiro-rapid:demo` | 開發 Demo 功能 |
| 03-run.md | `/kiro-rapid:run` | 執行並展示 |
| 04-feedback.md | `/kiro-rapid:feedback` | 收集用戶回饋 |
| 05-iterate.md | `/kiro-rapid:iterate` | 基於回饋迭代 |
| 06-lock.md | `/kiro-rapid:lock` | 鎖定核心功能 |
| 07-contract.md | `/kiro-rapid:contract` | 補充契約測試 |
| 08-core-test.md | `/kiro-rapid:core-test` | 核心邏輯測試 |
| 09-refactor.md | `/kiro-rapid:refactor` | 清理技術債 |
| 10-evolve.md | `/kiro-rapid:evolve` | 升級為正式產品 |
| status.md | `/kiro-rapid:status` | 查詢當前狀態 |

## 💡 最佳實踐

### Demo 階段
- 用假資料沒關係
- Hardcode 可以接受
- 複製貼上 OK
- 重點是**能展示**

### MVP 階段
- 開始收集真實回饋
- 標記技術債位置
- 保持快速迭代
- 不要過度優化

### 成長階段
- 逐步補充測試
- 處理關鍵技術債
- 改善程式碼結構
- 準備規模化

## 📈 成功案例

使用 Kiro-Rapid 的專案通常能達到：
- **3天內** 完成首個 Demo
- **1週內** 獲得用戶回饋
- **2週內** 確定產品方向
- **1個月內** 達到 PMF (Product-Market Fit)

## 🤝 貢獻指南

如果你有改進建議：
1. 在實際專案中使用並記錄問題
2. 提出具體的改進方案
3. 保持「速度優先」的核心理念

## 📞 支援

遇到問題時：
- 先用 `/kiro-rapid:status` 檢查狀態
- 查看各命令的 allowed-tools 確認權限
- 記住：Done is better than perfect

---

**記住：Kiro-Rapid 的目標是讓你在最短時間內驗證想法，而不是打造完美產品。**

*先跑起來，再談優化！*