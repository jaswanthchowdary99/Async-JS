const fs = require('fs');
const path = require('path');
const absolutePath = '../asynchronousDrill1';

// 1: Read the given file lipsum.txt

function readFile(callback) {
    const filePath = 'lipsum.txt'; 
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`ERRORR READING FILE `);
        } else {
            console.log(`FILE READ SUCCESSFULL \n${filePath}\n\n${data}\n`);
            callback(data, filePath); 
        }
    });
}

// 2: Convert content to uppercase and write to a new file
function writeUppercaseToFile(data, filePath, callback) {
    const uppercaseData = data.toUpperCase();
    const uppercaseFileName = 'uppercase.txt';

    fs.writeFile(uppercaseFileName, uppercaseData, 'utf8', (err) => {
        if (err) {
            console.error(`ERROR WRITING FILE`(err));
        } else {
            console.log(`DATA CHANGED TO UPPERCASE SUCCESSFULLY \n\n${uppercaseData}\n`);
            callback(uppercaseFileName, filePath); 
        }
    });
}

// 3: Read the new file convert to lowercase & split into sentences and write to a new file
function writeLowercaseSentencesToFile(data, filePath, callback) {
    if(data){
        const lowercaseData = data.toLowerCase();
        const sentences = lowercaseData.split(/[.!?]/).filter(Boolean);
        const lowercaseFileName = 'lowercase_sentences.txt';

        fs.writeFile(lowercaseFileName, sentences.join('\n'), 'utf8', (err) => {
            if (err) {
                console.error(`ERROR WRITING FILE`(err));
            } else {
                console.log(`DATA CHANGED TO LOWERCASE SUCCESSFULLY \n\n${lowercaseData}\n`);
                callback(lowercaseFileName, filePath); 
            }
        });
    } 
    }
           

// 4: Read the new files, sort the content and write the new file names to a new file
function sortAndWriteToFile(files, filePath, callback) {
    const sortedData = files.sort().join('\n');
    const sortedFileName = 'filenames.txt';

    fs.writeFile(sortedFileName, sortedData, 'utf8', (err) => {
        if (err) {
            console.error(`ERROR WRITING FILE`(err));
        } else {
            console.log(`DATA SORTED SUCCESSFULLY \n\n${sortedData}\n`);
            callback(sortedFileName, filePath); 
        }
    });
}

// 5: Read filenames.txt and delete all new files mentioned in the list
function deleteFiles(fileList, filePath, callback) {
    fileList.forEach((fileName) => {
        // fileList.pop();
        if (fs.existsSync(fileName)) {
            fs.unlink(fileName, (err) => {
                if (err) {
                    console.error(`ERROR WRITING FILE `);
                } else {
                    console.log(`FILES DELETED SUCCESSFULLY \n${fileName}`);
                    callback(filePath); 
                }
            });
        } else {
            console.log(`FILE NOT FOUND`);
            callback(filePath);
        }
    });
}
function problem2 (absolutePath){
readFile((data, filePath) => {
    if (data) {
        writeUppercaseToFile(data, filePath, (uppercaseFileName, filePath) => {
            writeLowercaseSentencesToFile(data, filePath, (lowercaseFileName, filePath) => {
                sortAndWriteToFile([uppercaseFileName, lowercaseFileName], filePath, () => {
                    deleteFiles([uppercaseFileName, lowercaseFileName], filePath, () => {
                        console.log('PROCESS COMPLETED SUCCESSFULLY.\n');
                    });
                });
            });
        });
    } else {
        console.error(`ERRORR READING `);
    }
});

}
module.exports =  problem2;
