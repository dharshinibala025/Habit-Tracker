package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "grades")
public class Grade {

    @Id
    @JsonProperty("_id")
    private String id;

    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    private String subject;
    private String examId;
    private Double score;
    private Double maxScore = 100.0;
    private String grade;       // A, B, C, D, F
    private String remarks;
    private Date recordedAt = new Date();
}

