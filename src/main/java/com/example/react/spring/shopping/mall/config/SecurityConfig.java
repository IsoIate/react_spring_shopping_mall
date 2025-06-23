package com.example.react.spring.shopping.mall.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF는 비활성화 (API 방식에서는 보통 비활성화함)
                .cors(Customizer.withDefaults()) // ✅ CORS 설정 활성화
                .formLogin(form -> form.disable()) // ✅ 자동 로그인 페이지 비활성화
                .httpBasic(basic -> basic.disable()) // ✅ 기본 인증 비활성화
                .logout(logout -> logout.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // 세션 방식
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll()
                        // .requestMatchers("/api/auth/**").permitAll() // 로그인, 회원가입 API는 모두 허용
                        .anyRequest().authenticated() // 나머지는 인증 필요
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}