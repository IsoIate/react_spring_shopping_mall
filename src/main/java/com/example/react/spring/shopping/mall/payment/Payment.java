package com.example.react.spring.shopping.mall.payment;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer samePaymentId;
    private Integer memberId;
    private Integer fruitId;
    private String fruitName;
    private Integer count;
    private Integer totalPrice;
    @Column(columnDefinition = "TEXT")
    private String fruitImage;
    private String username;
    private String phoneNumber;
    private String adress;
    private String adressDetail;
}
