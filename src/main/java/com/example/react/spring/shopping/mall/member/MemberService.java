package com.example.react.spring.shopping.mall.member;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void memberRegister(Member member, Map<String, String> data) {
        String password = passwordEncoder.encode(data.get("memberPw"));

        member.setMemberId(data.get("memberId"));
        member.setMemberPw(password);

        memberRepository.save(member);
    }
}
