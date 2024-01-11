export interface IDBSheetItem {
    id?: string,         // 数据ID
    title: string,       // 任务名
    issueId: string,     // 任务ID
    hour: number,        // 工作时长
    projectId: string,   // 项目ID
    projectName: string, // 项目名
    log: string,         // 工作内容
    date: Date,          // 工作日期
}
