package com.habitflow.controllers;

import com.habitflow.models.SpecialTask;
import com.habitflow.repositories.SpecialTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class SpecialTaskController {

    @Autowired
    private SpecialTaskRepository taskRepository;

    // GET /api/tasks/:userId
    @GetMapping("/{userId}")
    public ResponseEntity<List<SpecialTask>> getTasks(@PathVariable String userId) {
        return ResponseEntity.ok(taskRepository.findByUserId(userId));
    }

    // POST /api/tasks
    @PostMapping
    public ResponseEntity<SpecialTask> createTask(@RequestBody SpecialTask task) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskRepository.save(task));
    }

    // PATCH /api/tasks/:id  — toggle completed / update fields
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        Optional<SpecialTask> opt = taskRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "Task not found"));
        }
        SpecialTask task = opt.get();

        if (updates.containsKey("completed")) task.setCompleted((Boolean) updates.get("completed"));
        if (updates.containsKey("title"))     task.setTitle((String) updates.get("title"));
        if (updates.containsKey("priority"))  task.setPriority((String) updates.get("priority"));

        return ResponseEntity.ok(taskRepository.save(task));
    }

    // DELETE /api/tasks/:id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable String id) {
        taskRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Task deleted"));
    }
}
