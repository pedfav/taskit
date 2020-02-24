package br.com.pedfav.taskitbackend.http.datacontracts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserAvailabilityDataContract {

    private Boolean availability;
}
