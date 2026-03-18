package com.studymate.backend.config;

import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AiClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public String summarize(String content) {

        String url = "http://localhost:8000/summarize";

        Map<String, String> request = Map.of("text", content);

        Map response = restTemplate.postForObject(url, request, Map.class);

        return response.get("summary").toString();
    }
}

