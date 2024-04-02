import { HypersyncClient } from "@envio-dev/hypersync-client";
import fs from "node:fs";

// Convert address to topic for filtering. Padds the address with zeroes.
function addressToTopic(address: string): string {
  return "0x000000000000000000000000" + address.slice(2, address.length);
}

async function main() {
  // Create hypersync client using the mainnet hypersync endpoint
  const client = HypersyncClient.new({
    url: "https://eth.hypersync.xyz"
  });

  let query = client.presetQueryBlocksAndTransactions(17_000_000, 17_000_050);

  console.log("Running the query...");

  // Run the query once, the query is automatically paginated so it will return when it reaches some limit (time, response size etc.)
  //  there is a nextBlock field on the response object so we can set the fromBlock of our query to this value and continue our query until
  // res.nextBlock is equal to res.archiveHeight or query.toBlock in case we specified an end block.
  const res = await client.sendReq(query);

  console.log(`Query returned ${res.data.blocks.length} blocks and ${res.data.transactions.length}`)
}

main();
