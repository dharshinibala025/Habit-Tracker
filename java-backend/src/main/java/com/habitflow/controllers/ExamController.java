package com.habitflow.controllers;

import com.habitflow.models.Exam;
import com.habitflow.repositories.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamRepository examRepository;

    // GET /api/exams/:userId
    @GetMapping("/{userId}")
    public ResponseEntity<List<Exam>> getExams(@PathVariable String userId) {
        return ResponseEntity.ok(examRepository.findByUserId(userId));
    }

    // POST /api/exams
    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        return ResponseEntity.status(HttpStatus.CREATED).body(examRepository.save(exam));
    }

    // DELETE /api/exams/:id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable String id) {
        examRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Exam deleted"));
    }
}
