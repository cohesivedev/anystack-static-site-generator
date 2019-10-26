if (!process.env.URLS) {
    console.error('No URLS variable was given for mirroring!');
    process.exit(1);
}

const faviconURL = process.env.FAVICON_URL;

const {copyFileSync, createWriteStream} = require('fs');
const request                           = require('request');
const scrape                            = require('website-scraper');
const rmrf                              = require('rimraf');

// URLs should be delimited with `%%%`
// e.g. "https://cohesivedev.herokuapp.com%%%https://cohesivedev.herokuapp.com/availability"

const URLS            = process.env.URLS.split('%%%');
const ORIGIN          = URLS[0];
const ORIGIN_HOSTNAME = ORIGIN.replace(/^http[s]*:\/\//, '');

const STARTS_WITH_ORIGIN   = new RegExp('^' + ORIGIN);
const STARTS_WITH_PROTOCOL = new RegExp('^http|https', 'i');

const hostedDirectory = __dirname + '/public/';

function filterUrlByRelativeLinksAndFromSameOrigin(url) {
    if (STARTS_WITH_PROTOCOL.test(url)) {
        return STARTS_WITH_ORIGIN.test(url);
    } else {
        // Relative links
        return true;
    }
}

// Download favicon if available
if (faviconURL) {
    request(faviconURL).pipe(createWriteStream('favicon.png'));
}

// No caching
rmrf.sync(hostedDirectory);

scrape({
    directory:         hostedDirectory,
    urls:              URLS,
    filenameGenerator: 'bySiteStructure',
    prettifyUrls:      true,
    recursive:         true,
    urlFilter:         filterUrlByRelativeLinksAndFromSameOrigin,
    maxRecursiveDepth: 6
})
    .then(() => {
        if (faviconURL) {
            rmrf.sync(`${hostedDirectory}${ORIGIN_HOSTNAME}/favicon.png`);
            copyFileSync(`${__dirname}/favicon.png`, `${hostedDirectory}${ORIGIN_HOSTNAME}/favicon.png`);
        }
        console.log('Mirroring complete.');
    });
