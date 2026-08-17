package com.onlineexam.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlineexam.entities.Options;
import com.onlineexam.exceptions.NotFoundException;
import com.onlineexam.repository.OptionRepository;
import com.onlineexam.services.OptionService;

import java.util.List;

@Service
public class OptionServiceImpl implements OptionService {

    @Autowired
    private OptionRepository optionRepository;

    @Override
    public Options addOption(Options option) {
        return this.optionRepository.save(option);
    }

    @Override
    public List<Options> getAllOptions() {
        return this.optionRepository.findAll();
    }

    @Override
    public Options findOptionById(Long id) {
        return this.optionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Option with ID " + id + " not found"));
    }

    @Override
    public List<Options> getOptionsByQuestionId(Long questionId) {
        return this.optionRepository.findByQuestions_QuestionId(questionId);
    }

    @Override
    public Options updateOption(Long id, Options optionDetails) {
        Options existingOption = findOptionById(id);
        existingOption.setOptionText(optionDetails.getOptionText());
        existingOption.setIsCorrect(optionDetails.isIsCorrect());
        return this.optionRepository.save(existingOption);
    }

    @Override
    public void deleteOption(Long id) {
        Options existingOption = findOptionById(id);
        this.optionRepository.delete(existingOption);
    }
}