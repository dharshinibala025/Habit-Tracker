package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "achievements")
public class Achievement {

    @Id
    @JsonProperty("_id")
    private String id;

    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    private String achievementId; // e.g. 'first_habit', 'week_streak'
    private String name;
    private String description;
    private String icon;
    private String category;      // streak | consistency | milestone | social
    private Date unlockedAt = new Date();
    private Integer progress = 100;   // percentage for progressive achievements

    private Metadata metadata;

    @Data
    public static class Metadata {
        private Integer streakDays;
        private Integer habitsCompleted;
        private Integer pointsEarned;
    }
}

