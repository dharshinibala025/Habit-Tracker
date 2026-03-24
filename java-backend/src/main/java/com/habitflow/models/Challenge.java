package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "challenges")
public class Challenge {

    @Id
    @JsonProperty("_id")
    private String id;

    private String title;
    private String description;
    private String creatorId;
    private List<String> participants;
    private String habitId;
    private Date startDate;
    private Date endDate;
    private String status = "active"; // active | completed | cancelled
    private int targetDays = 30;
    private String visibility = "public"; // public | private
    private Date createdAt = new Date();
}

