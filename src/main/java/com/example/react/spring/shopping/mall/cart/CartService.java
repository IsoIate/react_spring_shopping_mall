package com.example.react.spring.shopping.mall.cart;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public List<Cart> selectCartList() {

        List<Cart> result = cartRepository.selectCartList();

        return result;
    }

    public void insertCart(Cart cart, Map<String, Integer> data) {

        cart.setFruitId(data.get("fruitId"));
        cart.setMemberId(data.get("memberId"));
        cart.setFruitQuantity(data.get("fruitQuantity"));

        cartRepository.save(cart);
    }
}
