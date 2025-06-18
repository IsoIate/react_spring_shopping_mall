package com.example.react.spring.shopping.mall.review;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;
    private Integer memberId;
    @Column(columnDefinition = "TEXT")
    private String review;
    private String reviewDate;
}
