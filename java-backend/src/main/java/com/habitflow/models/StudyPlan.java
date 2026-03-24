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
@Document(collection = "studyplans")
public class StudyPlan {

    @Id
    @JsonProperty("_id")
    private String id;

    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    private String subject;
    private String goal;
    private List<String> topics;
    private Date startDate;
    private Date endDate;
    private Integer dailyTargetMinutes = 60;
    private String status = "active"; // active | completed | paused
    private Date createdAt = new Date();
}

