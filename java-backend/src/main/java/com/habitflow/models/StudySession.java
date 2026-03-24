package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "studysessions")
public class StudySession {

    @Id
    @JsonProperty("_id")
    private String id;

    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    private String subject;
    private String planId;
    private Integer durationMinutes;
    private String notes;
    private String mood;           // focused | distracted | tired | energetic
    private Date sessionDate;
    private Date createdAt = new Date();
}

