
## Metholodogy
```bash
Kodiak wants to reward our most loyal users that provided us valuable feedback and interacted with our protocol during 
our testnet phases (on both Artio and bArtio)

We had over 500k users interacting with the protocol.  

In order to meaningfully reward our most engaged users and counteract obvious sybils, here's the eligibility criteria used.

Each user is rated up to 10 points.

Minimum requirement:
- Must have done at least 1 swap on Kodiak DEX
- Measured on-chain, counts even if done via smart contract / aggregator)

Points eligibility:
- Dex power-user | Did at least 10 swaps and $10k volume | 1 point | 20k users
- BGT delegator | Delegated at least 1 BGT to Kodiak validator (and at least 1 swap) | 1 point | 13k users 
- KDK community | Held at least 1 KDK or xKDK on bArtio (and at least 1 swap) | 2 points | 4.5k users
- Feedback provider | Provided meaningful feedback using our feedback form (post sybil filter, and at least 1 swap) |  3 points | 3.4k users
- Artio user | Provided feedback on Artio testnet | 3 points | 0.4k users

The points all stack, so a single user can have up to 10 points.

For some context, here are the user stats pre-filtering:
- At least one swap | 330k users
- All KDK holders with one swap (not filtered for > 1 KDK) | 212k users
- All BGT delegates with one swap (not filtered for > 1 BGT) | 44k users


As of our snapshot, here's the points distribution: 
 - 1 point   | 26888
 - 2 points  | 3980
 - 3 points  | 3183
 - 4 points  | 1090
 - 5 points  | 379
 - 6 points  | 218
 - 7 points  | 185
 - 8 points  | 34
 - 9 points  | 17
 - 10 points | 37

Then to convert points to share of airdrop, we convert on the basis of points^2, to maximally reward the most loyal users  


Our methodology is fully transparent and can be recreated by anyone using the code here!
 
```


## Kodiak airdrop indexer (how to recreate yourself)

Dependencies: Node.js, Docker.

Subsquid docs: https://docs.sqd.dev/

```bash
# 0. Install @subsquid/cli a.k.a. the sqd command globally
npm i -g @subsquid/cli
```

```bash
# 1. Npm install
npm install

# 2. Re-index and run database
npm run again # for mac
npm run again-win # for pc

# If it breaks midway:
node -r dotenv/config lib/main.js

# 3. Use PostGreSQL IDE of choice to query the data
# Database info:
# host: localhost
# port: 5432 (or whatever your docker is using to fwd the port, check Docker)
# user: postgres
# password: postgres
# database: squid 
airdrop_query.sql #for examples
```

