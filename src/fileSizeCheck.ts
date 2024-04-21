import * as fs from "fs";
import * as path from "path";

export default function checkFileSize(
  directoryPath: string,
  maxSize: number
): void {
  function walkDir(currentPath: string): void {
    const files = fs.readdirSync(currentPath);
    let allPassed = true;
    files.forEach((file) => {
      const fullPath = path.join(currentPath, file);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        walkDir(fullPath);
      } else if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024;
        if (fileSizeInBytes > maxSize) {
          allPassed = false;
          console.log(
            `File: ${fullPath}, Size: ${fileSizeInKilobytes.toFixed(2)} KB`
          );
        }
      }
    });
    if (allPassed) {
      console.log("All files are smaller than  " + maxSize / 1024 + "KB");
    }
  }

  walkDir(directoryPath);
}
