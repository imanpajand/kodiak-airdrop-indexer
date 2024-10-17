import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";

export type CSVData = {
    id: string;
    timestamp: number;
    email: string;
    discord: string;
    features: string;
    experience: string;
    bugs: string;
    telegram: string;
    association: string;
    rate: number | null;
};
export function loadWhitelist(): Promise<CSVData[]> {
    return new Promise<CSVData[]>((reolve) => {
        const set = new Set<CSVData>();
        fs.createReadStream("./source.csv")
            .pipe(csv())
            .on("data", (data) => {
                let rate: CSVData["rate"] = parseInt(
                    data["Rate your experience (1-5)"]
                );
                rate = isNaN(rate) ? null : rate;
                return set.add({
                    timestamp: Math.floor(
                        new Date(data["Timestamp"]).getTime() / 1000
                    ),
                    id: data["Wallet Address"].toLowerCase().trim(),
                    discord: data["Discord handle"],
                    email: data["Email Address"],
                    features: data["Features Used"],
                    experience:
                        data["How was your experience using Kodiak bArtio?"],
                    bugs: data[
                        "Bugs found? Please also submit discord ticket so images can be attached."
                    ],
                    telegram: data["Telegram username"],
                    association: data["Project/Fund/Association?"],
                    rate,
                });
            })
            .on("end", () => {
                reolve([...set]);
            });
    });
}
