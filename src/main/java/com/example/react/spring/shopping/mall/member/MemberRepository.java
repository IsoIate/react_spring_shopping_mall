package com.example.react.spring.shopping.mall.member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByMemberId(String memberId);
}
