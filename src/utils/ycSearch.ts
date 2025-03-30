import * as fs from 'fs';
import * as path from 'path';

interface YcEssentialData {
    name: string;
    long_description: string;
    website: string;
    industry: string;
    stage: string;
}

const jsonFilePath = path.join(__dirname, '..', '..', 'yc_essential_data.json');
const outputFilePath = path.join(__dirname, '..', '..', 'output.json');

try {
    const data = fs.readFileSync(jsonFilePath, 'utf-8');
    const jsonData: any[] = JSON.parse(data);

    const result: YcEssentialData[] = jsonData.map(item => ({
        name: item.name,
        long_description: item.long_description,
        website: item.website,
        industry: item.industry,
        stage: item.stage,
    }));

    fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`Data saved to ${outputFilePath}`);
} catch (error) {
    console.error('Error reading or parsing JSON file:', error);
}
