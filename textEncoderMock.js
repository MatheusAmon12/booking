// textEncoderMock.js

global.TextEncoder = class {
    encode(text) {
      const buffer = Buffer.from(text, 'utf-8');
      return new Uint8Array(buffer);
    }
  };