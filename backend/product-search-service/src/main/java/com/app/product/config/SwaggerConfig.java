package com.app.product.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    public static final String DESCRIPTION = "Api documentation.";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().components(securityComponents())
                .info(new Info().title("Solr Test App").version("1.0").description(DESCRIPTION));
    }

    protected Components securityComponents() {
        return new Components()
                .addSecuritySchemes("basicScheme",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("basic").bearerFormat("BASIC"))
                .addSecuritySchemes("bearerScheme",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"));
    }

}
