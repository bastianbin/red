import * as path from "path";

import { Decoder } from "./crypto";

const dec = new Decoder();
dec.decrypt(path.resolve(__dirname, "../secret.enc"));