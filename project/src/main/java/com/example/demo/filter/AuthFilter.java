package com.example.demo.filter;

import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebFilter("/*")
public class AuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        String path = request.getRequestURI();

        // 白名單（不需要登入）
        if (path.equals("/login") || path.startsWith("/check-login")) {
            chain.doFilter(req, res);
            return;
        }

        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("userCert") != null) {
            chain.doFilter(req, res); // 放行
        } else {
            // ❗未登入，回傳 401
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"status\":401, \"message\":\"未登入\"}");
        }
    }
}
