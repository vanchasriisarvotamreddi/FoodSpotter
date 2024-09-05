package com.cmpe202.restaurantfinderapp.dto;


import com.cmpe202.restaurantfinderapp.model.BusinessHours;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class BusinessHoursDTO {
    private String monday;
    private String tuesday;
    private String wednesday;
    private String thursday;
    private String friday;
    private String saturday;
    private String sunday;

    public String getMonday() {
        return monday;
    }

    public void setMonday(String monday) {
        this.monday = monday;
    }

    public String getTuesday() {
        return tuesday;
    }

    public void setTuesday(String tuesday) {
        this.tuesday = tuesday;
    }

    public String getThursday() {
        return thursday;
    }

    public void setThursday(String thursday) {
        this.thursday = thursday;
    }

    public String getWednesday() {
        return wednesday;
    }

    public void setWednesday(String wednesday) {
        this.wednesday = wednesday;
    }

    public String getFriday() {
        return friday;
    }

    public void setFriday(String friday) {
        this.friday = friday;
    }

    public String getSaturday() {
        return saturday;
    }

    public void setSaturday(String saturday) {
        this.saturday = saturday;
    }

    public String getSunday() {
        return sunday;
    }

    public void setSunday(String sunday) {
        this.sunday = sunday;
    }

    BusinessHoursDTO convertBusinessHoursDTOToBusinessHours(BusinessHours businessHours){
        BusinessHoursDTO businessHoursDTO = new BusinessHoursDTO();
        businessHoursDTO.setMonday(businessHours.getMonday());
        businessHoursDTO.setTuesday(businessHours.getTuesday());
        businessHoursDTO.setThursday(businessHours.getThursday());
        businessHoursDTO.setFriday(businessHours.getFriday());
        businessHoursDTO.setSaturday(businessHours.getSaturday());
        businessHoursDTO.setSunday(businessHours.getSunday());
        return businessHoursDTO;
    }

}
