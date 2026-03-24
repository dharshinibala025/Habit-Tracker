package com.habitflow.repositories;

import com.habitflow.models.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AchievementRepository extends MongoRepository<Achievement, String> {
    List<Achievement> findByUserId(String userId);
}
