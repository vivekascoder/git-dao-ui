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
      {
        text: "📜 Proposals",
        collapsible: true,
        items: [
          {
            text: "📚 Proposals",
            link: "/Proposal/",
          },
          {
            text: "⛓ Queue",
            link: "/Proposal/Queue.md",
          },
          {
            text: "🗳 Execute",
            link: "/Proposal/Execute.md",
          },
        ],
      },
      {
        text: "🔭 Future",
        collapsible: true,
        items: [
          {
            text: "🪐 Future Plans",
            link: "/Future/",
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
