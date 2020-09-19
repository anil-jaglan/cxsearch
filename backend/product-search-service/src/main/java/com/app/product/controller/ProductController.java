package com.app.product.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.product.model.Product;
import com.app.product.service.ProductService;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping(value = "/v1/products/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Optional<Product> search(@PathVariable("id") Long id) {
        return productService.findById(id);
    }

    @PostMapping(value = "/v1/products/", produces = MediaType.APPLICATION_JSON_VALUE)
    public Product save(@RequestBody Product product) {
        return productService.save(product);
    }

}
