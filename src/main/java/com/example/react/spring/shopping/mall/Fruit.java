package com.example.react.spring.shopping.mall;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@ToString
public class Fruit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fruitId;
    private String fruitName;
    private Integer price;
    private Integer quantity;
    private String info;
    @Column(columnDefinition = "TEXT")
    private String detailInfo;
    @Column(columnDefinition = "TEXT")
    private String fruitImage;
}
