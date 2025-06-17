package com.example.react.spring.shopping.mall.main;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//@Controller
//@RequiredArgsConstructor
@RestController
//@CrossOrigin
public class MainController {

    @GetMapping("/")
    public String mainPage() {

        System.out.println("zzz");

        return "/frontend/src/index.html";
    }

    @GetMapping("/api/temp")
    public String temp (Model model) {

        System.out.println("555");
        model.addAttribute("data", "123");

        return "hello";
    }

    @GetMapping("/temp")
    public String temp2 () {

        System.out.println("555");

        return "hello";
    }
}
