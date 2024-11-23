const fs = require('fs');
const path = require('path');

const deleteFiles = (filePaths) => {
    // Flatten the array to handle nested arrays
    const flattenedPaths = filePaths.flat(Infinity); // Flatten to any depth

    flattenedPaths.forEach(filePath => {
        fs.unlink(path.resolve(filePath), (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
            } else {
                console.log(`File deleted: ${filePath}`);
            }
        });
    });
};

module.exports = { deleteFiles };
