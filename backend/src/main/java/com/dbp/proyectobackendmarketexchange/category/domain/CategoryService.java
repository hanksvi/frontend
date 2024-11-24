package com.dbp.proyectobackendmarketexchange.category.domain;


import com.dbp.proyectobackendmarketexchange.category.dto.CategoryRequestDto;
import com.dbp.proyectobackendmarketexchange.category.dto.CategoryResponseDto;
import com.dbp.proyectobackendmarketexchange.category.infrastructure.CategoryRepository;
import com.dbp.proyectobackendmarketexchange.exception.ResourceNotFoundException;
import com.dbp.proyectobackendmarketexchange.item.dto.ItemResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public CategoryService(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    public List<CategoryResponseDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> modelMapper.map(category, CategoryResponseDto.class))
                .collect(Collectors.toList());
    }

    public CategoryResponseDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        CategoryResponseDto categoryResponseDto = modelMapper.map(category, CategoryResponseDto.class);

        List<ItemResponseDto> itemResponseDtos = category.getItems().stream()
                .map(item -> modelMapper.map(item, ItemResponseDto.class))
                .collect(Collectors.toList());



        return categoryResponseDto;
    }

    public CategoryResponseDto createCategory(CategoryRequestDto createCategoryDTO) {
        Category category = modelMapper.map(createCategoryDTO, Category.class);
        categoryRepository.save(category);
        return modelMapper.map(category, CategoryResponseDto.class);
    }

    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto categoryUpdate) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        modelMapper.map(categoryUpdate, category);
        categoryRepository.save(category);

        return modelMapper.map(category, CategoryResponseDto.class);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
