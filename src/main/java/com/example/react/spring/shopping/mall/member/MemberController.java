package com.example.react.spring.shopping.mall.member;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity register(Member member, @RequestBody Map<String, String> data) {

        memberService.memberRegister(member, data);

        return ResponseEntity.ok("regist success");
    }
}
