const brain = require('brain.js');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/GTD');
var Schema = mongoose.Schema
var latLonSchema = new mongoose.Schema({
    lat: {
        type: Number,
    },
    lon: {
        type: Number,
    },
})
mongoose.model('latLon', latLonSchema);
var latLon = mongoose.model('latLon');


let testData = [
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: '18.456792',
        longitude: '-69.951164'
    },
    {
        _id: '5ab53a90fca0ab2720950f3d',
        latitude: '19.432608',
        longitude: '-99.133207'
    },
    {
        _id: '5ab53a90fca0ab2720950f3e',
        latitude: '15.478598',
        longitude: '120.599741'
    },
    {
        _id: '5ab53a90fca0ab2720950f3f',
        latitude: '37.983773',
        longitude: '23.728157'
    },
    {
        _id: '5ab53a90fca0ab2720950f40',
        latitude: '33.580412',
        longitude: '130.396361'
    },
    {
        _id: '5ab53a90fca0ab2720950f41',
        latitude: '37.005105',
        longitude: '-89.176269'
    },
    {
        _id: '5ab53a90fca0ab2720950f42',
        latitude: '-34.891151',
        longitude: '-56.187214'
    },
    {
        _id: '5ab53a90fca0ab2720950f43',
        latitude: '37.805065',
        longitude: '-122.273024'
    },
    {
        _id: '5ab53a90fca0ab2720950f44',
        latitude: '43.076592',
        longitude: '-89.412488'
    },
    {
        _id: '5ab53a90fca0ab2720950f45',
        latitude: '43.07295',
        longitude: '-89.386694'
    },
    {
        _id: '5ab53a90fca0ab2720950f46',
        latitude: '43.4685',
        longitude: '-89.744299'
    },
    {
        _id: '5ab53a90fca0ab2720950f47',
        latitude: '39.74001',
        longitude: '-104.992259'
    },
    {
        _id: '5ab53a90fca0ab2720950f48',
        latitude: '41.89052',
        longitude: '12.494249'
    },
    {
        _id: '5ab53a90fca0ab2720950f49',
        latitude: '42.331685',
        longitude: '-83.047924'
    },
    {
        _id: '5ab53a90fca0ab2720950f4a',
        latitude: '18.399712',
        longitude: '-66.049987'
    },
    {
        _id: '5ab53a90fca0ab2720950f4b',
        latitude: '52.516667',
        longitude: '13.4'
    },
    {
        _id: '5ab53a90fca0ab2720950f4c',
        latitude: null,
        longitude: null
    },
    {
        _id: '5ab53a90fca0ab2720950f4d',
        latitude: '40.610069',
        longitude: '-73.947971'
    },
    {
        _id: '5ab53a90fca0ab2720950f4e',
        latitude: '18.379998',
        longitude: '-65.830948'
    },
    {
        _id: '5ab53a90fca0ab2720950f4f',
        latitude: '47.60356',
        longitude: '-122.329439'
    },
    {
        _id: '5ab53a90fca0ab2720950f50',
        latitude: '40.116748',
        longitude: '-88.23927'
    },
    {
        _id: '5ab53a90fca0ab2720950f51',
        latitude: '-34.891151',
        longitude: '-56.187214'
    },
    {
        _id: '5ab53a90fca0ab2720950f52',
        latitude: '47.610594',
        longitude: '-122.317228'
    },
    {
        _id: '5ab53a90fca0ab2720950f53',
        latitude: '47.655335',
        longitude: '-122.30352'
    },
    {
        _id: '5ab53a90fca0ab2720950f54',
        latitude: '40.728075',
        longitude: '-74.077825'
    },
    {
        _id: '5ab53a90fca0ab2720950f55',
        latitude: '14.624422',
        longitude: '-90.53288'
    },
    {
        _id: '5ab53a90fca0ab2720950f56',
        latitude: '14.677301',
        longitude: '121.044348'
    },
    {
        _id: '5ab53a90fca0ab2720950f57',
        latitude: '10.502961',
        longitude: '-66.917253'
    },
    {
        _id: '5ab53a90fca0ab2720950f58',
        latitude: '42.47031',
        longitude: '-96.413949'
    },
    {
        _id: '5ab53a90fca0ab2720950f59',
        latitude: '33.60651',
        longitude: '-88.650419'
    },
    {
        _id: '5ab53a90fca0ab2720950f5a',
        latitude: '40.78306',
        longitude: '-73.971249'
    },
    {
        _id: '5ab53a90fca0ab2720950f5b',
        latitude: '33.60651',
        longitude: '-88.650419'
    },
    {
        _id: '5ab53a90fca0ab2720950f5c',
        latitude: '40.728224',
        longitude: '-73.794852'
    },
    {
        _id: '5ab53a90fca0ab2720950f5d',
        latitude: '41.241996',
        longitude: '-82.615241'
    },
    {
        _id: '5ab53a90fca0ab2720950f5e',
        latitude: '52.516667',
        longitude: '13.4'
    },
    {
        _id: '5ab53a90fca0ab2720950f5f',
        latitude: '47.60356',
        longitude: '-122.329439'
    },
    {
        _id: '5ab53a90fca0ab2720950f60',
        latitude: '42.479999',
        longitude: '-96.413046'
    },
    {
        _id: '5ab53a90fca0ab2720950f61',
        latitude: '42.46634',
        longitude: '-96.41405'
    },
    {
        _id: '5ab53a90fca0ab2720950f62',
        latitude: '25.720851',
        longitude: '-80.277857'
    },
    {
        _id: '5ab53a90fca0ab2720950f63',
        latitude: '15.675051',
        longitude: '120.331618'
    },
    {
        _id: '5ab53a90fca0ab2720950f64',
        latitude: '39.748783',
        longitude: '-105.022136'
    },
    {
        _id: '5ab53a90fca0ab2720950f65',
        latitude: '45.511795',
        longitude: '-122.675629'
    },
    {
        _id: '5ab53a90fca0ab2720950f66',
        latitude: '37.005105',
        longitude: '-89.176269'
    },
    {
        _id: '5ab53a90fca0ab2720950f67',
        latitude: '40.78306',
        longitude: '-73.971249'
    },
    {
        _id: '5ab53a90fca0ab2720950f68',
        latitude: '40.844782',
        longitude: '-73.864827'
    },
    {
        _id: '5ab53a90fca0ab2720950f69',
        latitude: '40.78306',
        longitude: '-73.971249'
    },
    {
        _id: '5ab53a90fca0ab2720950f6a',
        latitude: '41.084195',
        longitude: '-81.514059'
    },
    {
        _id: '5ab53a90fca0ab2720950f6b',
        latitude: '39.74001',
        longitude: '-104.992259'
    },
    {
        _id: '5ab53a90fca0ab2720950f6c',
        latitude: '47.608758',
        longitude: '-122.329439'
    },
    {
        _id: '5ab53a90fca0ab2720950f6d',
        latitude: '47.60356',
        longitude: '-122.329439'
    },
    {
        _id: '5ab53a90fca0ab2720950f6e',
        latitude: '18.460791',
        longitude: '-66.264884'
    },
    {
        _id: '5ab53a90fca0ab2720950f6f',
        latitude: '18.399712',
        longitude: '-66.049987'
    },
    {
        _id: '5ab53a90fca0ab2720950f70',
        latitude: '18.441963',
        longitude: '-66.026316'
    },
    {
        _id: '5ab53a90fca0ab2720950f71',
        latitude: '42.3505',
        longitude: '-71.105399'
    },
    {
        _id: '5ab53a90fca0ab2720950f72',
        latitude: '42.838355',
        longitude: '-88.743224'
    },
    {
        _id: '5ab53a90fca0ab2720950f73',
        latitude: '40.751212',
        longitude: '-73.903649'
    },
    {
        _id: '5ab53a90fca0ab2720950f74',
        latitude: '40.678178',
        longitude: '-73.944158'
    },
    {
        _id: '5ab53a90fca0ab2720950f75',
        latitude: '40.78306',
        longitude: '-73.971249'
    },
    {
        _id: '5ab53a90fca0ab2720950f76',
        latitude: '39.07859',
        longitude: '-84.179414'
    },
    {
        _id: '5ab53a90fca0ab2720950f77',
        latitude: '48.139126',
        longitude: '11.580186'
    },
    {
        _id: '5ab53a90fca0ab2720950f78',
        latitude: '42.263414',
        longitude: '-83.665281'
    },
    {
        _id: '5ab53a90fca0ab2720950f79',
        latitude: '37.869885',
        longitude: '-122.270539'
    },
    {
        _id: '5ab53a90fca0ab2720950f7a',
        latitude: '48.139126',
        longitude: '11.580186'
    },
    {
        _id: '5ab53a90fca0ab2720950f7b',
        latitude: '37.869885',
        longitude: '-122.270539'
    },
    {
        _id: '5ab53a90fca0ab2720950f7c',
        latitude: '40.78306',
        longitude: '-73.971249'
    },
    {
        _id: '5ab53a90fca0ab2720950f7d',
        latitude: '44.04483',
        longitude: '-123.072606'
    },
    {
        _id: '5ab53a90fca0ab2720950f7e',
        latitude: '37.777125',
        longitude: '-122.419644'
    },
    {
        _id: '5ab53a90fca0ab2720950f7f',
        latitude: '37.869885',
        longitude: '-122.270539'
    },
    {
        _id: '5ab53a90fca0ab2720950f80',
        latitude: '37.869885',
        longitude: '-122.270539'
    },
    {
        _id: '5ab53a90fca0ab2720950f81',
        latitude: '37.775471',
        longitude: '-122.403717'
    },
    {
        _id: '5ab53a90fca0ab2720950f82',
        latitude: '37.805065',
        longitude: '-122.273024'
    },
    {
        _id: '5ab53a90fca0ab2720950f83',
        latitude: '39.334825',
        longitude: '-77.431653'
    },
    {
        _id: '5ab53a90fca0ab2720950f84',
        latitude: '30.493919',
        longitude: '-90.132512'
    },
    {
        _id: '5ab53a90fca0ab2720950f85',
        latitude: '47.655335',
        longitude: '-122.30352'
    },
    {
        _id: '5ab53a90fca0ab2720950f86',
        latitude: '41.504365',
        longitude: '-81.690459'
    },
    {
        _id: '5ab53a90fca0ab2720950f87',
        latitude: '38.10083',
        longitude: '-122.254954'
    },
    {
        _id: '5ab53a90fca0ab2720950f88',
        latitude: '41.763325',
        longitude: '-72.674069'
    },
    {
        _id: '5ab53a90fca0ab2720950f89',
        latitude: '40.807026',
        longitude: '-73.960349'
    },
    {
        _id: '5ab53a90fca0ab2720950f8a',
        latitude: '47.655335',
        longitude: '-122.30352'
    },
    {
        _id: '5ab53a90fca0ab2720950f8b',
        latitude: '50.111445',
        longitude: '8.680615'
    },
    {
        _id: '5ab53a90fca0ab2720950f8c',
        latitude: '47.36865',
        longitude: '8.539182'
    },
    {
        _id: '5ab53a90fca0ab2720950f8d',
        latitude: '40.733572',
        longitude: '-74.002742'
    },
    {
        _id: '5ab53a90fca0ab2720950f8e',
        latitude: '40.678178',
        longitude: '-73.944158'
    },
    {
        _id: '5ab53a90fca0ab2720950f8f',
        latitude: '40.78306',
        longitude: '-73.971249'
    },
    {
        _id: '5ab53a90fca0ab2720950f90',
        latitude: '39.74001',
        longitude: '-104.992259'
    },
    {
        _id: '5ab53a90fca0ab2720950f91',
        latitude: '42.455233',
        longitude: '-76.475847'
    },
    {
        _id: '5ab53a90fca0ab2720950f92',
        latitude: '43.287052',
        longitude: '-89.724361'
    },
    {
        _id: '5ab53a90fca0ab2720950f93',
        latitude: '42.47031',
        longitude: '-96.413949'
    },
    {
        _id: '5ab53a90fca0ab2720950f94',
        latitude: '42.47031',
        longitude: '-96.413949'
    },
    {
        _id: '5ab53a90fca0ab2720950f95',
        latitude: '42.47031',
        longitude: '-96.413949'
    },
    {
        _id: '5ab53a90fca0ab2720950f96',
        latitude: '42.47031',
        longitude: '-96.413949'
    },
    {
        _id: '5ab53a90fca0ab2720950f97',
        latitude: '32.222232',
        longitude: '-110.925752'
    },
    {
        _id: '5ab53a90fca0ab2720950f98',
        latitude: '39.74001',
        longitude: '-104.992259'
    },
    {
        _id: '5ab53a90fca0ab2720950f99',
        latitude: '40.101952',
        longitude: '-88.227161'
    },
    {
        _id: '5ab53a90fca0ab2720950f9a',
        latitude: '40.007581',
        longitude: '-105.265942'
    },
    {
        _id: '5ab53a90fca0ab2720950f9b',
        latitude: '31.532521',
        longitude: '35.100248'
    },
    {
        _id: '5ab53a90fca0ab2720950f9c',
        latitude: '14.596051',
        longitude: '120.978666'
    },
    {
        _id: '5ab53a90fca0ab2720950f9d',
        latitude: '41.89052',
        longitude: '12.494249'
    },
    {
        _id: '5ab53a90fca0ab2720950f9e',
        latitude: '40.007581',
        longitude: '-105.265942'
    },
    {
        _id: '5ab53a90fca0ab2720950f9f',
        latitude: '38.83345',
        longitude: '-104.821814'
    }
]

let europeCoords = [
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 47.85,
        longitude: 4.52
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 39.73,
        longitude: -6.34
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 44.47,
        longitude: 2.61
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 53.65,
        longitude: 12.46
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 50.66,
        longitude: 11.58
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 48.65,
        longitude: 11.66
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 46.22,
        longitude: 11.63
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 41.12,
        longitude: 15.41
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 45.58,
        longitude: 17.61
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 51.03,
        longitude: 15.61
    },
]

let usCoords = [
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 45.74,
        longitude: -69.02
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 41.93,
        longitude: -76.03
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 36.85,
        longitude: -83.78
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 31.91,
        longitude: -89.69
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 40.40,
        longitude: -97.72
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 32.11,
        longitude: -99.09
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 44.96,
        longitude: -106.47
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 35.46,
        longitude: -112.62
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 48.04,
        longitude: -120.11
    },
    {
        _id: '5ab53a90fca0ab2720950f3c',
        latitude: 35.95,
        longitude: -116.95
    },
]

function getRawData() {
    let rawData = [];
    console.log('getting rawData.')
    latLon.find({}, function (err, atks) {
        if (err) {
            console.log("e0rr0r", )
        } else {
            rawData = atks;
            console.log('rawData got.')
        }
    })
    return rawData;
}

function processData(rawData) {
    let data = [];
    for (let i = 0; i < rawData.length; i++) {
        atkEntry = { lat: parseFloat(rawData[i]['latitude']), lon: parseFloat(rawData[i]['longitude']) };
        noAtkEntry = { lat: (Math.random() * 90), lon: (Math.random() * 180) };
        data.push({ input: atkEntry, output: { atk: 1 } });
        data.push({ input: noAtkEntry, output: { atk: 0 } });
    }
    return data;
}

// // old working version of PCD
// function processCountryData(us, eu) {
//     let data = [];
//     for (let i = 0; i < us.length; i++) {
//         usEntry = { lat: parseFloat(us[i]['latitude']), lon: parseFloat(us[i]['longitude']) };
//         euEntry = { lat: parseFloat(eu[i]['latitude']), lon: parseFloat(eu[i]['longitude']) };
//         data.push({ input: usEntry, output: { us: 1 } });
//         data.push({ input: euEntry, output: { us: 0 } });
//     }
//     return data;
// }


function processCountryData(us, eu) {
    let data = [];
    for (let i = 0; i < us.length; i++) {
        usEntry = { lat: parseFloat(us[i]['latitude']), lon: parseFloat(us[i]['longitude']) };
        euEntry = { lat: parseFloat(eu[i]['latitude']), lon: parseFloat(eu[i]['longitude']) };
        data.push({ input: usEntry, output: {us: 1}});
        data.push({ input: euEntry, output: {us: 0}});
    }
    return data;
}


let processedData = processData(testData);

//create new NN
const net = new brain.NeuralNetwork();
//train NN with formatted data
net.train(processedData, {
    // Defaults values --> expected validation
    iterations: 5000,      // the maximum times to iterate the training data --> number greater than 0
    errorThresh: 0.0005,   // the acceptable error percentage from training data --> number between 0 and 1
    log: true,              // true to use console.log, when a function is supplied it is used --> Either true or a function
    logPeriod: 100,          // iterations between logging out --> number greater than 0
    learningRate: 0.3,      // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.1,          // scales with next layer's change value --> number between 0 and 1
    callback: null,         // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 10,     // the number of iterations through the training data between callback calls --> number greater than 0
    timeout: Infinity       // the max number of milliseconds to train for --> number greater than 0
});

// /**
//  * Predict the letter A, even with a pixel off.
//  */
// const result = brain.likely(character(
//     '#######' +
//     '#......' +
//     '#......' +
//     '#......' +
//     '#......' +
//     '#......' +
//     '#######'
// ), net);

// console.log(result); // 'a'
        // latitude: '18.456792',
        // longitude: '-69.951164'
console.log(net.run({ lat: 45.456792, lon: -15.951164 }))
// console.log('Atk Data size: ', rawData.length)
console.log('Data size: ', processedData.length)

// /**
//  * Turn the # into 1s and . into 0s. for whole string
//  * @param string
//  * @returns {Array}
//  */
