module.exports = async ({ src, dest, item }) => {
    return new Promise(async (resolve, reject) => {
        try {
            item.width = 0;
            item.height = 0;
            resolve(item);
        } catch (err) {
            reject(err);
        }
    });
}
