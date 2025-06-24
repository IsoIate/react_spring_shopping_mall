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

    public List<CartDTO> selectCartList(Integer id) {
        List<CartDTO> result = cartRepository.selectCartList(id);

        return result;
    }

    public void insertCart(Cart cart, Map<String, Integer> data) {

        cart.setFruitId(data.get("fruitId"));
        cart.setMemberId(data.get("memberId"));
        cart.setFruitQuantity(data.get("fruitQuantity"));

        cartRepository.save(cart);
    }

    @Transactional
    public void updateCartItem(CartRequest data) {
        List<CartRequest.CartData> dataList = data.getData();

        for (CartRequest.CartData item : dataList) {
            Cart cart = new Cart();
            cart.setFruitId(item.getFruitId());
            cart.setFruitQuantity(item.getCount());
            cart.setMemberId(Integer.parseInt(data.getMemberId()));

            cartRepository.save(cart);
        }
    }

    public Integer deleteCartItemByMemberId(Integer memberId) {

        return cartRepository.deleteByMemberId(memberId);
    }

    public Integer deleteCartItem(Cart cart, Map<String, Integer> data) {
        Integer fruitId = data.get("fruitId");
        Integer memberId = data.get("memberId");

        return cartRepository.deleteCartItem(fruitId, memberId);
    }
}
