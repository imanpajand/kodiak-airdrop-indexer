import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class V3Pool {
    constructor(props?: Partial<V3Pool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    token0!: string

    @StringColumn_({nullable: false})
    token1!: string

    @IntColumn_({nullable: false})
    feeTier!: number

    @IntColumn_({nullable: false})
    block!: number

    @IntColumn_({nullable: false})
    timestamp!: number

    @StringColumn_({nullable: false})
    txnHash!: string

    @StringColumn_({nullable: false})
    origin!: string
}
