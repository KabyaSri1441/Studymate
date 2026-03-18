package com.studymate.backend.dto.response;

public class NoteResponse {
    private Long id;
    private String content;
    private String summary;

    public NoteResponse(Long id, String content, String summary) {
        this.id = id;
        this.content = content;
        this.summary = summary;
    }

    public Long getId() { return id; }
    public String getContent() { return content; }
    public String getSummary() { return summary; }
}
