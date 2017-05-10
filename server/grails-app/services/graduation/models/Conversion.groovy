package graduation.models

import graduation.constants.ConversionFormulaEnum
import grails.validation.Validateable

class Conversion implements Serializable, Validateable {

    private ConversionFormulaEnum formula
    private Map<String, ?> data

    String getFormula() {
        return formula
    }

    void setFormula(ConversionFormulaEnum formula) {
        this.formula = formula
    }

    Map<String, ?> getData() {
        return data
    }

    void setData(Map<String, ?> data) {
        this.data = data
    }
}
