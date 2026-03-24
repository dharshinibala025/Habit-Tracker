package com.habitflow.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "habittemplates")
public class HabitTemplate {

    @Id
    @JsonProperty("_id")
    private String id;

    private String name;
    private String description;
    private String category = "General";
    private String icon;
    private String color = "#6366f1";
    private List<String> tags;
    private String type = "positive";
    private String unit = "times";
    private int goal = 1;
    private Date createdAt = new Date();
}

