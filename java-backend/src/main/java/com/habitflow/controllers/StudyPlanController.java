package com.habitflow.controllers;

import com.habitflow.models.StudyPlan;
import com.habitflow.repositories.StudyPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plans")
public class StudyPlanController {

    @Autowired
    private StudyPlanRepository studyPlanRepository;

    // GET /api/plans/:userId
    @GetMapping("/{userId}")
    public ResponseEntity<List<StudyPlan>> getPlans(@PathVariable String userId) {
        return ResponseEntity.ok(studyPlanRepository.findByUserId(userId));
    }

    // POST /api/plans
    @PostMapping
    public ResponseEntity<StudyPlan> createPlan(@RequestBody StudyPlan plan) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studyPlanRepository.save(plan));
    }

    // DELETE /api/plans/:id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable String id) {
        studyPlanRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Plan deleted"));
    }
}
