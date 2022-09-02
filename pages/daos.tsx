// /pages/daos.tsx
// import { Box } from "@chakra-ui/react";
// import PageLayout from "../layouts";
// import Moralis from "moralis-v1";
// import Moralis from "moralis";
// import CONFIG from "../config";

/**
 * # Goal ?
 * + List all the DAOs created from the contract.
 */
export default function daos() {
  // return <PageLayout>{/* <Box>Hey!</Box> */}</PageLayout>;
  return <div>Hey</div>;
}

// const ABI = {
//   anonymous: false,
//   inputs: [
//     {
//       indexed: false,
//       internalType: "address",
//       name: "daoToken",
//       type: "address",
//     },
//     {
//       indexed: false,
//       internalType: "address",
//       name: "daoTimelock",
//       type: "address",
//     },
//     {
//       indexed: false,
//       internalType: "address",
//       name: "dao",
//       type: "address",
//     },
//     {
//       indexed: false,
//       internalType: "address",
//       name: "creator",
//       type: "address",
//     },
//   ],
//   name: "DAOCreated",
//   type: "event",
// };
// const options = {
//   chain: "0x13881",
//   address: "0xC8A7Ef44347f13683F624D1ef9736DE3e84D8e41",
//   topic: "0x4db6ee38117e611315b34948f609eed3356f7c79be1c2e94a2a636a7e9599cf7",
//   limit: 3,
//   abi: ABI,
// };

// export async function getServerSideProps() {
//   await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_WEB3_API_KEY });
//   // const data = await Moralis.Web3API.native.getContractEvents(options);

//   const events = await Moralis.EvmApi.native.getContractEvents(options);
//   console.log(":: SERVER_PROPS: ", events.raw);
//   return {
//     props: {},
//   };
// }
