package com.example.react.spring.shopping.mall.member;

import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<MemberDTO> selectMemberInfo(Integer memberId) {

        return memberRepository.selectMemberInfo(memberId);
    }

    public void memberRegister(Member member, Map<String, String> data) {
        String password = passwordEncoder.encode(data.get("password"));

        member.setMemberId(data.get("username"));
        member.setMemberPw(password);
        member.setMemberName(data.get("name"));
        member.setMemberPhoneNumber(data.get("phoneNumber"));
        member.setMemberEmail(data.get("email"));
        member.setMemberAdress(data.get("adress"));
        member.setMemberDetailAdress(data.get("detailAdress"));
        member.setMemberRole("ROLE_USER");

        memberRepository.save(member);
    }
}
