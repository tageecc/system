/**
 * 字节转换
 * @param bytes
 * @returns {*}
 */
exports.bytesToSize = (bytes = 0) => {
    if (bytes === 0) return '0 B';

    const k = 1024;

    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
};

exports.secondFormat = (second = 0) => {
    if (second === 0) return '0秒';

    second = parseInt(second);// 秒
    let mim = 0;// 分
    let hour = 0;// 小时
    let day = 0;
    if (second > 60) {
        mim = parseInt(second / 60);
        second = parseInt(second % 60);
        if (mim > 60) {
            hour = parseInt(hour / 60);
            mim = parseInt(mim % 60);
            if (hour > 24) {
                day = parseInt(hour / 24);
                hour = parseInt(hour % 24);
            }
        }
    }
    let result = "" + parseInt(second) + "秒";
    if (mim > 0) {
        result = "" + mim + "分" + result;
    }
    if (hour > 0) {
        result = "" + hour + "小时" + result;
    }
    if (day > 0) {
        result = "" + day + "天" + result;
    }
    return result;
};