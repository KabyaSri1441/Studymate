package com.studymate.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studymate.backend.model.Note;
import com.studymate.backend.service.AiService;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NotesController {

    @Autowired
    private AiService aiService;

    // 🚨 NO DATABASE FOR NOW — ONLY AI TEST
    @PostMapping
    public Note summarizeOnly(@RequestBody Note note) {

        System.out.println("Received text: " + note.getContent());

        String summary = aiService.getSummary(note.getContent());

        note.setSummary(summary);

        System.out.println("Generated summary: " + summary);

        return note;   // ← NOT saving to DB
    }
}

