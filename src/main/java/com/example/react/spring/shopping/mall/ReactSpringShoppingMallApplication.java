package com.example.react.spring.shopping.mall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ReactSpringShoppingMallApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReactSpringShoppingMallApplication.class, args);
	}

}
