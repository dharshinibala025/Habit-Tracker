package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "notifications")
public class Notification {

    @Id
    @JsonProperty("_id")
    private String id;

    private String userId;
    private String title;
    private String message;
    private String type;           // streak_warning | achievement | reminder | social
    private boolean read = false;
    private String habitId;        // optional, linked habit
    private Date createdAt = new Date();
}

