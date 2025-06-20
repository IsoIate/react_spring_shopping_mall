package com.example.react.spring.shopping.mall;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Fruit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fruitId;
    private String fruitName;
    private Integer price;
    private Integer quantity;
    private String unit;
    @Column(columnDefinition = "TEXT")
    private String detailInfo;
    @Column(columnDefinition = "TEXT")
    private String fruitImage;
    @CreatedDate
    private LocalDateTime insertDate;

}
