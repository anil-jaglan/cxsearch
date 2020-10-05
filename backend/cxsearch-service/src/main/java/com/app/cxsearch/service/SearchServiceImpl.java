package com.app.cxsearch.service;

import java.util.Objects;
import java.util.Optional;

import org.apache.solr.common.params.FacetParams.FacetRangeInclude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.core.query.Criteria;
import org.springframework.data.solr.core.query.FacetOptions;
import org.springframework.data.solr.core.query.SimpleFacetQuery;
import org.springframework.data.solr.core.query.SimpleStringCriteria;
import org.springframework.data.solr.core.query.FacetOptions.FieldWithFacetParameters;
import org.springframework.data.solr.core.query.FacetOptions.FieldWithNumericRangeParameters;
import org.springframework.data.solr.core.query.FieldWithQueryParameters;
import org.springframework.stereotype.Service;

import com.app.cxsearch.dto.request.FacetDTO;
import com.app.cxsearch.dto.request.PriceRange;
import com.app.cxsearch.dto.request.SearchCriteria;
import com.app.cxsearch.model.Product;

@Service
public class SearchServiceImpl implements SearchService {

    @Autowired
    private SolrTemplate solrTemplate;

    @Override
    public Page<Product> search(SearchCriteria search, Pageable pageable) {
        FacetOptions facetOptions = new FacetOptions();
        FacetDTO facet = search.getFacet();
        if(Objects.nonNull(facet)) {
            PriceRange priceRange = facet.getPrice();
            if (Objects.nonNull(priceRange)) {
                facetOptions.addFacetByRange(buildPriceFacet(priceRange));
            }
            if(Objects.nonNull(facet.getBrand())) {
                facetOptions.addFacetOnField(SearchableProductDefinition.MANUFACTURER_FIELD_NAME);
            }
        }
        facetOptions.setFacetMinCount(0);
        String query = Optional.ofNullable(search.getQ()).orElse("*:*");
        Criteria criteria = new SimpleStringCriteria(query);
        SimpleFacetQuery facetQuery = new SimpleFacetQuery(criteria).setFacetOptions(facetOptions);
        return solrTemplate.queryForFacetPage(SearchableProductDefinition.COLLECTION, facetQuery, Product.class);
    }

    protected FieldWithNumericRangeParameters buildPriceFacet(PriceRange priceRange) {
        return new FieldWithNumericRangeParameters(SearchableProductDefinition.PRICE_FIELD_NAME, priceRange.getFrom(),
                priceRange.getTo(), 5).setHardEnd(true).setInclude(FacetRangeInclude.ALL);
    }

}
