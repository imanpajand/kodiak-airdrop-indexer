import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class BGTActivate {
    constructor(props?: Partial<BGTActivate>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    sender!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @StringColumn_({nullable: false})
    txnHash!: string

    @IntColumn_({nullable: false})
    block!: number

    @IntColumn_({nullable: false})
    timestamp!: number

    @StringColumn_({nullable: false})
    origin!: string
}
