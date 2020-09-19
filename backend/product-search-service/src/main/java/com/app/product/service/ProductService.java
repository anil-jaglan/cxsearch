package com.app.product.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.solr.core.query.result.FacetPage;

import com.app.product.model.Product;

public interface ProductService {

    int DEFAULT_PAGE_SIZE = 3;

    Page<Product> findByName(String searchTerm, Pageable pageable);

    Optional<Product> findById(Long id);

    Product save(Product product);

    FacetPage<Product> autocompleteNameFragment(String fragment, Pageable pageable);

}
