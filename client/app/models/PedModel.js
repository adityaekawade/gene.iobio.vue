export default class PedModel {

    constructor(demoModel) {
        this.demoModel = demoModel;
        this.pedLines = [];
        this.pedTxt = null;
        this.probandLine = null;
        this.motherLine = null;
        this.fatherLine = null;
        this.parseDemoModel();
        this.populatePedLines();
        this.populatePedTxt()
    }

    parseDemoModel() {
        let self = this;
        console.log(self.demoModel);

        for (let i = 0; i < self.demoModel.length; i++) {
            let line = self.demoModel[i];

            if (line.relationship === "proband") {
                self.probandLine = line;
            } else if (line.relationship === "mother") {
                self.motherLine = line;
            } else if (line.relationship === "father") {
                self.fatherLine = line;
            }
        }
    }

    populatePedLines() {
        let self = this;
        let probandPL = "".concat("1 ", self.probandLine.sample, " ", self.fatherLine.sample, " ", self.motherLine.sample, " 1 ", self.probandLine.affectedStatus, "\n");
        self.pedLines.push(probandPL);
        console.log("proband ped line is:", probandPL);

        let motherPL = "".concat("1 ", self.motherLine.sample, " 0 0 2 ", self.motherLine.affectedStatus, "\n");
        self.pedLines.push(motherPL);
        console.log("mother ped line is:", motherPL);

        let fatherPL = "".concat("1 ", self.fatherLine.sample, " 0 0 1 ", self.fatherLine.affectedStatus, "\n");
        self.pedLines.push(fatherPL);
        console.log("father ped line is:", fatherPL);

    }

    populatePedTxt() {
        let self = this;
        self.pedTxt = "";
        for(let i = 0; i < self.pedLines.length; i++){
            const line = self.pedLines[i];
            self.pedTxt = self.pedTxt.concat(line);
        }
        console.log("populated pedTxt is ", self.pedTxt);
    }
}
