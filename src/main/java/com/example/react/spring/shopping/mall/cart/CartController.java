package com.example.react.spring.shopping.mall.cart;

import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/cartList/{id}")
    public ResponseEntity<List> selectCartList(@PathVariable Integer id) {
        return ResponseEntity.ok(cartService.selectCartList(id));
    }

    @PostMapping("/insertCart")
    public ResponseEntity insertCart(Cart cart, @RequestBody Map<String, Integer> data) {

        cartService.insertCart(cart, data);
        return ResponseEntity.ok("insert success");
    }

    @PostMapping("/updateCartItem")
    public ResponseEntity updateCartItem(@RequestBody CartRequest data) {
        cartService.deleteCartItemByMemberId(Integer.parseInt(data.getMemberId()));
        cartService.updateCartItem(data);

        return ResponseEntity.ok("update success");
    }

    @DeleteMapping("/deleteCartItem")
    public ResponseEntity deleteCartItem(Cart cart, @RequestBody Map<String, Integer> data) {

        Integer result = cartService.deleteCartItem(cart, data);

        if (result > 0)
            return ResponseEntity.ok("delete success");
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("parameter error, delete failed");
    }
}
