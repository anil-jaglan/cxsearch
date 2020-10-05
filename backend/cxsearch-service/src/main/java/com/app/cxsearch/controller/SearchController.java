package com.app.cxsearch.controller;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.solr.core.query.result.FacetFieldEntry;
import org.springframework.data.solr.core.query.result.FacetPage;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.cxsearch.dto.request.SearchCriteria;
import com.app.cxsearch.model.Product;
import com.app.cxsearch.service.ProductService;
import com.app.cxsearch.service.SearchService;

@RestController
@CrossOrigin(origins="*")
public class SearchController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private SearchService searchService;

    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<Product> defaultSearch(@RequestParam(value = "q", required = false) String query,
            @PageableDefault(page = 0, size = ProductService.DEFAULT_PAGE_SIZE) Pageable pageable) {
        return productService.findByName(query, pageable);
    }
    
    @GetMapping(value = "/v1/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<Product> search(SearchCriteria search,
            @PageableDefault(page = 0, size = ProductService.DEFAULT_PAGE_SIZE) Pageable pageable) {
        return productService.findByName(search.getQ(), pageable);
    }
    @GetMapping(value = "/v2/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<Product> searchV2(SearchCriteria search,
            @PageableDefault(page = 0, size = ProductService.DEFAULT_PAGE_SIZE) Pageable pageable) {
        return searchService.search(search, pageable);
    }

    @GetMapping(value = "/v1/autocomplete", produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<String> autoComplete(@RequestParam("term") String query,
            @PageableDefault(page = 0, size = 1) Pageable pageable) {
        if (!StringUtils.hasText(query)) {
            return Collections.emptySet();
        }

        FacetPage<Product> result = productService.autocompleteNameFragment(query, pageable);

        Set<String> titles = new LinkedHashSet<String>();
        for (Page<FacetFieldEntry> page : result.getFacetResultPages()) {
            for (FacetFieldEntry entry : page) {
                if (entry.getValue().contains(query)) {
                    titles.add(entry.getValue());
                }
            }
        }
        return titles;
    }

}
