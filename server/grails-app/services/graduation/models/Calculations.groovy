package graduation.models

import grails.validation.Validateable

class Calculations implements Serializable, Validateable {

    private String filename
    private List<String> demands
    private List<String> goalList
    private Conversion conversion

    String getFilename() {
        return filename
    }

    void setFilename(String filename) {
        this.filename = filename
    }

    List<String> getDemands() {
        return demands
    }

    void setDemands(List<String> demands) {
        this.demands = demands
    }

    List<String> getGoalList() {
        return goalList
    }

    void setGoalList(List<String> goalList) {
        this.goalList = goalList
    }

    Boolean getIsCollateral() {
        return isCollateral
    }

    void setIsCollateral(Boolean isCollateral) {
        this.isCollateral = isCollateral
    }

    Conversion getConversion() {
        return conversion
    }

    void setConversion(Conversion conversion) {
        this.conversion = conversion
    }
}
