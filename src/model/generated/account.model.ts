import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: true})
    timestamp!: number | undefined | null

    @StringColumn_({nullable: true})
    email!: string | undefined | null

    @StringColumn_({nullable: true})
    discord!: string | undefined | null

    @StringColumn_({nullable: true})
    features!: string | undefined | null

    @StringColumn_({nullable: true})
    experience!: string | undefined | null

    @StringColumn_({nullable: true})
    bugs!: string | undefined | null

    @StringColumn_({nullable: true})
    telegram!: string | undefined | null

    @StringColumn_({nullable: true})
    association!: string | undefined | null

    @IntColumn_({nullable: true})
    rate!: number | undefined | null
}
