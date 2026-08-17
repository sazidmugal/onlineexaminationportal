package com.onlineexam.services;

import com.onlineexam.entities.Options;
import java.util.List;

public interface OptionService {
    Options addOption(Options option);
    List<Options> getAllOptions();
    Options findOptionById(Long id);
    List<Options> getOptionsByQuestionId(Long questionId);
    Options updateOption(Long id, Options optionDetails);
    void deleteOption(Long id);
}