const FTPClient = require('ftp')
const xml   = require('xml2js')


// config for ftp connection
const ftpConfig = {
    host :  'ftp.bom.gov.au'
} 

// create connection object
const connection = new FTPClient()

// 
connection.on('ready', () => {
    connection.get('/anon/gen/fwo/IDV10750.xml', (err, stream) => {
            if (err) throw err;
            stream.once('close', () => {
                connection.end()
            });
            const buffs = [];
            stream.on('data', (d) => {buffs.push(d)});
            stream.on('end', () => {
                let xmlBuffer = Buffer.concat(buffs);
                const xmlData =xmlBuffer.toString();
                xml.parseString(xmlData, {explicitArray : false}, (err,res) => {
                    regionForecast = res.product.forecast
                    

                    // got stuck trying to sort through the ludicrous xml file... needs to be finished. 
                    const areaForecast = regionForecast.area.find(obj => obj.$.aac === 'VIC_PW008')
                    
                    console.log(areaForecast)
                    return res
                });
            });
            
            
        })
})

const getForecast = () => {
    connection.connect(ftpConfig)
}

module.exports = {
    getForecast : getForecast
}