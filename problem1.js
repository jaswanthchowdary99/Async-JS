const fs = require('fs');
const path = require('path');
const absolutePath = '../asynchronousDrill1';

function createFile(absolutePath, randomNumber, callback) {
  let filesCreated = 0;

  for (let index = 0; index <= randomNumber; index++) {
    const file = `file${index}.json`;
    const filePath = path.join(absolutePath, file);

    fs.writeFile(filePath, file, function (err) {
      if (err) {
        console.log(`Operation unsuccessful: ${file} not created`);
      } else {
        console.log(`${file} successfully created`);
        filesCreated++;

        if (filesCreated === randomNumber + 1) {
          callback(filePath);
        }
      }
    });
  }
}

function deleteFile(absolutePath, randomNumber, callback) {
  let filesDeleted = 0;

  for (let index1 = 0; index1 <= randomNumber; index1++) {
    const file2 = `file${index1}.json`;
    const filePath2 = path.join(absolutePath, file2);

    fs.unlink(filePath2, function (err) {
      if (err) {
        console.log(`Operation unsuccessful: ${file2} not deleted`);
      } else {
        console.log(`${file2} successfully deleted`);
        filesDeleted++;

        if (filesDeleted === randomNumber + 1) {
          callback(filePath2);
        }
      }
    });
  }
}

function problem1(absolutePath, randomNumber) {
    createFile(absolutePath, randomNumber, function (data1, filePath1) {
        if (data1) {
            deleteFile(absolutePath, randomNumber, function (data2, filePath2) {
                if (data2) {
                    console.log('All file operations completed!');
                } else {
                    console.log('Error deleting file.');
                }
            });
        } else {
            console.log('Error creating file.');
        }
    });
}

module.exports = problem1;

