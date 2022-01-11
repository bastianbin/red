// import { Decoder } from "./crypto";
import * as path from "path";
import * as fs from "fs";


class Provider {
    text: String;
    sentences: String[];

    constructor() {
        // would read text from decrypted file
        // const dec = new Decoder();
        // dec.decrypt(path.resolve(__dirname, "../secret.enc"));
        // this.text = fs.readFileSync(path.resolve(__dirname, "./secret.txt")).toString();

        //unfortunately have to use the provided file
        this.text = fs.readFileSync(path.resolve(__dirname, "../clear_smaller.txt")).toString();
        this.splitSentences();
    }

    splitSentences() {
        this.sentences = [];
        this.text.match(/[^\.!\?]+[\.!\?]+/g)?.forEach(str => this.sentences.push(str));
    }

    findNumbers() {
        const quersumme = (str) => {
            let sum = 0;
            for (let item of str) {
                sum = sum + parseInt(item);
            }
            return sum;
        }
        return this.sentences.map(sentence => quersumme(sentence.replace(/[^0-9]/g, '')));
    }
}