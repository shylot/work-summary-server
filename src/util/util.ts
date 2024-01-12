// 将Excel日期转换为Javascript日期
const excelDateToJavaScriptDate = (excelData: number) => {
    const excelEpochStart = 61; // Excel epoch start (1900-01-01) in days since epoch
    const javascriptEpochStart = 0; // JavaScript epoch start (1970-01-01) in days since epoch
    const epochStartOffset = excelEpochStart - javascriptEpochStart;
    const javascriptDate = new Date(excelData * 86400 * 1000 - epochStartOffset * 86400 * 1000);
    return javascriptDate;
}

export const Util = {
    excelDateToJavaScriptDate
}
