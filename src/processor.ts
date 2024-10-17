import { EvmBatchProcessor } from "@subsquid/evm-processor";
import * as erc20Abi from "./abi/erc20";
import * as v2FactoryAbi from "./abi/v2Factory";
import * as v3FactoryAbi from "./abi/v3Factory";
import * as v3PoolAbi from "./abi/v3Pool";
import * as v2PairAbi from "./abi/v2Pair";
import * as bgtAbi from "./abi/bgt";

import {
    addresses,
    BGT_ADDRESS,
    TARGET_BLOCK_NUMBER,
    VALIDATOR_ADDRESS,
} from "./constants";
import { ContractType } from "@kodiak-finance/address-manager";

const VALIDATOR_TOPIC =
    "0x" + VALIDATOR_ADDRESS.replace("x", "0").padStart(64, "0").toLowerCase();

export const processor = new EvmBatchProcessor()
    .setGateway("https://v2.archive.subsquid.io/network/berachain-bartio")
    .setRpcEndpoint("https://bartio.rpc.kodiak.finance")
    .setFinalityConfirmation(75)
    //Get KDK transfer events, starting from block when KDK was deployed
    .addLog({
        range: { from: 164479 },
        address: [addresses.require(ContractType.KDK).toLowerCase()],
        topic0: [erc20Abi.events.Transfer.topic],
        transaction: true,
    })
    //Get xKDK transfer events, starting from block when xKDK was deployed
    .addLog({
        range: { from: 164479 },
        address: [addresses.require(ContractType.XKDK).toLowerCase()],
        topic0: [erc20Abi.events.Transfer.topic],
        transaction: true,
    })
    //Get UniV3 pool created events, starting from block when UniV3 factory was deployed
    .addLog({
        range: { from: 103320 },
        address: [
            addresses.require(ContractType.UniswapV3Factory).toLowerCase(),
        ],
        topic0: [v3FactoryAbi.events.PoolCreated.topic],
        transaction: true,
    })
    //Get UniV2 pool created events, starting from block when UniV2 factory was deployed
    .addLog({
        range: { from: 103291 },
        address: [
            addresses.require(ContractType.UniswapV2Factory).toLowerCase(),
        ],
        topic0: [v2FactoryAbi.events.PairCreated.topic],
        transaction: true,
    })
    //Get ALL Swap, Mint, Burn events, independent of whether they are our UniV2 pools
    .addLog({
        range: { from: 103291 },
        topic0: [v2PairAbi.events.Swap.topic],
        transaction: true,
    })
    //Get ALL Swap, Mint, Burn events, independent of whether they are our UniV3 pools
    .addLog({
        range: { from: 103320 },
        topic0: [v3PoolAbi.events.Swap.topic],
        transaction: true,
    })
    //Get ALL BGT delegation events to our validator
    .addLog({
        address: [BGT_ADDRESS],
        topic0: [
            bgtAbi.events.ActivateBoost.topic,
            bgtAbi.events.DropBoost.topic,
        ],
        topic2: [VALIDATOR_TOPIC],
        transaction: true,
    })

    .setBlockRange({ from: 0, to: TARGET_BLOCK_NUMBER })

    .setFields({
        log: {
            transactionHash: true,
        },
    });
