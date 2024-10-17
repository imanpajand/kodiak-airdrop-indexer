module.exports = class Data1728492346789 {
    name = 'Data1728492346789'

    async up(db) {
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "timestamp" integer, "email" text, "discord" text, "features" text, "experience" text, "bugs" text, "telegram" text, "association" text, "rate" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "bundle" ("id" character varying NOT NULL, CONSTRAINT "PK_637e3f87e837d6532109c198dea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "block" integer NOT NULL, "timestamp" integer NOT NULL, "token" text NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "value" numeric NOT NULL, "txn_hash" text NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "v3_pool" ("id" character varying NOT NULL, "token0" text NOT NULL, "token1" text NOT NULL, "fee_tier" integer NOT NULL, "block" integer NOT NULL, "timestamp" integer NOT NULL, "txn_hash" text NOT NULL, CONSTRAINT "PK_691cdc021e19be68e3b4a3e9fdf" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "v2_pair" ("id" character varying NOT NULL, "token0" text NOT NULL, "token1" text NOT NULL, "block" integer NOT NULL, "timestamp" integer NOT NULL, "txn_hash" text NOT NULL, CONSTRAINT "PK_b45819be06411c1c48cb85532b5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "v2_swap" ("id" character varying NOT NULL, "block" integer NOT NULL, "timestamp" integer NOT NULL, "pair" text NOT NULL, "sender" text NOT NULL, "to" text NOT NULL, "amount0_in" numeric NOT NULL, "amount1_in" numeric NOT NULL, "amount0_out" numeric NOT NULL, "amount1_out" numeric NOT NULL, "txn_hash" text NOT NULL, CONSTRAINT "PK_d79de6af47a3630bbb83fdb6bce" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "v3_swap" ("id" character varying NOT NULL, "block" integer NOT NULL, "timestamp" integer NOT NULL, "pair" text NOT NULL, "sender" text NOT NULL, "to" text NOT NULL, "amount0_in" numeric NOT NULL, "amount1_in" numeric NOT NULL, "amount0_out" numeric NOT NULL, "amount1_out" numeric NOT NULL, "txn_hash" text NOT NULL, CONSTRAINT "PK_823172cd46e71d9dfd290a57a80" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "bgt_activate" ("id" character varying NOT NULL, "sender" text NOT NULL, "amount" numeric NOT NULL, "txn_hash" text NOT NULL, "block" integer NOT NULL, "timestamp" integer NOT NULL, CONSTRAINT "PK_317df045ae88d624b0d622fa65b" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "bgt_remove" ("id" character varying NOT NULL, "sender" text NOT NULL, "amount" numeric NOT NULL, "txn_hash" text NOT NULL, "block" integer NOT NULL, "timestamp" integer NOT NULL, CONSTRAINT "PK_625c12760f9a8bee73c7555a2a5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "price" numeric NOT NULL, "decimals" integer NOT NULL, "whitelist" boolean, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP TABLE "bundle"`)
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP TABLE "v3_pool"`)
        await db.query(`DROP TABLE "v2_pair"`)
        await db.query(`DROP TABLE "v2_swap"`)
        await db.query(`DROP TABLE "v3_swap"`)
        await db.query(`DROP TABLE "bgt_activate"`)
        await db.query(`DROP TABLE "bgt_remove"`)
        await db.query(`DROP TABLE "token"`)
    }
}
