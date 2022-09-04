const CONFIG = {
  CONTRACTS: {
    DAO_FACTORY: "0xBCD2F6aC5c04B6b8C1D3700B8Ae98609FB578830",
  },
  INTERFACES: {
    DAO_FACTORY: require("../public/contracts/DAOFactory.sol/DAOFactory.json"),
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

export default CONFIG;
