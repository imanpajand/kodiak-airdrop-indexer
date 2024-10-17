import { TARGET_BLOCK_NUMBER } from "../constants";

const URL = `https://api.goldsky.com/api/public/project_clpx84oel0al201r78jsl0r3i/subgraphs/kodiak-v3-berachain-bartio/latest/gn`;
export class Prices {
    private _addresses: Set<string> = new Set();
    private _cache: Map<string, { price: number; decimals: number }> =
        new Map();

    constructor() {}

    add(...address: string[]) {
        address.forEach((addr) => {
            this._addresses.add(addr);
        });
    }

    async get(addresses: string[]) {
        if (this._addresses.size !== 0) {
            await this.fetch();
        }

        const response: Record<string, { price: number; decimals: number }> =
            {};

        const missing = addresses.filter(
            (address) => !this._cache.has(address)
        );
        if (missing.length > 0) {
            this.add(...missing);
            await this.fetch();
        }

        addresses.forEach((address) => {
            response[address] = this._cache.get(address) ?? {
                price: 0,
                decimals: 18,
            };
        });
        return response;
    }

    async fetch() {
        if (this._addresses.size === 0) {
            return;
        }
        const missing = [...this._addresses].filter(
            (address) => !this._cache.has(address)
        );
        if (missing.length === 0) {
            return;
        }

        const query = `
            {
                tokens(block: {number: ${TARGET_BLOCK_NUMBER}} where: { id_in: ["${[
            ...missing,
        ].join('", "')}"] }) {
                    id
                    derivedETH
                    decimals
                }
                
                bundle(id: "1") {
                    ethPriceUSD
                }
            }
        `;

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();

        const ethPriceUSD = data.data.bundle.ethPriceUSD;
        const tokens = data.data.tokens as {
            id: string;
            derivedETH: string;
            decimals: string;
        }[];

        const prices = tokens.map((token) => {
            return {
                price: parseFloat(token.derivedETH) * parseFloat(ethPriceUSD),
                decimals: parseInt(token.decimals),
                id: token.id,
            };
        });

        prices.forEach((price) => {
            this._cache.set(price.id, {
                price: price.price,
                decimals: price.decimals,
            });
        });

        for (const address of missing) {
            if (!this._cache.has(address)) {
                this._cache.set(address, { price: 0, decimals: 18 });
            }
        }

        this._addresses.clear();
    }
}
