import {IRequestMethod} from "../interface/IReqest";
import {IModulePath} from "../interface/IModulePath";

export default class ServiceRegister {
    static list: any[] = [];
    static registerService(method: IRequestMethod, modulePath: IModulePath, path: string, entity) {
        this.list.push({method, modulePath, path, entity})
    }

    static getServiceList() {
        return this.list;
    }
}
