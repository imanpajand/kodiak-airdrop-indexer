import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class V2Pair {
    constructor(props?: Partial<V2Pair>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    token0!: string

    @StringColumn_({nullable: false})
    token1!: string

    @IntColumn_({nullable: false})
    block!: number

    @IntColumn_({nullable: false})
    timestamp!: number

    @StringColumn_({nullable: false})
    txnHash!: string

    @StringColumn_({nullable: false})
    origin!: string
}
