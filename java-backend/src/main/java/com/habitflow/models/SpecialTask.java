package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "specialtasks")
public class SpecialTask {

    @Id
    @JsonProperty("_id")
    private String id;

    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    private String title;
    private String description;
    private String priority = "medium"; // low | medium | high
    private Boolean completed = false;
    private Date dueDate;
    private String category;
    private Date createdAt = new Date();
}

