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

}
