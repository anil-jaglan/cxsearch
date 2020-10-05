package com.app.cxsearch.model;

import org.apache.solr.client.solrj.beans.Field;
import org.springframework.data.annotation.Id;
import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.Score;
import org.springframework.data.solr.core.mapping.SolrDocument;

import com.app.cxsearch.service.SearchableProductDefinition;

import lombok.Data;

@Data
@SolrDocument(collection = "product")
public class Product implements SearchableProductDefinition {

    private @Id @Indexed(ID_FIELD_NAME) Long id;
    private @Indexed(NAME_FIELD_NAME) String name;
    private @Indexed(CODE_FIELD_NAME) String code;
    private @Indexed(DESC_FIELD_NAME) String desc;
    private @Field(IMAGE_FIELD_NAME) String image;
    private @Indexed(PRICE_FIELD_NAME) Float price;
    private @Score Float score;
    private @Indexed(CATALOG_ID_FIELD_NAME) Long catalogId;

    private @Indexed(MANUFACTURER_FIELD_NAME) String mfrName;
    private @Indexed(MERCHANT_ID_FIELD_NAME) Long merchantId;
    private @Indexed(SUPPLIER_SKU_FIELD_NAME) String supplierSku;
    private @Indexed(SECTION_ID_FIELD_NAME) Long sectionId;
    private @Indexed(SECTION_TITLE_FIELD_NAME) String sectionTitle;

}
