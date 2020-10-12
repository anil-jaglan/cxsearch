package com.app.cxsearch.service;

import static com.app.cxsearch.service.SearchableProductDefinition.COLLECTION;
import static com.app.cxsearch.service.SearchableProductDefinition.MANUFACTURER_FIELD_NAME;
import static com.app.cxsearch.service.SearchableProductDefinition.PRICE_FIELD_NAME;
import static com.app.cxsearch.service.SearchableProductDefinition.SECTION_TITLE_FIELD_NAME;

import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.core.query.Criteria;
import org.springframework.data.solr.core.query.FacetOptions;
import org.springframework.data.solr.core.query.SimpleFacetQuery;
import org.springframework.data.solr.core.query.SimpleQuery;
import org.springframework.data.solr.core.query.SimpleStringCriteria;
import org.springframework.data.solr.core.query.StatsOptions;
import org.springframework.stereotype.Service;

import com.app.cxsearch.dto.request.FacetDTO;
import com.app.cxsearch.dto.request.SearchCriteria;
import com.app.cxsearch.enums.SortEnum;
import com.app.cxsearch.model.Product;

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
        addFilters(search.getFacet(), facetQuery);
        
        StatsOptions statsOptions = new StatsOptions().addField(PRICE_FIELD_NAME);
        facetQuery.setStatsOptions(statsOptions);
        facetQuery.setFacetOptions(bulidFacetOnFields());
        facetQuery.setPageRequest(pageable);
        if(Objects.nonNull(search.getSort())) {
            facetQuery.addSort(buildSorts(search));
        }

        return solrTemplate.queryForFacetPage(COLLECTION, facetQuery, Product.class);
    }

    private void addFilters(FacetDTO facet, SimpleFacetQuery facetQuery) {
        if (Objects.nonNull(facet)) {
            if (Objects.nonNull(facet.getPrice())) {
                facetQuery.addFilterQuery(new SimpleQuery(new Criteria(buildFq(PRICE_FIELD_NAME))
                        .between(facet.getPrice().getFrom(), facet.getPrice().getTo())));
            }
            if (Objects.nonNull(facet.getCategory())) {
                facetQuery.addFilterQuery(
                        new SimpleQuery(new Criteria(buildFq(SECTION_TITLE_FIELD_NAME)).in(facet.getCategory())));
            }
            if (Objects.nonNull(facet.getBrand())) {
                facetQuery.addFilterQuery(
                        new SimpleQuery(new Criteria(buildFq(MANUFACTURER_FIELD_NAME)).in(facet.getBrand())));
            }
        }
    }
    
    private Sort buildSorts(SearchCriteria search) {
        Order order = null;
        if(SortEnum.isAsc(search.getSort().getOrder())) {
            order = Order.asc(PRICE_FIELD_NAME);
        } else {
            order = Order.desc(PRICE_FIELD_NAME);
        }
        return Sort.by(order);
    }

    private FacetOptions bulidFacetOnFields() {
        FacetOptions facetOpts = new FacetOptions();
        facetOpts.addFacetOnField(facetField(SECTION_TITLE_FIELD_NAME));
        facetOpts.addFacetOnField(facetField(MANUFACTURER_FIELD_NAME));
        return facetOpts;
    }

    private String buildFq(String name) {
        return String.format("{!tag=%s}%s", name, name);
    }

    private String facetField(String name) {
        return String.format("{!ex=%s}%s", name, name);
    }

}
