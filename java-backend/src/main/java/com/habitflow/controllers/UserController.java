package com.habitflow.controllers;

import com.habitflow.models.User;
import com.habitflow.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // GET /api/users/:id
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }
        User u = user.get();
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }

    // PATCH /api/users/:id  — Update profile/preferences
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        Optional<User> optUser = userRepository.findById(id);
        if (optUser.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }
        User user = optUser.get();

        if (updates.containsKey("name"))   user.setName((String) updates.get("name"));
        if (updates.containsKey("theme"))  user.setTheme((String) updates.get("theme"));
        if (updates.containsKey("fontSize")) user.setFontSize((String) updates.get("fontSize"));
        if (updates.containsKey("points")) user.setPoints((Integer) updates.get("points"));
        if (updates.containsKey("level"))  user.setLevel((Integer) updates.get("level"));

        User saved = userRepository.save(user);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }
}
