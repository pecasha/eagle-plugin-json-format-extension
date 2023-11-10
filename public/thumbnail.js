const fs = require("fs");
const path = require("path");
const { getImageSize } = require("./lib/core.js");

module.exports = async ({ src, dest, item }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            iframe.src = `${path.join(process.env.APPDATA, "Eagle", "Plugins", "b95aad2b-39e9-4dd5-860b-1c2c8ddf78f7", "index.html")}?thumbnail=1&theme=light&path=${src}`;
            let size = {
                width: 0,
                height: 0
            };
            await new Promise(rsv => {
                window.onThumbnail = async data => {
                    if(typeof data === "string") {
                        await fs.promises.writeFile(dest, data, "base64");
                    } else {
                        const buffer = Buffer.from(await data.arrayBuffer());
                        await fs.promises.writeFile(dest, buffer);
                        size = getImageSize(buffer);
                    }
                    rsv();
                }
            });
            item.width = size.width;
            item.height = size.height;
            resolve(item);
        } catch (err) {
            reject(err);
        }
    });
}
