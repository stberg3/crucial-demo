package com.cruciallearning.user.repository;

import com.cruciallearning.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;


@RestResource
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
