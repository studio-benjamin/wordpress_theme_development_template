import { watch, WatchEventType, existsSync, mkdirSync } from "fs";
import { join, extname, basename, dirname } from "path";
import { spawn } from "child_process";

// Image file extensions to watch
const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".bmp",
  ".tiff",
];

// Watch directory (default)
const WATCH_DIR = process.argv[2] || "./main-theme/assets";

console.log(`Image File Watcher started`);
console.log(`Watch Directory: ${WATCH_DIR}`);
console.log(`Target Extensions: ${IMAGE_EXTENSIONS.join(", ")}`);
console.log("---");

const handleEvent = async (
  eventType: WatchEventType,
  filename: string | null
) => {
  if (!filename) return;

  const fileExt = extname(filename).toLowerCase();

  // Check if it's an image file
  if (!IMAGE_EXTENSIONS.includes(fileExt)) return;

  const fileName = basename(filename);
  const filePath = join(WATCH_DIR, filename);
  const timestamp = new Date().toLocaleTimeString("ja-JP");

  switch (eventType) {
    case "rename":
      console.log(`ADD/DEL [${timestamp}] Image file changed: ${fileName}`);
      console.log(`   Path: ${filePath}`);

      // Wait a bit for file to be fully written, then convert
      setTimeout(async () => {
        try {
          await convertToWebp(filePath);
        } catch (error) {
          console.error(`Conversion failed: ${error}`);
        }
      }, 500);
      break;

    case "change":
      console.log(`MODIFY [${timestamp}] Image file updated: ${fileName}`);
      console.log(`   Path: ${filePath}`);

      // Wait a bit for file to be fully written, then convert
      setTimeout(async () => {
        try {
          await convertToWebp(filePath);
        } catch (error) {
          console.error(`Conversion failed: ${error}`);
        }
      }, 500);
      break;

    default:
      console.log(
        `CHANGE [${timestamp}] Image file event: ${fileName} (${eventType})`
      );
      console.log(`   Path: ${filePath}`);
  }
};

const convertToWebp = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const fileExt = extname(filePath).toLowerCase();

    // Skip if already WebP
    if (fileExt === ".webp") {
      resolve();
      return;
    }

    // Skip non-convertible formats
    if (![".jpg", ".jpeg", ".png", ".bmp", ".tiff"].includes(fileExt)) {
      resolve();
      return;
    }

    const fileName = basename(filePath, fileExt);
    const inputDir = dirname(filePath);
    const outputDir = inputDir;
    const outputPath = filePath.replace(fileExt, ".webp");

    // Create output directory if it doesn't exist
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Check if input file exists
    if (!existsSync(filePath)) {
      console.log(`Source file not found: ${filePath}`);
      resolve();
      return;
    }

    console.log(
      `Converting to WebP: ${basename(filePath)} -> ${basename(outputPath)}`
    );

    // Use cwebp command to convert
    const cwebp = spawn("cwebp", ["-q", "80", filePath, "-o", outputPath]);

    cwebp.stdout.on("data", (data) => {
      console.log(`cwebp: ${data}`);
    });

    cwebp.stderr.on("data", (data) => {
      console.error(`cwebp error: ${data}`);
    });

    cwebp.on("close", (code) => {
      if (code === 0) {
        console.log(`✅ Successfully converted: ${outputPath}`);
        resolve();
      } else {
        console.error(`❌ Conversion failed with code ${code}`);
        reject(new Error(`cwebp exited with code ${code}`));
      }
    });

    cwebp.on("error", (error) => {
      if (error.message.includes("ENOENT")) {
        console.error("❌ cwebp command not found. Please install WebP tools:");
        console.error("   macOS: brew install webp");
        console.error("   Ubuntu: sudo apt-get install webp");
      } else {
        console.error(`❌ cwebp error: ${error.message}`);
      }
      reject(error);
    });
  });
};

// Watch directory recursively
watch(WATCH_DIR, { recursive: true }, handleEvent);

// Process exit handler
process.on("SIGINT", () => {
  console.log("\nImage File Watcher stopped");
  process.exit(0);
});

// Error handling
process.on("uncaughtException", (error) => {
  console.error("Error occurred:", error.message);
  process.exit(1);
});
