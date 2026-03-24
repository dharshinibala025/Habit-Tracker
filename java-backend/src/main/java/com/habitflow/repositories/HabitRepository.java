package com.habitflow.repositories;

import com.habitflow.models.Habit;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface HabitRepository extends MongoRepository<Habit, String> {
    List<Habit> findByUserIdOrderByCreatedAtDesc(String userId);
}
