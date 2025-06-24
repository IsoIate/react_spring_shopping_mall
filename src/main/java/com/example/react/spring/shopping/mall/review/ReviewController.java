package com.example.react.spring.shopping.mall.review;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/selectReview/{id}")
    public ResponseEntity reviewList(@PathVariable Integer id) {
        return ResponseEntity.ok(reviewService.selectReviewList(id));
    }

    @PostMapping("/insertReview")
    public ResponseEntity insertReview(Review review, @RequestBody Map<String, String> data) {

        reviewService.insertReview(review, data);

        return ResponseEntity.ok("리뷰작성 완료");
    }
}
