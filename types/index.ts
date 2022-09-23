// Global location for storing types.
export type RepoType = {
  id: number;
  nodeId: string;
  fullName: string;
  isPrivate: boolean;
};

export type TParsedDAO = {
  dao: string;
  daoToken: string;
  daoTimelock: string;
  gitDao: string;
  gitUrl: string;
  gitId: string;
  creator: string;
};
export type TDAO = {
  dinfo: [string, string, string, boolean];
  gitDaoCreator: [string, string];
  daoTimelock: string;
  gitUrl: string;
  gitId: string;
};
export interface DAOPageProps {
  daos: {
    total: number;
    page: number;
    page_size: number;
    result: {
      transaction_hash: string;
      address: string;
      block_timestamp: string;
      block_number: string;
      block_hash: string;
      data: TDAO;
    }[];
  };
}

export interface IProposalResult {
  transaction_hash: string;
  address: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  data: {
    proposalId: string;
    proposer: string;
    targets: [string];
    values: [string];
    signatures: [string];
    calldatas: [string];
    startBlock: string;
    endBlock: string;
    description: string;
  };
}

export interface IProposal {
  proposals: {
    total: number;
    page: number;
    page_size: number;
    result: IProposalResult[];
  };
}
export interface IListItem {
  title: string;
  address: string;
  children?: React.ReactNode;
  onClick: () => void;
}

export type UserInfo = {
  id: number;
  username: string;
  avatar: string;
  name: string;
};

export interface IInputControl {
  name: string;
  label: string;
}

export interface ISliderWithTT {
  sliderValue: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

export interface ICreateDAOForm {
  repo: RepoType | null;
}
export interface ICreateDAOFormik {
  daoTokenName: string;
  daoTokenSymbol: string;
  tokenSupply: number;
  minDelay: number;
  quoromPercentage: number;
  votingPeriod: number;
  votingDelay: number;
  adminPercent: number;
}
export interface ISelectedRepoBadge {
  repo: RepoType | null;
}

export interface IRepoItem {
  repo: RepoType;
  onClick: (repo: RepoType) => void;
}

export type RawRepo = {
  id: number;
  node_id: string;
  full_name: string;
  private: boolean;
};

export interface IBuyTokenFormikInitialValue {
  to: string;
  tokenAmount: number;
  price: number;
  erc20: string;
}
