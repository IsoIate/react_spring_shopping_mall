package com.example.react.spring.shopping.mall.member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByMemberId(String memberId);

    @Query(value = "select * from member where id = ?1", nativeQuery = true)
    Optional<MemberDTO> selectMemberInfo(Integer memberId);
}
