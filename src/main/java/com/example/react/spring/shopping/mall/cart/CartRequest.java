package com.example.react.spring.shopping.mall.cart;

import java.util.List;
import lombok.Data;

@Data
public class CartRequest {
    private String memberId;
    private List<CartData> data;

    @Data
    public static class CartData {
        private Integer fruitId;
        private String fruitName;
        private Integer price;
        private Integer count;
        private Integer totalPrice;
        private String fruitImage;
    }

}
