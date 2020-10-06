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
import org.springframework.data.solr.core.query.FacetOptions.FieldWithNumericRangeParameters;
import org.springframework.data.solr.core.query.SimpleFacetQuery;
import org.springframework.data.solr.core.query.SimpleQuery;
import org.springframework.data.solr.core.query.SimpleStringCriteria;
import org.springframework.stereotype.Service;

import com.app.cxsearch.dto.request.FacetDTO;
import com.app.cxsearch.dto.request.PriceRange;
import com.app.cxsearch.dto.request.SearchCriteria;
import com.app.cxsearch.model.Product;
import static com.app.cxsearch.service.SearchableProductDefinition.*;

@Service
public class SearchServiceImpl implements SearchService {

    private static final String DEFALT_SEARCH = "*:*";

    @Autowired
    private SolrTemplate solrTemplate;

    @Override
    public Page<Product> search(SearchCriteria search, Pageable pageable) {
        String query = Optional.ofNullable(search.getQ()).orElse(DEFALT_SEARCH);
        Criteria criteria = new SimpleStringCriteria(query);
        SimpleFacetQuery facetQuery = new SimpleFacetQuery(criteria);
        facetQuery.setRequestHandler("/search");
        FacetDTO facet = search.getFacet();
        FacetOptions facetOpts = new FacetOptions();
        if (Objects.nonNull(facet)) {

            if (Objects.nonNull(facet.getPrice())) {
                facetQuery.addFilterQuery(new SimpleQuery(new Criteria(buildFacet(PRICE_FIELD_NAME))
                        .between(facet.getPrice().getFrom(), facet.getPrice().getTo())));
                facetOpts.addFacetOnField(buildFacet(PRICE_FIELD_NAME));
            } else {
                facetOpts.addFacetOnField(PRICE_FIELD_NAME);
            }
            if (Objects.nonNull(facet.getCategory())) {
                facetQuery.addFilterQuery(
                        new SimpleQuery(new Criteria(buildFacet(SECTION_TITLE_FIELD_NAME)).in(facet.getCategory())));
                facetOpts.addFacetOnField(buildFacet(SECTION_TITLE_FIELD_NAME));
            } else {
                facetOpts.addFacetOnField(SECTION_TITLE_FIELD_NAME);
            }
            if (Objects.nonNull(facet.getBrand())) {
                facetQuery.addFilterQuery(
                        new SimpleQuery(new Criteria(buildFacet(MANUFACTURER_FIELD_NAME)).in(facet.getBrand())));
                facetOpts.addFacetOnField(buildFacet(MANUFACTURER_FIELD_NAME));
            } else {
                facetOpts.addFacetOnField(MANUFACTURER_FIELD_NAME);
            }
        } else {
            facetOpts.addFacetOnField(PRICE_FIELD_NAME);
            facetOpts.addFacetOnField(SECTION_TITLE_FIELD_NAME);
            facetOpts.addFacetOnField(MANUFACTURER_FIELD_NAME);
        }
        facetQuery.setFacetOptions(facetOpts);

        return solrTemplate.queryForFacetPage(COLLECTION, facetQuery, Product.class);
    }

    protected FieldWithNumericRangeParameters buildPriceFacet(PriceRange priceRange) {
        return new FieldWithNumericRangeParameters(PRICE_FIELD_NAME, priceRange.getFrom(), priceRange.getTo(), 5)
                .setHardEnd(true).setInclude(FacetRangeInclude.ALL);
    }

    protected String buildFacet(String name) {
        return String.format("{!ex=%s}%s", name, name);
    }

    // @Override
    // public Page<Product> search(SearchCriteria search, Pageable pageable) {
    // FacetOptions facetOptions = new FacetOptions();
    // FacetDTO facet = search.getFacet();
    // if(Objects.nonNull(facet)) {
    // PriceRange priceRange = facet.getPrice();
    // if (Objects.nonNull(priceRange)) {
    // facetOptions.addFacetByRange(buildPriceFacet(priceRange));
    // }
    // if(Objects.nonNull(facet.getBrand())) {
    // facetOptions.addFacetOnField(SearchableProductDefinition.MANUFACTURER_FIELD_NAME);
    // }
    // }
    // facetOptions.setFacetMinCount(0);
    //
    // String query = Optional.ofNullable(search.getQ()).orElse(DEFALT_SEARCH);
    // Criteria criteria = new SimpleStringCriteria(query);
    // SimpleFacetQuery facetQuery = new
    // SimpleFacetQuery(criteria).setFacetOptions(facetOptions);
    //
    // return solrTemplate.queryForFacetPage(SearchableProductDefinition.COLLECTION,
    // facetQuery, Product.class);
    // }
    //
    // protected FieldWithNumericRangeParameters buildPriceFacet(PriceRange
    // priceRange) {
    // return new
    // FieldWithNumericRangeParameters(SearchableProductDefinition.PRICE_FIELD_NAME,
    // priceRange.getFrom(),
    // priceRange.getTo(), 5).setHardEnd(true).setInclude(FacetRangeInclude.ALL);
    // }

}
