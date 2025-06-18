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
//    public String getURL (@RequestParam String filename) {
    public ResponseEntity<Map<String, String>> getPresignedUrls(@RequestParam String filename) {

        System.out.println("sdf");

        String encodedName = URLDecoder.decode(filename, StandardCharsets.UTF_8);
        String putUrl = s3Service.createPresignedPutUrl(encodedName);
        String getUrl = s3Service.createPresignedGetUrl(encodedName);

        Map<String, String> result = new HashMap<>();
        result.put("putUrl", putUrl);
        result.put("getUrl", getUrl);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/fruitList")
    @ResponseBody
    public ResponseEntity<List> fruitList (Model model) {
        return ResponseEntity.ok(fruitService.selectFruitList());
    }

    @GetMapping("/detail/{id}")
    @ResponseBody
    public ResponseEntity fruitDetailData (@PathVariable Integer id, Model model) {
        model.addAttribute("fruitData", fruitService.selectFruitDetail(id));
        return ResponseEntity.ok(fruitService.selectFruitDetail(id));
    }

    @PostMapping("/fruitInsert")
    public ResponseEntity fruitInsert (Fruit fruit, @RequestBody Map<String, String> data){

        fruitService.fruitInsert(fruit, data);

        return ResponseEntity.ok("insert success");
    }

}
