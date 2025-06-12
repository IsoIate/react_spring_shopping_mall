package com.example.react.spring.shopping.mall.main;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//@Controller
//@RequiredArgsConstructor
@RestController
public class MainController {

    @GetMapping("/")
    public String mainPage() {

        System.out.println("zzz");

        return "/frontend/src/index.html";
    }

    @GetMapping("/api/test")
    public String test () {

        System.out.println("123");

        return "hello";
    }
}
