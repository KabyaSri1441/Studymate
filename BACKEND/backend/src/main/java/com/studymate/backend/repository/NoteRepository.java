package com.studymate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studymate.backend.model.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
