const exe = require('@angablue/exe');

function build(name, entryPath, pkgOps, version, legalInfo, ProdName, desc) {

    const build = exe({
        entry: entryPath,
        out: '../dist/' + name + '.exe',
        pkg: pkgOps, // Specify extra pkg arguments
        version: version,
        icon: './assets/icon.ico', // Application icons must be in .ico format
        properties: {
            FileDescription: desc,
            ProductName: ProdName,
            LegalCopyright: legalInfo,
            OriginalFilename: name + '.exe'
        }
    });

    build.then(() => console.log('Build completed!'));

}

build("scanner-network", "../app.js", ["--public", "-C", "Brotli"], "0.0.0.1", "Copyright information following.", "Scanner Network", "Scanner network is a system that tries to find and detect cheat software on a PC to give everyone a safe and fair game in eSport event or similar.")