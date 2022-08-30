const CONFIG = {
  CONTRACTS: {
    DAO_FACTORY: "0xC8A7Ef44347f13683F624D1ef9736DE3e84D8e41",
  },
  INTERFACES: {
    DAO_FACTORY: require("../public/contracts/DAOFactory.sol/DAOFactory.json"),
  },
  DEFAULT_VALUES: {
    SUPPLY: "10000000",
    QUORAM_PERCENTAGE: "4",
    VOTING_PERIOD: "20",
    VOTING_DELAY: "20",
    MIN_DELAY: "20",
  },
};

export default CONFIG;
