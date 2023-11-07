const fs = require("fs");
const AdmZip = require("adm-zip");

const toBuffer = (ab) => {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
};

const getContent = async () => {
  // get environment variables
  const API_KEY = process.env?.CONTENT_API_KEY;
  if (!API_KEY) {
    console.log("CONTENT_API_KEY is not set");
    process.exit(1);
  }

  const API_SERVER = process.env?.CONTENT_API_SERVER;
  if (!API_SERVER) {
    console.log("CONTENT_API_SERVER is not set");
    process.exit(1);
  }

  const WRITE_PATH = process.env?.CONTENT_WRITE_PATH;
  if (!WRITE_PATH) {
    console.log("CONTENT_WRITE_PATH is not set");
    process.exit(1);
  }

  // fetch zip file
  const res = await fetch(`${API_SERVER}/marketing/api/get-all-content`, {
    method: "GET",
    headers: { "X-ContentApiKey": API_KEY }
  });

  const buffer = await res.arrayBuffer();

  // write zip file to disk
  fs.writeFileSync(`${WRITE_PATH}/content.zip`, toBuffer(buffer));

  // unzip file
  var zip = new AdmZip(`${WRITE_PATH}/content.zip`);
  zip.extractAllTo(`${WRITE_PATH}/content`, true);
};

(() => {
  const run = async () => {
    await getContent();
  };

  run();
})();
