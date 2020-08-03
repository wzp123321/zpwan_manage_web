'use strict';
const crypto = require('crypto');

const generateUUId = (len: number) => {
    // isFinite 判断是否为有限数值
    if (!Number.isFinite(len)) {
        throw new TypeError('Expected a finite number');
    }

    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
};

/**
 * 格式化时间
 * @param date 日期
 */
const formatDate = (date: number) => {
    const dateTime = new Date(date)
    const YY = dateTime.getFullYear()
    const MM =
        dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1
    const D =
        dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
    const hh =
        dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()
    const mm =
        dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()
    const ss =
        dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds()
    return `${YY}-${MM}-${D} ${hh}:${mm}`
}

/**
 * 格式化音乐时长
 * @param time 时长
 */
const formatDuration = (time: number) => {
    if (!time) {
        return '00:00'
    }
    var minutes = Math.floor(time / 60)
    var seconds = time - minutes * 60

    return (
        (minutes > 0 ? minutes + ':' : '0:') +
        (seconds > 0 ? (Math.floor(seconds) < 10 ? '0' + Math.floor(seconds) : Math.floor(seconds)) : '00')
    )
}


export { generateUUId, formatDate, formatDuration };