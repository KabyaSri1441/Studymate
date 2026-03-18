package com.studymate.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studymate.backend.service.SummarizeService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class SummarizeController {

    private final SummarizeService summarizeService;

    public SummarizeController(SummarizeService summarizeService) {
        this.summarizeService = summarizeService;
    }

    @PostMapping("/summarize")
    public String summarize(@RequestBody String text) {

        System.out.println("CONTROLLER HIT");
        System.out.println("TEXT RECEIVED: " + text);

        return summarizeService.summarize(text);
    }
}
