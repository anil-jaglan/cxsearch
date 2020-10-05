package com.app.cxsearch.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.app.cxsearch.dto.request.SearchCriteria;
import com.app.cxsearch.model.Product;

public interface SearchService {

    Page<Product> search(SearchCriteria search, Pageable pageable);

}
