package com.example.react.spring.shopping.mall;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@Controller
//@RequiredArgsConstructor
@RestController
@RequiredArgsConstructor
public class FruitController {

    private final FruitService fruitService;
    private final S3Service s3Service;

    @GetMapping("/presigned-url")
    // public String getURL (@RequestParam String filename) {
    public ResponseEntity<Map<String, String>> getPresignedUrls(@RequestParam String filename) {

        String encodedName = URLDecoder.decode(filename, StandardCharsets.UTF_8);
        String putUrl = s3Service.createPresignedPutUrl(encodedName);
        String getUrl = s3Service.createPresignedGetUrl(encodedName);

        Map<String, String> result = new HashMap<>();
        result.put("putUrl", putUrl);
        result.put("getUrl", getUrl);

        return ResponseEntity.ok(result);
    }

    // 과일 분류별 조회
    @GetMapping("/fruitList/{id}")
    @ResponseBody
    public ResponseEntity<List> fruitList(@PathVariable Integer id) {
        return ResponseEntity.ok(fruitService.selectFruitListByGroup(id));
    }

    // 판매량별 조회
    @GetMapping("/bestFruitList/main")
    @ResponseBody
    public ResponseEntity<List> selectBestFruitListLimit() {
        return ResponseEntity.ok(fruitService.selectBestFruitListLimit());
    }

    @GetMapping("/bestFruitList/best")
    @ResponseBody
    public ResponseEntity<List> bestFruitList() {
        return ResponseEntity.ok(fruitService.selectBestFruitList());
    }

    // 신상품 조회
    @GetMapping("/newProductsList")
    @ResponseBody
    public ResponseEntity<List> newProductsList() {
        return ResponseEntity.ok(fruitService.selectNewProductList());
    }

    @GetMapping("/newFruitList")
    @ResponseBody
    public ResponseEntity<List> newFruitList() {
        return ResponseEntity.ok(fruitService.selectNewFruitList());
    }

    // 과일 상세페이지
    @GetMapping("/detail/{id}")
    @ResponseBody
    public ResponseEntity fruitDetailData(@PathVariable Integer id, Model model) {
        model.addAttribute("fruitData", fruitService.selectFruitDetail(id));
        return ResponseEntity.ok(fruitService.selectFruitDetail(id));
    }

    // 과일 등록
    @PostMapping("/fruitInsert")
    public ResponseEntity fruitInsert(Fruit fruit, @RequestBody Map<String, String> data) {

        fruitService.fruitInsert(fruit, data);

        return ResponseEntity.ok("insert success");
    }

}
