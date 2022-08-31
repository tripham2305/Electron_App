// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function getData() {
    const NodeClam = require('clamscan');
    const ClamScan = new NodeClam().init({
        removeInfected: false, // If true, removes infected files
        quarantineInfected: false, // False: Don't quarantine, Path: Moves files to this place.
        scanLog: null, // Path to a writeable log file to write scan results into
        debugMode: false, // Whether or not to log info/debug/error msgs to the console
        fileList: null, // path to file containing list of files to scan (for scanFiles method)
        scanRecursively: true, // If true, deep scan folders recursively
        clamscan: {
            path: '/usr/bin/clamscan', // Path to clamscan binary on your server
            db: null, // Path to a custom virus definition database
            scanArchives: true, // If true, scan archives (ex. zip, rar, tar, dmg, iso, etc...)
            active: true // If true, this module will consider using the clamscan binary
        },
        clamdscan: {
            socket: false, // Socket file for connecting via TCP
            host: false, // IP of host to connect to TCP interface
            port: false, // Port of host to use when connecting via TCP interface
            timeout: 10000, // Timeout for scanning files
            localFallback: true, // Use local preferred binary to scan if socket/tcp fails
            path: '/usr/bin/clamdscan', // Path to the clamdscan binary on your server
            configFile: null, // Specify config file if it's in an unusual place
            multiscan: true, // Scan using all available cores! Yay!
            reloadDb: false, // If true, will re-load the DB on every call (slow)
            active: true, // If true, this module will consider using the clamdscan binary
            bypassTest: false, // Check to see if socket is available when applicable
        },
        preference: 'clamdscan' // If clamdscan is found and active, it will be used by default
    });
    ClamScan.then(async clamscan => {
        try {
            // You can re-use the `clamscan` object as many times as you want
            const version = await clamscan.getVersion();
            console.log(`ClamAV Version: ${version}`);
    
            const {isInfected, file, viruses} = await clamscan.isInfected('/some/file.zip');
            if (isInfected) console.log(`${file} is infected with ${viruses}!`);
        } catch (err) {
            // Handle any errors raised by the code in the try block
        }
    }).catch(err => {
        // Handle errors that may have occurred during initialization
    });
}