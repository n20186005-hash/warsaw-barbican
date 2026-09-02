# Warsaw Barbican (Barbakan Warszawski) — Visitor Guide

独立、非商业的单景点科普指南网站，主题为华沙瓮城（Barbakan Warszawski，位于华沙老城北端，Nowomiejska 15/17）。核心定位是 **`warsaw barbican` 主词的「一站式实用指南」落地页**，并承接 `things to do in warsaw`、`warsaw old town walking tour` 等泛词/长尾搜索。

## 技术栈

- Next.js 15（App Router）+ TypeScript
- next-intl v4（5 语言：**pl** 默认、en、zh、ru、de，`localePrefix: "always"`）
- 根 `/` → 重定向 `/pl`（`src/app/page.tsx`）
- PWA：`src/app/manifest.ts` + `public/sw.js`（network-first 导航 / 离线兜底 `/pl`）+ `public/icons/icon.svg`
- GA4 `G-HXM22WWPKP` 同意门控加载（`layout.tsx` 内联脚本 + `CookieBannerClient` 派发 `consent-updated`）

## 站点实体数据（单一数据源）

`src/config.ts` → `siteConfig`：

| 项 | 值 |
| --- | --- |
| 域名 | warsawbarbican.com |
| 地址 | Nowomiejska 15/17, 00-257 Warszawa, Poland |
| 电话 | +48 22 277 44 02 |
| 坐标 | 52.2506035, 21.01008 |
| Plus Code | 9G437266+62 |
| Google Maps | https://maps.app.goo.gl/yJjZQ1xta9pJCnzM9 |

> 注：官方博物馆网站给出的邮编为 **00-271**，Google 系数据为 **00-257**（页面与 JSON-LD 采用 00-257 以保持与 Google 本地资料一致）。如需统一请改 `src/config.ts`。

## 页面结构与 SEO 落地

页面顺序：Hero(H1) → Intro(面包屑) → **BasicInfo(首屏信息速览表)** → **Hours(H2 开放时间与门票)** → **History(H2 历史与建筑)** → **Transport(H2 如何到达)** → **WalkingTour(老城步行线)** → **Nearby(H2 周边景点)** → PhotoSpots → Facilities → Stories → Gallery → Reviews → **FAQ(7 问)** → Sources → Weather → **MapEmbed(地图+交通明细)** → Footer。

- Title/Description 五语重写，核心主词含 2026 年份信号（如 `Warsaw Barbican Guide: Opening Hours, Tickets & History (2026)`）
- JSON-LD：`Organization / WebSite / WebPage / TouristAttraction(含完整 NAP、双 openingHoursSpecification) / BreadcrumbList / FAQPage`（FAQPage 内容来自五语 faq 文案，与页面一致）
- sitemap.ts：20 个 URL，每条含 5 语 hreflang alternates；robots.ts 指向 sitemap
- 内容依据官方来源核实：barbakan.muzeumwarszawy.pl（免费通道 24/7、展览 2026-05-20→08-29 周三/周六 13:00–17:00、票价 12/8 zł）、WTP（电车 13/23/26 到 Stare Miasto 站）、UNESCO（1980 华沙历史中心）
- 步行环线锚文本覆盖 GSC 数据词：`Podwale 83`、`Old Town Market Square`、`Royal Castle` 等
- **天气模块**：`WeatherSection.tsx` 为纯 Server Component，服务端 fetch Open-Meteo（坐标 52.2506035/21.01008，`current` 实时 + `daily` 5 日预报），`next: { revalidate: 1800 }` ISR 每 30 分钟刷新；WMO 天气代码按分组渲染内联 SVG 图标，5 语描述映射在 `messages.*.weather.codes`；API 失败时渲染兜底卡片（不阻塞页面）

## 图片说明（重要）

`public/gallery/` 当前为 **14 张 SVG 占位图**（`warsaw-barbican-1..14.svg`，由 `scripts/gen-placeholders.mjs` 生成）。本机直连 Wikimedia/Unsplash 受限，且下载真实照片耗时较长被跳过。

**上线前**请运行 `scripts/download-gallery.ps1` 下载真实照片（loremflickr → live.staticflickr，按 `warsawbarbican`/`warsawoldtown` 标签），或自行提供华沙瓮城真实照片，替换占位图并**保持同名**；替换后删除 `scripts/gen-placeholders.mjs` 生成的 `.svg`。若下载为 `.jpg`，请同步将 5 份 `src/messages/*.json` 中 `gallery.items[].src` 与 `src/config.ts` 的 `heroImage` 改回 `.jpg`。

## 命令

```bash
npm install
npm run check:i18n   # 5 语 key/数组对齐校验（123 keys PASS）
npm run build        # next build
npm run dev          # 本地预览
```

## 待办

- [ ] 替换图库为真实照片（见上）
- [ ] zh/ru/de 文案母语者终校（尤其 faq/stories/walkingTour 新段落）
- [ ] 上线时确认域名/SSL/analytics 配置
- [ ] 官方邮编 00-271 与 Google 系 00-257 的选择确认
