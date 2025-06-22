package com.example.react.spring.shopping.mall.cart;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public List<CartDTO> selectCartList() {
        Integer memberId = 1;

        List<CartDTO> result = cartRepository.selectCartList(memberId);

        return result;
    }

    public void insertCart(Cart cart, Map<String, Integer> data) {

        cart.setFruitId(data.get("fruitId"));
        cart.setMemberId(data.get("memberId"));
        cart.setFruitQuantity(data.get("fruitQuantity"));

        // 추후 같은 과일 ID를 가진 값이 들어오면 insert 대신 update하는 쿼리로 수정 필요
        cartRepository.save(cart);
    }

    @Transactional
    public void updateCartItem(Cart cart, List<Map<String, String>> data) {
        Integer cartId = 0;
        Integer count = 0;

        for (int i = 0; i < data.size(); i++) {
            cartId = Integer.parseInt(data.get(i).get("cartId"));
            count = Integer.parseInt(data.get(i).get("count"));

            cartRepository.updateCartItem(cartId, count);
        }
    }

    public Integer deleteCartItem(Cart cart, Map<String, Integer> data) {
        Integer fruitId = data.get("fruitId");
        Integer memberId = data.get("memberId");

        return cartRepository.deleteCartItem(fruitId, memberId);
    }
}
