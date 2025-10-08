# GitHub Actions 工作流

## 📦 Web Archive 自动存档

### 功能说明
每次推送到 `main` 分支时，自动将网站存档到 [Internet Archive (Web Archive)](https://web.archive.org/)。

### 工作流程
1. ✅ 监听 `main` 分支的推送事件
2. ⏱️ 等待 60 秒确保 Vercel 部署完成
3. 📦 向 Web Archive 发送存档请求（主页、关于、联系页面）
4. ✅ 完成通知

### 手动触发
可以在 GitHub Actions 页面手动触发工作流：
1. 进入仓库的 **Actions** 标签
2. 选择 **Archive to Web Archive** 工作流
3. 点击 **Run workflow**

### 查看存档
- 🔗 历史快照: https://web.archive.org/web/*/f1justin.com

### 技术细节
- 使用 Web Archive 的 Save Page Now API
- 每个页面间隔 2 秒避免请求过快
- 超时设置 30 秒
- 支持手动触发 (`workflow_dispatch`)

### 注意事项
- Web Archive 存档可能需要几分钟到几小时才能完全处理
- 存档请求成功不代表立即可见，需要等待处理完成
- 存档是公开的，任何人都可以查看历史版本

