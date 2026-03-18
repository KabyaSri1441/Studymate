package com.studymate.backend.service;

import org.springframework.stereotype.Service;

@Service
public class SummarizeService {

    public String summarize(String text) {

        if (text.length() > 100)
            return text.substring(0, 100) + "...";

        return text;
    }
}


