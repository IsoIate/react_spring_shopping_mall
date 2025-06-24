package com.example.react.spring.shopping.mall.review;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query(value = """
            select
                a.*,  b.member_name as author
            from
                review a
            join
            (
                select * from member
            ) b
            on a.member_id = b.id
            where
                fruit_id = ?1
                        """, nativeQuery = true)
    List<ReviewDTO> selectReviewByFruitId(Integer fruitId);
}
