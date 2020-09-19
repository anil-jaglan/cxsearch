package com.app.product.controller;

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

import com.app.product.model.Product;
import com.app.product.service.ProductService;

@RestController
@CrossOrigin(origins="*")
public class SearchController {

    @Autowired
    private ProductService productService;

    @GetMapping(value = "/v1/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<Product> search(@RequestParam(value = "q", required = false) String query,
            @PageableDefault(page = 0, size = ProductService.DEFAULT_PAGE_SIZE) Pageable pageable) {
        return productService.findByName(query, pageable);
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
