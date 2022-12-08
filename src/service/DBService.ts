import {IdbInfo, IdbType} from "../db/common/IDB";
import DBFactory from "../db/DBFactory";
import DB from "../db/common/DB";
import {IEVN} from "../IEVN";

export default class DBService {
    private db: DB;
    private SERVICE_PATH: IEVN = IEVN.DB;

    constructor(type: IdbType,  dbInfo: IdbInfo) {
        this.db = new DBFactory(type, dbInfo).getDB();
    }

    public connenct() {
        return this.db.connect();
    }
}
