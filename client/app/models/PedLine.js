export default class PedLine {

    constructor(line, lineType) {
        this.line = line;
        this.lineType = lineType;
        this.familyID = -1;
        this.individualID = -1;
        this.paternalID = -1;
        this.maternalID = -1;
        this.sexID = -1;iobio
        this.sex = 'unknown';
        this.phenotype = null;
        this.genotype = null;
        this.txt = null;



        if(this.lineType === "H"){
            this.populateHubLine();
        }
    }

    populateHubLine(){


    }

}
