package com.app.cxsearch.dto.request;

import lombok.Data;

@Data
public class FacetDTO {

    private String[] brand;
    private String[] category;
    private PriceRange price;
}
