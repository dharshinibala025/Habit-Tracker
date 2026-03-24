package com.habitflow.controllers;

import com.habitflow.models.Habit;
import com.habitflow.repositories.HabitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/habits")
public class HabitController {

    @Autowired
    private HabitRepository habitRepository;

    // GET /api/habits/:userId
    @GetMapping("/{userId}")
    public ResponseEntity<List<Habit>> getHabits(@PathVariable String userId) {
        return ResponseEntity.ok(habitRepository.findByUserIdOrderByCreatedAtDesc(userId));
    }

    // POST /api/habits
    @PostMapping
    public ResponseEntity<Habit> createHabit(@RequestBody Habit habit) {
        habit.setCompletedDates(habit.getCompletedDates() != null ? habit.getCompletedDates() : List.of());
        return ResponseEntity.status(HttpStatus.CREATED).body(habitRepository.save(habit));
    }

    // PATCH /api/habits/:id/toggle  — toggle completion for a date
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<?> toggleHabit(@PathVariable String id, @RequestBody Map<String, String> body) {
        String date = body.get("date"); // 'YYYY-MM-DD'

        Optional<Habit> opt = habitRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "Habit not found"));
        }

        Habit habit = opt.get();
        List<String> dates = new java.util.ArrayList<>(
                habit.getCompletedDates() != null ? habit.getCompletedDates() : List.of()
        );

        if (dates.contains(date)) {
            dates.remove(date);
        } else {
            dates.add(date);
        }
        habit.setCompletedDates(dates);
        return ResponseEntity.ok(habitRepository.save(habit));
    }

    // DELETE /api/habits/:id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHabit(@PathVariable String id) {
        habitRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Habit deleted"));
    }
}
