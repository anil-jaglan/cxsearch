package com.app.cxsearch.dto.request;

import java.util.Objects;

import lombok.Data;

@Data
public class PriceRange {

    private Float from;
    private Float to;

    public Float getFrom() {
        return Objects.nonNull(from) ? from : new Float(0.f);
    }

    public Float getTo() {
        return Objects.nonNull(to) ? to : new Float(1000.f);
    }

}
