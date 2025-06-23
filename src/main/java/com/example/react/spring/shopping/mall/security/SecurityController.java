package com.example.react.spring.shopping.mall.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import com.example.react.spring.shopping.mall.member.Member;
import com.example.react.spring.shopping.mall.security.CustomUserDetailsService;

@RestController
// @RequestMapping("/api/auth")
@RequiredArgsConstructor
public class SecurityController {

    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request, HttpServletRequest httpRequest) {
        Map<String, String> result = new HashMap<String, String>();

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getMemberId(),
                            request.getMemberPw()));

            // 인증 성공하면 세션에 저장됨
            SecurityContextHolder.getContext().setAuthentication(auth);
            httpRequest.getSession(); // 세션 생성됨

            CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
            Integer id = userDetails.getId();
            String memberName = userDetails.getMemberName();

            result.put("id", Integer.toString(id));
            result.put("memberName", memberName);

            return ResponseEntity.ok(result);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // ✅ 서버 세션 제거
        }

        // JSESSIONID 쿠키 삭제
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0); // 즉시 만료
        response.addCookie(cookie);

        return ResponseEntity.ok("로그아웃 완료");
    }
}
