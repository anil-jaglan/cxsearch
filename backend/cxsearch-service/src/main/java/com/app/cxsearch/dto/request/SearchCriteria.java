package com.app.cxsearch.dto.request;

import lombok.Data;

@Data
public class SearchCriteria {

    private String q;
    private FacetDTO facet;

}
