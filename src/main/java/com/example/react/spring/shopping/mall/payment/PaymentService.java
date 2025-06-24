package com.example.react.spring.shopping.mall.payment;

import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public void insertPayment(Payment payment, Map<String, String> data) {

        String uuid = UUID.randomUUID().toString();
        int samePaymentId = Math.abs(uuid.hashCode());

        // 동일 결제정보 확인용
        payment.setSamePaymentId(samePaymentId);

        System.out.println(data);

        // payment.setMemberId(Integer.parseInt(data.get("id")));
        // payment.setUsername(data.get("memberName"));
        // payment.setPhoneNumber(data.get("memberPhoneNumber"));
        // payment.setAdress(data.get("memberId"));
        // payment.setAdressDetail(data.get("memberId"));

        // payment.setFruitId(Integer.parseInt(data.get("memberId")));
        // payment.setFruitName(data.get("memberId"));
        // payment.setTotalPrice(Integer.parseInt(data.get("memberId")));
        // payment.setCount(Integer.parseInt(data.get("memberId")));
        // payment.setFruitImage(data.get("memberId"));

        // paymentRepository.save(payment);
    }

}
