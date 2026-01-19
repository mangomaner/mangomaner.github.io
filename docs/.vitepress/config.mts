import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/mangobot/',
  title: "MangoBot",
  description: "基于 Java Spring Boot 的 OneBot 11 机器人框架",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/intro' },
      { text: '开发', link: '/development/plugin' }
    ],

    sidebar: [
      {
        text: '使用指南',
        items: [
          { text: '介绍', link: '/guide/intro' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      },
      {
        text: '开发文档',
        items: [
          { text: '创建插件', link: '/development/plugin' },
          { text: '能力注入', link: '/development/ability' },
          { text: '事件系统', link: '/development/event' },
          { text: '消息构建', link: '/development/message_build' },
          { text: 'API 参考', link: '/development/api' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mangomaner/MangoBot-cli' }
    ]
  }
})
