package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "exams")
public class Exam {

    @Id
    @JsonProperty("_id")
    private String id;

    private String userId;
    private String subject;
    private String type;
    private String date;
    private String status = "upcoming"; // upcoming | completed | missed
    private String notes;
    private Date createdAt = new Date();
}

