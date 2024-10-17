import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Bundle {
    constructor(props?: Partial<Bundle>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string
}
