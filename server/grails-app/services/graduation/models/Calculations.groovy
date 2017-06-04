package graduation.models

import graduation.DayValue
import grails.validation.Validateable

class Calculations implements Serializable, Validateable {

    private Long fileId
    private List<DayValue> sample
    private List<String> demands
    private List<String> goalList
    private Conversion conversion

    Long getFileId() {
        return fileId
    }

    void setFileId(Long fileId) {
        this.fileId = fileId
    }

    List<DayValue> getSample() {
        return sample
    }

    void setSample(List<DayValue> sample) {
        this.sample = sample
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

    Conversion getConversion() {
        return conversion
    }

    void setConversion(Conversion conversion) {
        this.conversion = conversion
    }
}
