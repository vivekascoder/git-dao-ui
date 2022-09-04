import Moralis from "moralis";
import CONFIG from "../config";

export const fetchAllEvents = () => {};

/**
 * To fetch all the dao proposals.
 */
export const fetchAllDAOProposals = async (dao: string) => {
  try {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_WEB3_API_KEY,
    });
    const options = {
      chain: CONFIG.CHAIN_ID.POLYGON_TESTNET,
      address: dao,
      topic: CONFIG.INTERFACES.EVENTS.PROPOSAL_CREATED.ID,
      abi: CONFIG.INTERFACES.DAO.abi.find(
        (d: { name: string; type: string }) =>
          d.name === "ProposalCreated" && d.type === "event"
      ),
    };
    const events = await Moralis.EvmApi.native.getContractEvents(options);
    return events.raw;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
