package com.habitflow.controllers;

import com.habitflow.models.Achievement;
import com.habitflow.repositories.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    @Autowired
    private AchievementRepository achievementRepository;

    // GET /api/achievements/:userId
    @GetMapping("/{userId}")
    public ResponseEntity<List<Achievement>> getAchievements(@PathVariable String userId) {
        return ResponseEntity.ok(achievementRepository.findByUserId(userId));
    }

    // POST /api/achievements
    @PostMapping
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        return ResponseEntity.status(HttpStatus.CREATED).body(achievementRepository.save(achievement));
    }
}
