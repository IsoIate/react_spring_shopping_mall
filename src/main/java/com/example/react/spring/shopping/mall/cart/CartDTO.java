package com.example.react.spring.shopping.mall.cart;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class CartDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fruitId;
    private String fruitName;
    private Integer price;
    private Integer count;
    private Integer totalPrice;
    @Column(columnDefinition = "TEXT")
    private String fruitImage;
}
