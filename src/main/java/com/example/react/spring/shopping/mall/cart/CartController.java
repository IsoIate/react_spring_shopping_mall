package com.example.react.spring.shopping.mall.cart;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/cartList")
    public ResponseEntity<List> selectCartList() {
        return ResponseEntity.ok(cartService.selectCartList());
    }

    @PostMapping("/insertCart")
    public ResponseEntity insertCart(Cart cart, @RequestBody Map<String, Integer> data) {

        cartService.insertCart(cart, data);
        return ResponseEntity.ok("insert success");
    }
}
