package com.cruciallearning.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "APP_USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", updatable = false, nullable = false)
    private long userId;

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
}
