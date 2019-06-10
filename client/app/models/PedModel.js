import PedLine from './PedLine'

export default class PedModel {

    constructor(model, modelType) {
        this.modelType = modelType;
        this.model = model;
        this.pedLines = null;
        this.pedTxt = null;

        this.parseModel();
        this.populatePedTxt();


    }

    parseModel() {
        let self = this;

       if (this.modelType === "H") {
            self.populateHubModel();
        }
    }

    populatePedTxt() {
        let self = this;
        self.pedTxt = "";
        if(self.modelType === "D") {
            self.pedTxt = "1 NA12878 NA12891 NA12892 2 1\n" +
                "1 NA12891 0 0 1 0\n" +
                "1 NA12892 0 0 2 0\n";

        }
        console.log("populated pedTxt is ", self.pedTxt);
    }

    populateHubModel() {

    }
}
