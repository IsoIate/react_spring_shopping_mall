package com.example.react.spring.shopping.mall.review;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public List<ReviewDTO> selectReviewList(Integer fruitId) {

        List<ReviewDTO> result = reviewRepository.selectReviewByFruitId(fruitId);

        return result;
    }

    public void insertReview(Review review, Map<String, String> data) {

        review.setMemberId(Integer.parseInt(data.get("memberId")));
        review.setFruitId(Integer.parseInt(data.get("fruitId")));
        review.setReview(data.get("review"));

        reviewRepository.save(review);
    }
}
