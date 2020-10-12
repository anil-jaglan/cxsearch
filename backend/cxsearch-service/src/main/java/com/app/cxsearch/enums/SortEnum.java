package com.app.cxsearch.enums;

import java.util.stream.Stream;

public enum SortEnum {

    ASC("asc"), DESC("desc");

    private String name;

    private SortEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static SortEnum from(String str) {
        return Stream.of(SortEnum.values())
                .filter(o -> o.getName().equalsIgnoreCase(str))
                .findFirst()
                .orElse(SortEnum.ASC);
    }

    public static boolean isAsc(String str) {
        return SortEnum.ASC == from(str);
    }

}
