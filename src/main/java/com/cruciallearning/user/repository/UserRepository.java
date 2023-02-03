package com.cruciallearning.user.repository;

import com.cruciallearning.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@RestResource
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
}
