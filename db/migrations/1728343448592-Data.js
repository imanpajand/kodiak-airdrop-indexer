module.exports = class Data1728343448592 {
    name = 'Data1728343448592'

    async up(db) {
        await db.query(`CREATE TABLE "usdc_transfer" ("id" character varying NOT NULL, "block" integer NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "value" numeric NOT NULL, "txn_hash" text NOT NULL, CONSTRAINT "PK_b0b9b4bd33005512b0ec225672e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_9898eeb569b5efa1237c152d3e" ON "usdc_transfer" ("from") `)
        await db.query(`CREATE INDEX "IDX_2279faac5f3516882e78c92cf0" ON "usdc_transfer" ("to") `)
        await db.query(`CREATE INDEX "IDX_ee2d1922ac2009ee22c0ad5c12" ON "usdc_transfer" ("txn_hash") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "points" numeric NOT NULL, "percentage" numeric NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "bundle" ("id" character varying NOT NULL, "total_points" numeric NOT NULL, CONSTRAINT "PK_637e3f87e837d6532109c198dea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "v3_pool" ("id" character varying NOT NULL, "token0" text NOT NULL, "token1" text NOT NULL, CONSTRAINT "PK_691cdc021e19be68e3b4a3e9fdf" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "v2_pair" ("id" character varying NOT NULL, "token0" text NOT NULL, "token1" text NOT NULL, CONSTRAINT "PK_b45819be06411c1c48cb85532b5" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "usdc_transfer"`)
        await db.query(`DROP INDEX "public"."IDX_9898eeb569b5efa1237c152d3e"`)
        await db.query(`DROP INDEX "public"."IDX_2279faac5f3516882e78c92cf0"`)
        await db.query(`DROP INDEX "public"."IDX_ee2d1922ac2009ee22c0ad5c12"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP TABLE "bundle"`)
        await db.query(`DROP TABLE "v3_pool"`)
        await db.query(`DROP TABLE "v2_pair"`)
    }
}
