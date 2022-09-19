export default {
  title: "Git DAO",
  home: "./index.md",
  description: "Instant DAOification of your open source repositories.",

  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/vivekascoder/git-dao-ui" },
      { icon: "twitter", link: "https://twitter.com/0xstatemachine" },
    ],
    sidebar: [
      {
        text: "🦆 Introduction",
        collapsible: true,
        items: [
          {
            text: "📚 Getting Started",
            link: "/Introduction/getting-started",
          },
          {
            text: "🐝 Buzz Words",
            link: "/Introduction/buzzwords.md",
          },
          {
            text: "❓ How it works?",
            link: "/Introduction/how-it-works.md",
          },
        ],
      },
    ],
    footer: {
      message: "Made with ❤️ by @0xStateMachine",
      copyright: "Copyright &copy; Git DAO",
    },
  },
};
