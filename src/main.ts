import checkFileSize from "./fileSizeCheck";

const directoryPath = process.argv[2];
const maxSize = parseInt(process.argv[3]);

if (!directoryPath || isNaN(maxSize)) {
  console.log("请提供有效的目录路径和文件大小限制");
} else {
  checkFileSize(directoryPath, maxSize);
}
