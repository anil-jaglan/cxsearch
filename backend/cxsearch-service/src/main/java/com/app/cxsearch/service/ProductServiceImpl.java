package com.app.cxsearch.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.solr.core.query.result.FacetPage;
import org.springframework.data.solr.core.query.result.SolrResultPage;
import org.springframework.stereotype.Service;

import com.app.cxsearch.model.Product;
import com.app.cxsearch.repository.ProductRepository;

@Service
class ProductServiceImpl implements ProductService {

    private static final Pattern IGNORED_CHARS_PATTERN = Pattern.compile("\\p{Punct}");

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Page<Product> findByName(String searchTerm, Pageable pageable) {
        if (StringUtils.isBlank(searchTerm)) {
            return productRepository.findAll(pageable);
        }
        return productRepository.findByNameIn(splitSearchTermAndRemoveIgnoredCharacters(searchTerm), pageable);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public FacetPage<Product> autocompleteNameFragment(String fragment, Pageable pageable) {
        if (StringUtils.isBlank(fragment)) {
            return new SolrResultPage<Product>(Collections.<Product>emptyList());
        }
        return productRepository.findByNameStartsWith(splitSearchTermAndRemoveIgnoredCharacters(fragment), pageable);
    }

    private Collection<String> splitSearchTermAndRemoveIgnoredCharacters(String searchTerm) {
        String[] searchTerms = StringUtils.split(searchTerm, " ");
        List<String> result = new ArrayList<String>(searchTerms.length);
        for (String term : searchTerms) {
            if (StringUtils.isNotEmpty(term)) {
                result.add(IGNORED_CHARS_PATTERN.matcher(term).replaceAll(" "));
            }
        }
        return result;
    }

}
