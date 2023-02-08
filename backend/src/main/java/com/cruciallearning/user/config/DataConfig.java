package com.cruciallearning.user.config;

import com.cruciallearning.user.model.User;
import com.cruciallearning.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.sql.Date;
import java.util.Arrays;

@Component
public class DataConfig {

    UserRepository userRepository;

    @Autowired
    public DataConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void insertRecords() {
        userRepository.saveAll(Arrays.asList(
                new User("Sam", "Berg", Date.valueOf("1990-03-13"), 12F),
                new User("Shaquille", "O'Neal", Date.valueOf("1972-03-06"), 23F),
                new User("Tinker", "Bell", Date.valueOf("1904-12-27"), 0.1F)
        ));
    }
}
