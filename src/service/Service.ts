import {DatabaseService} from "./database/DatabaseService";
import ServiceRegister from "./ServiceRegister";
import {IRequestMethod} from "../interface/IReqest";

export default class Service {
    static register() {
        new DatabaseService().register();
    }
    static load(app: any) {
        ServiceRegister.getServiceList().forEach((service: any) => {
            const path: string = `/${service.modulePath}/${service.path}`
            switch (service.method) {
                case IRequestMethod.GET:
                    this.get(app, path, service);
                    break;
                case IRequestMethod.POST:
                    this.post(app, path, service);
                    break;
            }
        });
    }

    private static get(app, path, service) {
        app.get(path, (req, res) => {
            service.entity[service.path]().then(response => {
                res.json(response)
            }).catch((err) => {
                res.json(err);
            })
        })
    }
    private static post(app, path, service) {
        app.post(path, (req, res) => {
            service.entity[service.path]().then(response => {
                res.json(response)
            })
        })
    }
}
