const fs = require('fs').promises; // fileSystem

/*
  1) callabacks  
  2) promises
  3) async and await
*/
const filePath = 'myFile.txt';
const content = 'This is the content that will be written to the file.';
const additionalData = 'abcdef'

// fs.writeFile(filePath, content, (err) => {
//     if (err) {
//         console.log('Error writing file:', err);
//     }
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             console.log('Error writing file:', err);
//         }else {
//             fs.appendFile(filePath, additionalData, (err) => {
//                 if(err) {
//                     console.log('Error writing file:', err);
//                 } else {
//                     fs.unlink(filePath, (err) => {
//                         if(err) {
//                              console.log('Error deleting file:', err);
//                         }
//                     })
//                 }
//             })
//         }
//     })
// })


// function writeFileSystem() {
//     return new Promise((resolve, reject) => {
//         const writeFile = fs.writeFile(filePath, content);
//         resolve(writeFile)
//     })
// }

// function readFileSystem() {
//     return new Promise((resolve, reject) => {
//         const readFile = fs.readFile(filePath, 'utf8');
//         resolve(readFile)
//     })
// }

// writeFileSystem()
// .then(res => 
//   readFileSystem()
//   .then(res => )
//   .catch(err => console.log(err)) 
// )
// .catch(err => console.log(err));


// async function fileHandlingSystem() {
//     const writeFile = await fs.writeFile(filePath, content);
//     const readFile = await fs.readFile(filePath, 'utf8');
//     console.log(readFile);
//     const appendFile = await fs.appendFile(filePath, additionalData);
//     const deleteFile = await fs.unlink(filePath);
// }