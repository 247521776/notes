"use strict";

const fs = require("fs");

/**
 * tailf
 *
 * @param {String} fileName 文件名称
 * @param {Number} delay 读取不到文件时等待时间 ms
 */
function tailf(fileName, delay) {
    //读取文件大小
    const CHUNK_SIZE = 16 * 1024;

    const fd = fs.openSync(fileName, "r");
    //文件开始位置
    let position = 0;

    const loop = () => {
        const bf = new Buffer(CHUNK_SIZE);
        const bytesRead = fs.readSync(fd, bf, 0, CHUNK_SIZE, position);
        //更新读取位置
        position += bytesRead;
        process.stdout.write(bf.slice(0, bytesRead));

        if(bytesRead < CHUNK_SIZE) {
            setTimeout(loop, delay);
        } else {
            loop();
        }
    };

    loop();
}

const fileName = process.argv[2];
if(fileName) {
    tailf(fileName, 1000);
} else {
    console.log("使用方法 : node tail <文件名>")
}