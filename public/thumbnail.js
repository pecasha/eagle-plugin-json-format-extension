const fs = require("fs");
const path = require("path");

module.exports = async ({ src, dest, item, plugin }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            iframe.src = `${path.join(plugin.path, "index.html")}?thumbnail=1&theme=light&path=${src}`;
            iframe.onload = () => {
                iframe.contentWindow.i18next = {
                    t: () => ""
                }
            }
            await new Promise(rsv => {
                window.onThumbnail = async data => {
                    if(typeof data === "string") {
                        item.width = 500;
                        item.height = 500;
                        await fs.promises.writeFile(dest, data, "base64");
                    } else {
                        await fs.promises.writeFile(dest, Buffer.from(await data.arrayBuffer()));
                    }
                    rsv();
                }
            });
            resolve(item);
        } catch (err) {
            reject(err);
        }
    });
}
