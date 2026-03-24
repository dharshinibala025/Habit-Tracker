package com.habitflow.repositories;

import com.habitflow.models.SpecialTask;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SpecialTaskRepository extends MongoRepository<SpecialTask, String> {
    List<SpecialTask> findByUserId(String userId);
}
