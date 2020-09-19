package com.app.product.repository;

import static com.app.product.service.SearchableProductDefinition.*;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.solr.core.query.result.FacetPage;
import org.springframework.data.solr.core.query.result.HighlightPage;
import org.springframework.data.solr.repository.Boost;
import org.springframework.data.solr.repository.Facet;
import org.springframework.data.solr.repository.Highlight;
import org.springframework.data.solr.repository.Query;
import org.springframework.data.solr.repository.SolrCrudRepository;

import com.app.product.model.Product;

public interface ProductRepository extends SolrCrudRepository<Product, Long> {

    //@Highlight(prefix = "<b>", postfix = "</b>")
//    @Query(fields = { ID_FIELD_NAME, NAME_FIELD_NAME, PRICE_FIELD_NAME, DESC_FIELD_NAME, MANUFACTURER_FIELD_NAME,
//            SECTION_TITLE_FIELD_NAME }, defaultOperator = Operator.AND)
    //HighlightPage<Product> findByNameIn(Collection<String> names, Pageable page);
    
    @Facet(fields= {SECTION_TITLE_FIELD_NAME})
    FacetPage<Product> findByNameIn(Collection<String> names, Pageable page);

    @Facet(fields = { NAME_FIELD_NAME } )
    FacetPage<Product> findByNameStartsWith(Collection<String> nameFragments, Pageable pagebale);

    Page<Product> findByName(@Boost(1) String name, Pageable pageable);

}
