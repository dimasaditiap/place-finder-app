const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');

const gcconfig = {
    projectId: 'place-finder-d3f4b',
    keyFilename: 'place-finder.json'
};

const gcs = require('@google-cloud/storage')(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const body = JSON.parse(request.body);
        const tempPath = '/tmp/uploaded-image.jpg';
        fs.writeFileSync(tempPath, body.image, 'base64', err => {
            console.log(err);
            return response.status(500).json({ error: err });
        });
        const bucket = gcs.bucket('place-finder-d3f4b.appspot.com');
        const uuid = UUID();
        bucket.upload(
            tempPath,
            {
                uploadType: 'media',
                destination: `/places/${uuid}.jpg`,
                metadata: {
                    metadata: {
                        contentType: 'image/jpeg',
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            },
            (err, file) => {
                if (!err) {
                    response.status(201).json({
                        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
                            bucket.name
                        }/o/${encodeURIComponent(
                            file.name
                        )}?alt=media&token=${uuid}`
                    });
                } else {
                    console.log(err);
                    response.status(500).json({
                        error: err
                    });
                }
            }
        );
    });
});