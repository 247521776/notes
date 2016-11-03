"use strict";

const fs = require("fs");

/**
 * tailf
 *
 * @param {String} fileName 文件名称
 * @param {Number} delay 读取不到文件时等待时间 ms
 */
function tailf(fileName, delay) {
    console.log("开始读取");
    //读取文件大小
    const CHUNK_SIZE = 1024;

    const fd = fs.openSync(fileName, "r");
    //文件开始位置
    let position = fs.fstatSync(fd).size;

    const loop = () => {
        const bf = new Buffer(CHUNK_SIZE);
        let _CHUNK_SIZE = CHUNK_SIZE;
        if(position > _CHUNK_SIZE) {
            position -= CHUNK_SIZE;
        } else {
            _CHUNK_SIZE = position;
            position = 0;
        }
        const bytesRead = fs.readSync(fd, bf, 0, _CHUNK_SIZE, position);
        //更新读取位置
        if(position > bytesRead) {
            position -= bytesRead;
        }
        process.stdout.write(bf.slice(0, bytesRead), "\r");

        if(bytesRead < CHUNK_SIZE) {
            //setTimeout(loop, delay);
            console.log("读取结束")
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