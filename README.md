# MY WARDROBE V2 — GitHub Pages 離線版（PWA）

這是你已確認可用的 **80 張穿搭／40 組 A/B** 網頁原封不動加上 PWA 離線層。沒有修改穿搭清單、圖像、配色、篩選或手機 A/B 排版。

## 目的

- GitHub Pages 提供網站網址。
- iPhone Safari **分享 → 加入主畫面 → 開啟為網頁 App**，像 App 一樣直接開啟。
- 第一次連線載入並完成 Service Worker 快取後，即使沒有網路，仍能選色系、隨機、切換 A/B、放大 80 張圖片。
- 圖片本身已內嵌於 `index.html`，不是每次讀取 80 張遠端圖片；整份約 2.8 MB。
- 不能保證永遠離線（iOS 在儲存空間不足或清除網站資料時可能移除快取），請保留此 ZIP 備份。

## 建立 GitHub 儲存庫及開啟 Pages

1. 登入 GitHub，建立新公開 Repository，例如 `my-wardrobe-v2`。GitHub 免費方案的 Pages 通常需使用公開 Repository；網站內容也會公開可看，請確認可接受公開穿搭照片與單品資料。
2. 將本資料夾**內容**（不是外層資料夾，也不是 ZIP 檔本身）放在儲存庫根目錄。必須存在根目錄 `index.html`、`sw.js`、`manifest.webmanifest`、`icons/`。
3. GitHub Repository → `Settings` → `Pages` → `Build and deployment` → `Deploy from a branch` → `main` → `/(root)` → `Save`。
4. 發布後前往 `https://<GitHub使用者名稱>.github.io/my-wardrobe-v2/`。名稱不同時 URL 也要換。

## iPhone 安裝與離線驗證

1. 用 **Safari** 打開 Pages 的 HTTPS 網址，確保穿搭可以操作。
2. 第一次保持網路連線，確認頁面完整載入；建議多停留數秒，讓離線快取完成。
3. 點 Safari 分享 →「加入主畫面」→ 若有「開啟為網頁 App」，請開啟 → 加入。
4. **第一次由主畫面圖示啟動時也要保持網路連線**，確認圖片與 A/B 都可以使用，讓主畫面 App 自己的儲存區也完成快取。
5. 完全關閉此 App，開啟飛航模式並關閉 Wi-Fi，再由主畫面打開，測試「換一組」、切換長短褲、點圖片放大。若可用，即完成離線準備。
6. 若失敗：關閉飛航模式、由主畫面圖示開一次，停留至載入完成後再測；仍失敗則檢查 Safari 設定與儲存空間。

## 更新網站內容

- 新的 HTML 請取代根目錄 `index.html`（包含 80 圖或未來新圖）。
- **同步修改 `sw.js` 的 `RELEASE` 字串版本號**（例如末尾 `-02`），讓新版本安裝快取並清掉舊快取。
- Pages 網站更新後，手機需在線上開啟一次，以便瀏覽器偵測新版 Service Worker。可能需要再開一次 App 才會顯示新內容。
- 平常無須重新安裝主畫面 App。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 含 80 圖的完整個人穿搭工具 |
| `sw.js` | 優先讀取已快取網頁，支援離線開啟 |
| `manifest.webmanifest` | App 名稱、主畫面、圖示、全螢幕模式 |
| `icons/` | 主畫面圖示 |
| `.nojekyll` | 靜態檔案直接發佈 |

**注意**：這是離線網頁 App，不是 App Store 原生 App；PWA 沒有自動同步 Google Sheets 或衣櫥變更。日後有新商品時需重新發布新版網頁與圖片。
