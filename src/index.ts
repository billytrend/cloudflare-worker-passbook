import { PKPass } from "passkit-generator";
import { pass } from './assets/pass';
import wwdrpem from './assets/wwdr.pem'
import icon from './assets/icon.png'
import { v4 as uuidv4 } from 'uuid';


const wwdr = wwdrpem;
const signerCert = SIGNER_CERT;
const signerKey = SIGNER_KEY;
const signerKeyPassphrase = SIGNER_KEY_PASSPHRASE;

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request) {
  try {
    const passObj = new PKPass({
      "pass.json": Buffer.from(JSON.stringify(pass)),
      "icon.png": Buffer.from(icon),
      "thumbnail": Buffer.from(icon),
    },
      {
        wwdr,
        signerCert,
        signerKey,
        signerKeyPassphrase,
      }, {
      serialNumber: uuidv4()
    });


    passObj.setBarcodes({ "format": "PKBarcodeFormatCode128", "message": "Hello world", "messageEncoding": "iso-8859-1", altText: "Hello world" });

    return new Response(passObj.getAsBuffer(), { headers: { 'Content-Type': 'application/vnd.apple.pkpass' } })
  } catch (err) {
    throw (err);
  }
}
