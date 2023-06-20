// write a nodejs server that will expose the following methods:
// 
// a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
//
// a method call DaysBetweenDates:
// Calculate days between two dates
// receive by query string 2 parameters date1 and date 2 , and calculate the days that are between those two dates.
// example: http://localhost:3000/DaysBetweenDates?date1=2018-01-01&date2=2018-01-31
// if the dates are not passed, return "dates not passed"
// if the dates are passed, return the number of days between those two dates
// 
// a method call Validatephonenumber:
// Receive by querystring a parameter called phoneNumber validate phoneNumber with Spanish format, for example +34666777888 (it always starts with +34 and has 11 digits)
// if phoneNumber is valid return "valid"
// if phoneNumber is not valid return "invalid"
//
// a method call ValidateSpanishDNI:
// Receive by querystring a parameter called dni calculate DNI letter
// if DNI is valid return "valid"
// if DNI is not valid return "invalid"
//
// a method call ReturnColorCode:
// Receive by querystring a parameter called color
// read colors.json file and return the rgba field
// get color var from querystring
// iterate for each color in colors.json to find the color
// return the code.hex field
//
// a method call TellMeAJoke:
// Make a call to the joke api and return a random joke using axios
//
// a method call MoviesByDirector:
// (this will require to browse to https://www.omdbapi.com/apikey.aspx and request a FREE API Key)
// Receive by querystring a parameter called director
// Make a call to the movie api and return a list of movies of that director using axios
// Return the full list of movies
//
// a method call ParseUrl:
// Retrieves a parameter from querystring called someurl
// Parse the url and return the protocol, host, port, path, querystring and hash
// Return the parsed host
//
// a method call ListFiles:
// Get the current directory
// Get the list of files in the current directory
// Return the list of files
//
// a method call GetFullTextFile:
// Read sample.txt and return lines that contains the word "Fusce"
// (be careful with this implementation, since this normally reads the full content of the file before analizing it, so memory usage is high and may fail when files are too big)
//
// a method call GetLineByLinefromtTextFile:
// Read sample.txt line by line
// Create a promise to read the file line by line, and return a list of lines that contains the word "Fusce"
// Return the list of lines
//
// a method call CalculateMemoryConsumption:
// Return the memory consumption of the process in GB, rounded to 2 decimals
//
// a method call MakeZipFile:
// Using zlib create a zip file called sample.gz that contains sample.txt
//
// a method call RandomEuropeanCountry:
// Make an array of european countries and its iso codes
// Return a random country from the array
// Return the country and its iso code
//
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"
//

const http = require('http');
const url = require('url');
const querystring = require('querystring');

function createServer(req, res) {
    const urlParts = url.parse(req.url);
    const query = querystring.parse(urlParts.query);
    const path = urlParts.pathname.toLowerCase();

    if (path === '/get') {
        if (query.key) {
            res.end('hello ' + query.key);
        } else {
            res.end('key not passed');
        }
    } else if (path === '/daysbetweendates') {
        if (query.date1 && query.date2) {
            const date1 = new Date(query.date1);
            const date2 = new Date(query.date2);
            const days = Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
            res.end(days.toString());
        } else {
            res.end('dates not passed');
        }
    } else if (path === '/validatephonenumber') {
        if (query.phonenumber) {
            regex = /^\+34\d{9}$/;
            const valid = regex.test(query.phonenumber);
            res.end(valid ? 'valid' : 'invalid');
        } else {
            res.end('phonenumber not passed');
        }
    } else if (path === '/validatespanishdni') {
        if (query.dni) {
            const dni = query.dni.toUpperCase();
            const valid = dni.length === 9 && 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(dni.substring(0, 8) % 23) === dni.charAt(8);
            res.end(valid ? 'valid' : 'invalid');
        } else {
            res.end('dni not passed');
        }
    } else if (path === '/returncolorcode') {
        if (query.color) {
            const color = query.color.toLowerCase();
            const colors = require('./colors.json');
            const result = colors.find(c => c.color === color);
            res.end(result ? result.code.hex : 'not found');
        } else {
            res.end('color not passed');
        }
    } else if (path === '/tellmeajoke') {
        const axios = require('axios');
        axios.get('https://api.chucknorris.io/jokes/random')
            .then(response => {
                res.end(response.data.value);
            })
            .catch(error => {
                res.end('error');
            });
    } else if (path === '/moviesbydirector') {
        if (query.director) {
            const axios = require('axios');
            axios.get('http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=' + query.director)
                .then(response => {
                    res.end(response.data.Search.map(m => m.Title).join(', '));
                })
                .catch(error => {
                    res.end('error');
                });
        } else {
            res.end('director not passed');
        }
    } else if (path === '/parseurl') {
        if (query.someurl) {
            const parsedUrl = url.parse(query.someurl);
            res.end(parsedUrl.host);
        } else {
            res.end('url not passed');
        }
    } else if (path === '/listfiles') {
        const fs = require('fs');
        const files = fs.readdirSync('.');
        res.end(files.join(', '));
    } else if (path === '/getfulltextfile') {
        const fs = require('fs');
        const lines = fs.readFileSync('sample.txt', 'utf8').split('\n');
        const result = lines.filter(l => l.indexOf('Fusce') >= 0).join('\n');
        res.end(result);
    } else if (path === '/getlinebylinefromtextfile') {
        const fs = require('fs');
        const readline = require('readline');
        const lines = [];
        const rl = readline.createInterface({
            input: fs.createReadStream('sample.txt'),
            crlfDelay: Infinity
        });
        rl.on('line', (line) => {
            if (line.indexOf('Fusce') >= 0) {
                lines.push(line);
            }
        });
        rl.on('close', () => {
            res.end(lines.join('\n'));
        });
    } else if (path === '/calculatememoryconsumption') {
        const memory = process.memoryUsage().rss / 1024 / 1024 / 1024;
        res.end(memory.toFixed(2));
    } else if (path === '/makezipfile') {
        const fs = require('fs');
        const zlib = require('zlib');
        const gzip = zlib.createGzip();
        const input = fs.createReadStream('sample.txt');
        const output = fs.createWriteStream('sample.gz');
        input.pipe(gzip).pipe(output);
        res.end('done');
    } else if (path === '/randomeuropeancountry') {
        const countries = require('./countries.json');
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        res.end(randomCountry.name + ' - ' + randomCountry.code);
    } else {
        res.end('method not supported');
    }
}




const server = createServer();


server.listen(3000, () => {
    console.log('server is listening on port 3000');
}
);




