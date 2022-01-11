"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const crypto_1 = require("./crypto");
const dec = new crypto_1.Decoder();
dec.decrypt(path.resolve(__dirname, "../secret.enc"));
//# sourceMappingURL=index.js.map