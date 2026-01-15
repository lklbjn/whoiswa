# WhoisWa

基于 Next.js 16 和 React 19 构建的现代化 RDAP/WHOIS 查询工具。

[🇺🇸 English](./README_en.md) | [🇨🇳 中文](./README.md)

## 📋 项目概述

WhoisWa 是一个快速、现代且用户友好的 Web 应用程序，用于查询域名注册信息。它利用 RDAP（注册数据访问协议）和传统的 WHOIS 协议来提供全面的域名数据。

**主要特性：**
- 🔍 **通用域名查询**：通过 RDAP 和 WHOIS 支持广泛的顶级域名（TLD）。
- 🌐 **多语言支持**：内置国际化（i18n）支持。
- 📜 **搜索历史**：自动在本地记录您最近的查询。
- ⚡ **现代 UI/UX**：使用 Tailwind CSS 和 Radix UI 构建的简洁界面。
- 📱 **响应式设计**：针对移动和桌面设备进行了全面优化。

## 🚀 安装指南

### 系统要求
- **Node.js**: v18.17 或更高版本（推荐：最新 LTS）
- **包管理器**: pnpm（必须）

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/whoiswa.git
   cd whoiswa
   ```

2. **安装依赖**
   本项目使用 `pnpm` 进行依赖管理。
   ```bash
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   ```

4. **打开浏览器**
   访问 [http://localhost:3000](http://localhost:3000) 查看应用程序。

## 📖 使用说明

### 基本域名查询
1. 在搜索栏中输入域名（例如 `example.com`）。
2. 按回车键或点击“搜索”按钮。
3. 查看详细的注册信息，包括：
   - 注册商详情
   - 注册/过期日期
   - 域名服务器
   - 状态代码
   - 联系信息（如果可用）

### 功能
- **语言切换**：使用顶部的语言选择器在支持的语言之间切换。
- **历史记录**：您的最近搜索记录显示在搜索栏下方，方便快速访问。

## 💻 开发指南

### 项目结构
```
whoiswa/
├── src/
│   ├── app/              # Next.js App Router 页面和 API 路由
│   ├── components/       # React 组件（UI、逻辑）
│   ├── contexts/         # React 上下文（例如：语言）
│   ├── lib/              # 工具函数和核心逻辑
│   │   ├── i18n/         # 国际化资源
│   │   ├── rdap/         # RDAP 协议实现
│   │   └── whois/        # WHOIS 协议实现
│   └── types/            # TypeScript 类型定义
├── public/               # 静态资源
└── ...config files       # 配置文件（Tailwind, Next.js 等）
```

### 环境设置
本地基础开发不需要特殊的环境变量。如果将来集成外部 API，请基于 `.env.example` 创建 `.env.local` 文件。

### 贡献
1. Fork 本仓库。
2. 创建新分支 (`git checkout -b feature/AmazingFeature`)。
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)。
4. 推送到分支 (`git push origin feature/AmazingFeature`)。
5. 提交 Pull Request。

## 📄 其他信息

### 许可证
本项目采用 **ISC 许可证**。

### 联系方式
如有问题或支持需求，请在仓库中提交 Issue。

### 版本记录
- **v1.0.0**: 初始版本，包含核心 RDAP/WHOIS 查询功能。

---
*由 Next.js, Tailwind CSS, 和 TypeScript 用心构建。*
