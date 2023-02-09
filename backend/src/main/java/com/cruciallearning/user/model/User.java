package com.cruciallearning.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "APP_USER")
public class User {

    @Id
    @GeneratedValue
    @JsonProperty("ID")
    private Long userId;

    @NonNull
    @Column(name = "FIRST_NAME")
    private String firstName;

    @NonNull
    @Column(name = "LAST_NAME")
    private String lastName;

    @NonNull
    @Column(name = "BIRTH_DATE")
    private Date birthdate;

    @NonNull
    @Column(name = "SHOE_SIZE")
    private Float shoeSize;

    public String getName() {
        return lastName + ", " + firstName;
    }

    public Long getId() {
        return userId;
    }
}
