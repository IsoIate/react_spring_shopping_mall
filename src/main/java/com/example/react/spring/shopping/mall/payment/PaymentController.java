package com.example.react.spring.shopping.mall.payment;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    // @PostMapping("/insertPayment")
    // public ResponseEntity insertPayment(Payment payment, @RequestBody Optional
    // data) {

    // // paymentService.insertPayment(payment, data);

    // return ResponseEntity.ok("결제정보 입력완료");
    // }
}
