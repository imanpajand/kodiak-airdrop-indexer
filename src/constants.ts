import AddressManager from "@kodiak-finance/address-manager";

const chainId = 80084;
export const addresses = AddressManager.network(chainId);
export const BGT_ADDRESS =
    "0xbDa130737BDd9618301681329bF2e46A016ff9Ad".toLowerCase();
export const VALIDATOR_ADDRESS =
    "0x0ecbe62654622e14ae882b8c8c65c3f3f54eccf9".toLowerCase();

export const KDK_HOLD_DIVIDER = 1000n;
export const SWAP_VOLUME_DIVIDER = 100n;
export const LIQUIDITY_DIVIDER = 10n;
export const DELEGATE_DIVIDER = 10n;

export const TARGET_BLOCK_NUMBER = 5290000;
