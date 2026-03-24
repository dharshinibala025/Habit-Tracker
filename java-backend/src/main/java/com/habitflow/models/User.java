package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "users")
public class User {

    @Id
    @JsonProperty("_id")
    private String id;

    private String name;
    private String email;
    private String password;

    // Gamification
    private Integer points = 0;
    private Integer level = 1;
    private List<String> achievements;
    private List<String> unlockedRewards;

    // Preferences
    private String theme = "light";
    private CustomTheme customTheme;
    private String fontSize = "medium";

    // Notifications
    private NotificationPreferences notificationPreferences;
    private List<String> reminderTimes;

    // Social
    private List<String> friends;
    private List<String> friendRequests;

    private Date joinedAt = new Date();
    private Date lastLogin = new Date();

    @Data
    public static class CustomTheme {
        private String primary;
        private String secondary;
        private String background;
        private String text;
    }

    @Data
    public static class NotificationPreferences {
        private boolean email = true;
        private boolean push = true;
        private boolean dailySummary = true;
        private boolean streakWarnings = true;
    }
}

