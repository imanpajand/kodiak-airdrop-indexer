export function bigintAbs(value: bigint): bigint {
    return value < 0n ? -value : value;
}
