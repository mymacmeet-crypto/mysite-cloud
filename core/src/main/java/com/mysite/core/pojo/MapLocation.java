package com.mysite.core.pojo;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MapLocation {

    @ValueMapValue
    private String locationName;

    @ValueMapValue
    private String address;

    @ValueMapValue
    private String phone;

    @ValueMapValue
    private String email;

    @ValueMapValue
    private String latitude;

    @ValueMapValue
    private String longitude;

    // Getters

    public String getLocationName() {
        return locationName;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getLatitude() {
        return latitude;
    }

    public String getLongitude() {
        return longitude;
    }
}
