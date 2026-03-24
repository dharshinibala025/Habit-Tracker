package com.habitflow.repositories;

import com.habitflow.models.Exam;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ExamRepository extends MongoRepository<Exam, String> {
    List<Exam> findByUserId(String userId);
}
