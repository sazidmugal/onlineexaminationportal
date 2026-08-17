package com.onlineexam.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Options {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long OptionID;
    @JsonIgnore()
    @ManyToOne()
    @JoinColumn(name = "QuestionID")
    private Questions questions;
    private String OptionText;
    private boolean IsCorrect;
}
