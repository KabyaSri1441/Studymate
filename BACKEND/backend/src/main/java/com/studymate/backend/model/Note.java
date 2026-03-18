package com.studymate.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 5000)
    private String content;

    private String summary;

    public Note() {}

    public Note(String content, String summary) {
        this.content = content;
        this.summary = summary;
    }

    public Long getId() { return id; }
    public String getContent() { return content; }
    public String getSummary() { return summary; }

    public void setContent(String content) { this.content = content; }
    public void setSummary(String summary) { this.summary = summary; }
}
