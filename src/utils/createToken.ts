import { Token } from "../model";
import { EntityManager } from "./entityManager";
import { Prices } from "./prices";
import { BigDecimal } from "@subsquid/big-decimal";

const whitelisted = [
    "0x1740F679325ef3686B2f574e392007A92e4BeD41",
    "0x277aadbd9ea3db8fe9ea40ea6e09f6203724bdae",
    "0xa0525273423537BC76825B4389F3bAeC1968f83F",
    "0x1E94a8ceE3E5bD97e0cD933B8F8537fC3Db4FcE7",
    "0x8F22CD288fa62F5F198ba03fCdb3829DD7C0cbb8",
    "0x355bb949d80331516Fc7F4CF81229021187d67d2",
    "0x6123100b681e04411b12cd111F080Bc4D3c62086",
    "0xdfdaeca74bb2d37204171ce05fe6ba6ae970d844",
    "0x343499E6315f7d3473a12aaf660Ac02b5739C382",
    "0x7629668774f918c00Eb4b03AdF5C4e2E53d45f0b",
    "0x08B918dD18E087893bb9d711d9E0BBaA7a63Ef63",
    "0x802762e604CE08a79DA2BA809281D727A690Fa0d",
    "0xE1F167CDE04d5d0F8d096957b3A23a7005618976",
    "0xf5AFCF50006944d17226978e594D4D25f4f92B40",
    "0xa591eef221369321De76d958dC023936Fb39B26A",
    "0x46efc86f0d7455f135cc9df501673739d513e982",
    "0x3A1A3700f74a63e6C647113325019309FdD02f83",
    "0xd50A06289ff3bB826cdCabEa03D6731DA16CA85a",
    "0x0ae9d176d3156835b501C530Faee28a51a43c9a6",
    "0x7507c1dc16935B82698e4C63f2746A2fCf994dF8",
    "0xbDa130737BDd9618301681329bF2e46A016ff9Ad",
    "0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03",
    "0xd6D83aF58a19Cd14eF3CF6fe848C9A4d21e5727c",
    "0x05D0dD5135E3eF3aDE32a9eF9Cb06e8D37A6795D",
    "0x806Ef538b228844c73E8E692ADCFa8Eb2fCF729c",
    "0x2577D24a26f8FA19c1058a8b0106E2c7303454a4",
    "0xE28AfD8c634946833e89ee3F122C06d7C537E8A8",
    "0x0bF0Eb9aE016A624E2149D4C5F47fD9276285C82",
    "0xD08391c5977ebF1a09bB5915908EF5cd95Edb7E0",
    "0xCA97345aD6A91176429CAF5aa2896732cbF66EBd",
    "0x1807d3462dD7DC32907d5f10f22d8AeE80367316",
    "0x1306D3c36eC7E38dd2c128fBe3097C2C2449af64",
    "0xfc5e3743E9FAC8BB60408797607352E24Db7d65E",
    "0xa0525273423537BC76825B4389F3bAeC1968f83F",
].map((id) => id.toLowerCase());
export async function createToken(
    entities: EntityManager,
    id: string,
    prices: Prices
) {
    let token = entities.get(Token, id, false);

    if (!token) {
        const result = await prices.get([id]);
        const { price, decimals } = result[id];
        token = new Token({
            id,
            price: BigDecimal(price.toString()),
            decimals,
            whitelist: whitelisted.includes(id),
        });
        entities.add(token);
    }
    return token;
}
