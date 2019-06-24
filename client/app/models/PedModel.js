import PedLine from './PedLine'
import HubSession from './HubSession'

export default class PedModel {

    constructor(model, modelType, sampleId, projectId, source, isPed) {
        this.modelType = modelType;
        this.model = model;
        this.sampleId = sampleId;
        this.projectId = projectId;
        this.source = source;
        this.isPed = isPed;
        this.pedLines = null;
        this.pedTxt = null;


        this.hubSession = null;
        this.hubRawPedigree = null;

        this.parseModel();


    }

    parseModel() {
        let self = this;

       if (self.modelType === "H") {
            self.populateHubModel();
        }
       else if(self.modelType === "D"){
           this.populateDemoModel();
       }
    }

    buildPedFromHub(){
        let self = this;

        self.pedTxt = "";

        console.log("inside of buildPedFromHub");


            console.log("rawPedigree inside hubToTxt", self.model);


            for (const [key, value] of Object.entries(self.model)) {

                let pedLine = "";

                let paternal_id = "0";
                let maternal_id = "0";

                let ped = value["pedigree"];
                let name = value["name"];
                let id = value["id"];

                let sex = ped["sex"];
                let affection_status = ped["affection_status"];
                let kindred_id = ped["kindred_id"];


                console.log("ped", ped);
                console.log("name", name);

                if(ped.hasOwnProperty("paternal_id")){
                    paternal_id = ped["paternal_id"];
                    console.log("paternal_id", typeof paternal_id);
                    if(typeof paternal_id === "object"){
                        paternal_id = "0";
                    }
                }

                if(ped.hasOwnProperty("maternal_id")){
                    maternal_id = ped["maternal_id"];
                    if(typeof maternal_id === "object"){
                        maternal_id = "0";
                    }
                }


                pedLine = pedLine + kindred_id + " " + id + " " + paternal_id + " " + maternal_id + " " + sex + " " + affection_status + "\n";


                console.log("pedLine is:", pedLine);

                self.pedTxt = self.pedTxt + pedLine;
                console.log("pedTxt inside hubToTxt", self.pedTxt);

            }


    }

    populateDemoModel() {
        let self = this;
            self.pedTxt = "1 NA12878 NA12891 NA12892 2 1\n" +
                "1 NA12891 0 0 1 0\n" +
                "1 NA12892 0 0 2 0\n";

    }

    populateHubModel() {

        let self = this;
        console.log("model inside populateHubModel", self.model);
        self.buildPedFromHub();

    }

    promiseHubSession() {
        let self = this;
        self.hubSession = new HubSession();

        console.log("self.source before hard coding", self.source);
        self.source = "https://staging.frameshift.io";
        console.log("sampleId", self.sampleId, "source", self.source, "isPed", self.isPed, "project", self.projectId);

        return self.hubSession.promiseInit(self.sampleId, self.source, self.isPed, self.projectId);
    }
}
