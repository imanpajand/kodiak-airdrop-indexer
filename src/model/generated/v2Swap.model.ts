import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class V2Swap {
    constructor(props?: Partial<V2Swap>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    block!: number

    @IntColumn_({nullable: false})
    timestamp!: number

    @StringColumn_({nullable: false})
    pair!: string

    @StringColumn_({nullable: false})
    sender!: string

    @StringColumn_({nullable: false})
    to!: string

    @BigIntColumn_({nullable: false})
    amount0In!: bigint

    @BigIntColumn_({nullable: false})
    amount1In!: bigint

    @BigIntColumn_({nullable: false})
    amount0Out!: bigint

    @BigIntColumn_({nullable: false})
    amount1Out!: bigint

    @StringColumn_({nullable: false})
    txnHash!: string

    @StringColumn_({nullable: false})
    origin!: string
}
