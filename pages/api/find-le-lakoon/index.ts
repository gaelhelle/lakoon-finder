import { SOLANA_RPC_APIS } from "../../../variants";

const axios = require("axios");

export default async function handler(req, res) {
  try {
    const transactions = await getAllTransactions(req.body.params);
    const result = await getTransfers(transactions);

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
}

const getAllTransactions = async (mintAddress) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "getSignaturesForAddress",
      params: [mintAddress],
    };

    const result = await axios.post(SOLANA_RPC_APIS.mainnet.url, data, config);

    return result.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getTransfers = async (transactions) => {
  let transfers = [];

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await Promise.all(
      transactions.map(async (transaction) => {
        const data = {
          jsonrpc: "2.0",
          id: 1,
          method: "getTransaction",
          params: [transaction.signature, { encoding: "jsonParsed" }],
        };

        await axios
          .post(SOLANA_RPC_APIS.mainnet.url, data, config)
          .then((result) => {
            const blockTime = result?.data?.result?.blockTime;
            const slot = result?.data?.result?.slot;

            const transfer =
              result?.data?.result?.transaction?.message?.instructions.filter(
                (instruction) => instruction?.parsed?.type === "create"
              );

            console.log(transfer.length);

            if (transfer.length) {
              const data = {
                blockTime,
                slot,
                wallet: transfer[0]?.parsed?.info?.wallet,
              };

              transfers.push(data);
            }
          });
      })
    );

    transfers.sort((a, b) => a.blockTime - b.blockTime);

    return transfers[0];
  } catch (error) {
    console.log(error);
  }
};

const getFirstOwner = async (mintAddress) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "getSignaturesForAddress",
      params: [
        mintAddress,
        {
          mint: SOLANA_RPC_API.tokenId,
        },
      ],
    };

    const result = await axios.post(SOLANA_RPC_API.url, data, config);

    return result;
  } catch (error) {
    console.log(error);
  }
};
