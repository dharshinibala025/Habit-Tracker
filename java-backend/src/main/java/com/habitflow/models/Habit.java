package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "habits")
public class Habit {

    @Id
    @JsonProperty("_id")
    private String id;

    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    private String name;
    private String description;
    private List<String> completedDates;

    // Advanced Management
    private String type = "positive";      // positive | negative
    private Integer goal = 1;
    private String unit = "times";

    private String category = "General";
    private List<String> tags;
    private String color = "#6366f1";
    private String icon;

    // Frequency
    private Frequency frequency;

    // Social
    private String visibility = "private"; // private | friends | public
    private List<String> sharedWith;

    // Dependencies
    private List<String> dependencies;

    // Status
    private Boolean archived = false;
    private Date archivedAt;

    private Date createdAt = new Date();

    @Data
    public static class Frequency {
        private String type = "daily";     // daily | weekly | specific_days
        private List<String> days;         // ['Mon', 'Wed', 'Fri']
        private Integer repeatEvery = 1;
    }
}

