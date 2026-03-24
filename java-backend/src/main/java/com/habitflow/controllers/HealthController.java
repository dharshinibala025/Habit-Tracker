package com.habitflow.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.Instant;
import java.util.Map;

@RestController
public class HealthController {

    // GET / — Root check
    @GetMapping("/")
    public Map<String, String> root() {
        return Map.of(
            "message", "HabitFlow Java API is Running ✅",
            "status",  "OK",
            "timestamp", Instant.now().toString()
        );
    }

    // GET /api/health — Health check (test in browser)
    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of(
            "status",    "OK",
            "backend",   "Java Spring Boot",
            "database",  "MongoDB Atlas",
            "timestamp", Instant.now().toString()
        );
    }
}
