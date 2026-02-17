const sharp = require('sharp');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs-extra');
const path = require('path');
const config = require('./config');

const execPromise = promisify(exec);

class StickerHandler {
  constructor() {
    this.tempDir = path.join(__dirname, 'temp');
    fs.ensureDirSync(this.tempDir);
  }

  async createSticker(buffer, options = {}) {
    const {
      pack = config.DEFAULT_STICKER_PACK,
      author = config.DEFAULT_STICKER_AUTHOR,
      type = 'full'
    } = options;

    try {
      const tempInput = path.join(this.tempDir, `input_${Date.now()}`);
      const tempOutput = path.join(this.tempDir, `output_${Date.now()}.webp`);

      await fs.writeFile(tempInput, buffer);

      // Check file type
      const fileType = await this.getFileType(tempInput);

      if (fileType.includes('image')) {
        await this.imageToSticker(tempInput, tempOutput, type);
      } else if (fileType.includes('video')) {
        await this.videoToSticker(tempInput, tempOutput, type);
      } else {
        throw new Error('Unsupported file type');
      }

      // Add metadata
      const finalSticker = await this.addMetadata(tempOutput, pack, author);

      // Cleanup
      await fs.unlink(tempInput).catch(() => {});
      await fs.unlink(tempOutput).catch(() => {});

      return finalSticker;
    } catch (error) {
      console.error('Sticker creation error:', error);
      throw error;
    }
  }

  async imageToSticker(input, output, type) {
    try {
      const image = sharp(input);
      const metadata = await image.metadata();

      let width = 512;
      let height = 512;

      if (type === 'crop') {
        // Crop to square
        const size = Math.min(metadata.width, metadata.height);
        await image
          .extract({
            left: Math.floor((metadata.width - size) / 2),
            top: Math.floor((metadata.height - size) / 2),
            width: size,
            height: size
          })
          .resize(512, 512)
          .webp({ quality: 100 })
          .toFile(output);
      } else {
        // Full with padding
        if (metadata.width > metadata.height) {
          height = Math.floor((metadata.height / metadata.width) * 512);
        } else {
          width = Math.floor((metadata.width / metadata.height) * 512);
        }

        await image
          .resize(width, height, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .extend({
            top: Math.floor((512 - height) / 2),
            bottom: Math.ceil((512 - height) / 2),
            left: Math.floor((512 - width) / 2),
            right: Math.ceil((512 - width) / 2),
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .webp({ quality: 100 })
          .toFile(output);
      }
    } catch (error) {
      console.error('Image to sticker error:', error);
      throw error;
    }
  }

  async videoToSticker(input, output, type) {
    try {
      const scale = type === 'crop' ? 'scale=512:512:force_original_aspect_ratio=increase,crop=512:512' : 'scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:-1:-1:color=0x00000000';
      
      await execPromise(
        `ffmpeg -i "${input}" -vf "${scale}" -t 00:00:06 -c:v libwebp -lossless 0 -compression_level 6 -q:v 50 -loop 0 -preset default -an -vsync 0 "${output}"`
      );
    } catch (error) {
      console.error('Video to sticker error:', error);
      throw error;
    }
  }

  async addMetadata(stickerPath, pack, author) {
    try {
      const exif = {
        'sticker-pack-id': 'com.nexora.stickerpack',
        'sticker-pack-name': pack,
        'sticker-pack-publisher': author
      };

      const webpWithExif = await this.writeExif(await fs.readFile(stickerPath), exif);
      return webpWithExif;
    } catch (error) {
      console.error('Add metadata error:', error);
      // Return without metadata if it fails
      return await fs.readFile(stickerPath);
    }
  }

  async writeExif(webpBuffer, exif) {
    try {
      const exifStr = JSON.stringify(exif);
      const exifBuffer = Buffer.from(exifStr, 'utf-8');
      
      // Simple EXIF injection
      const img = Buffer.concat([
        webpBuffer.slice(0, 4),
        Buffer.from([0x45, 0x78, 0x69, 0x66]), // "Exif"
        this.intToBytes(exifBuffer.length),
        exifBuffer,
        webpBuffer.slice(4)
      ]);
      
      return img;
    } catch (error) {
      console.error('Write EXIF error:', error);
      return webpBuffer;
    }
  }

  intToBytes(num) {
    const buffer = Buffer.alloc(4);
    buffer.writeUInt32LE(num, 0);
    return buffer;
  }

  async getFileType(filePath) {
    try {
      const { stdout } = await execPromise(`file -b --mime-type "${filePath}"`);
      return stdout.trim();
    } catch {
      return 'application/octet-stream';
    }
  }

  async cleanup() {
    try {
      const files = await fs.readdir(this.tempDir);
      const now = Date.now();
      
      for (const file of files) {
        const filePath = path.join(this.tempDir, file);
        const stats = await fs.stat(filePath);
        
        // Delete files older than 1 hour
        if (now - stats.mtimeMs > 3600000) {
          await fs.unlink(filePath).catch(() => {});
        }
      }
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

module.exports = new StickerHandler();
