import { DataHandlerContext, FieldSelection } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export function extractLogsFromBlock<T extends FieldSelection>(
    ctx: DataHandlerContext<Store, T>
) {
    const logs: (typeof ctx)["blocks"][number]["logs"] = [];
    for (let block of ctx.blocks) {
        logs.push(...block.logs);
    }
    return logs;
}
