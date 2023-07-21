const fs = require('fs').promises;
const os = require('os');
const axios = require('axios');
const cheerio = require('cheerio');

class scanner {
    constructor() {
        this.folderPath = 'C:\\Users\\' + os.userInfo().username + "\\Documents\\My Games\\Rainbow Six - Siege";
    }

    async getGameFolders() {
        try {
            const files = await fs.readdir(this.folderPath, { withFileTypes: true });
            const folder = files.filter((file) => file.isDirectory());
            return folder.map((folderI) => folderI.name);
        } catch (err) {
            console.error('Fehler beim Lesen des Verzeichnisses: ', err);
            throw err;
        }
    }

    async scrape(uuid) {
        const url = 'https://r6.tracker.network/profile/id/' + uuid
        let name = ""

        await axios.get(url).then((response) => {
            const body = response.data;
            const $ = cheerio.load(body);
            name = $('#profile > div.trn-profile-header > div > div.trn-profile-header__main > h1 > span.trn-profile-header__name').text()
        });

        return name.replace(/[\s\n]+/g, '');

    }
}

async function main() {
    const Scanner = new scanner();
    try {
        let accountNames = [];
        const folders = await Scanner.getGameFolders();
        for (const uuid of folders) {

            let name = await Scanner.scrape(uuid)
            accountNames.push(name);

        }
        console.log(accountNames)
    } catch (err) {
        // Handle error
    }
}

main().then();
