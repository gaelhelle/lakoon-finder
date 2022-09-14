const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";

const findLakoonFirstOwner = async () => {
  const transactions = await getAllTransactions(
    "AJ3LyKbRCS3CJwYNf5vCQ1nXM8ZjZCBqhWA9TzekQ2xn"
  );
};

const getAllTransactions = async (mintAddress) => {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getSignaturesForAddress",
    params: [mintAddress],
  };

  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body,
  };

  try {
    const fetchResponse = await fetch(SOLANA_RPC_URL, settings);
    const data = await fetchResponse.json();

    console.log(data);
    return data;

    // const result = await axios.post(SOLANA_RPC_APIS.mainnet.url, data, config);

    // return result.data.result;
  } catch (error) {
    console.log(error);
  }
};

findLakoonFirstOwner();
