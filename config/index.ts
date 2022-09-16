// OAuth redirect url
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://gitdao.app/api/authenticate"
    : "http://localhost:3000/api/authenticate";

const CLIENT_ID =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_CLIENT_ID
    : process.env.NEXT_PUBLIC_CLIENT_ID;

const CLIENT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_CLIENT_SECRET
    : process.env.CLIENT_SECRET;

const INFO = {
  CHAIN_ID: {
    POLYGON_TESTNET: "0x13881",
  },
  SCAN_URL: "https://mumbai.polygonscan.com/address/",
  DOCS_URL:
    process.env.NODE_ENV === "production"
      ? "https://docs.gitdao.app"
      : "http://localhost:5173",

  GITHUB_AUTH_URL: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
  ACCESS_TOKEN_URL: "https://github.com/login/oauth/access_token",

  CONTRACTS: {
    DAO_FACTORY: "0x33ddc9cD01Be9f68830da11D38E202eA0e1A467f",
  },
  INTERFACES: {
    DAO_FACTORY: require("../public/contracts/DAOFactory.sol/DAOFactory.json"),
    DAO_TOKEN: require("../public/contracts/DAOToken.sol/DAOToken.json"),
    GIT_DAO: require("../public/contracts/GitDAO.sol/GitDAO.json"),
    DAO: require("../public/contracts/DAO.sol/DAO.json"),

    // Events to fetch.
    EVENTS: {
      DAO_CREATED: {
        ID: "0x3f3be9496960aa004c2a949565d7deb94bd048ad5f72b1b8a76c6bb0196cf480",
      },
      PROPOSAL_CREATED: {
        ID: "0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0",
      },
    },
  },
  DEFAULT_VALUES: {
    SUPPLY: 10000000,
    QUORAM_PERCENTAGE: 4,
    VOTING_PERIOD: 20,
    VOTING_DELAY: 20,
    MIN_DELAY: 20,
    MAX_ADMIN_PERCENT: 25,
    ADMIN_PERCENT: 1,
  },
};
const CONFIG = { ...INFO, CLIENT_ID, REDIRECT_URI, CLIENT_SECRET };

export default CONFIG;
