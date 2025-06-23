package com.example.react.spring.shopping.mall.security;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String memberId;
    private String memberPw;
}
