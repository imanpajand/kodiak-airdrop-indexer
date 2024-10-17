import * as fs from "fs";
import csv from "csv-parser";

interface UserPoints {
    user_: string;
    points: number;
}

const loadCSV = async (filePath: string): Promise<UserPoints[]> => {
    return new Promise((resolve, reject) => {
        const results: UserPoints[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) =>
                results.push({ user_: data.user_, points: Number(data.points) })
            )
            .on("end", () => resolve(results))
            .on("error", (error) => reject(error));
    });
};

const writeCSV = (filePath: string, data: UserPoints[]) => {
    const header = "user_,percentage\n";
    const rows = data.map((row) => `${row.user_},${row.points}`).join("\n");
    fs.writeFileSync(filePath, header + rows);
};

const processCSV = async (inputFile: string, outputFile: string) => {
    const data = await loadCSV(inputFile);

    const totalSupply = data.reduce(
        (acc, item) => acc + item.points * item.points,
        0
    );

    const groups: Record<number, number> = {};

    data.forEach((item) => {
        groups[item.points] = groups[item.points] + 1 || 1;
    });

    const updatedData = data.map((item) => ({
        user_: item.user_,
        points: ((item.points * item.points) / totalSupply) * 100,
    }));

    const sum = updatedData.reduce((acc, item) => acc + item.points, 0);
    console.log("Total supply:", totalSupply);
    console.log("Total percentage:", sum);
    const groupsKeys = Object.keys(groups);
    groupsKeys.forEach((key) => {
        console.log(` * With ${key} points: ${groups[key as any]}`);
    });

    writeCSV(outputFile, updatedData);
};

processCSV("raw_output.csv", "output.csv")
    .then(() => console.log("CSV processing complete"))
    .catch((err) => console.error("Error processing CSV:", err));
