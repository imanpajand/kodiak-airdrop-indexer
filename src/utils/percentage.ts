import { BigDecimal } from "@subsquid/big-decimal";

export function percentage(amount: bigint, totalSupply: bigint): BigDecimal {
    if (totalSupply === 0n) {
        throw new Error("Total supply cannot be zero.");
    }

    const amountDecimal = BigDecimal(amount.toString());
    const totalSupplyDecimal = BigDecimal(totalSupply.toString());

    const percentage = amountDecimal.div(totalSupplyDecimal);

    return percentage;
}
