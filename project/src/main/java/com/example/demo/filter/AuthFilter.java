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

	    // 加入 CORS header
	    response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
	    response.setHeader("Access-Control-Allow-Credentials", "true");
	    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	    // 放行預檢請求
	    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
	        response.setStatus(HttpServletResponse.SC_OK);
	        return;
	    }

	    String path = request.getRequestURI();

	    if (path.equals("/login") || path.startsWith("/check-login")) {
	        chain.doFilter(req, res);
	        return;
	    }

	    HttpSession session = request.getSession(false);
	    if (session != null && session.getAttribute("userCert") != null) {
	        chain.doFilter(req, res); // 放行
	    } else {
	        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	        response.setContentType("application/json");
	        response.getWriter().write("{\"status\":401, \"message\":\"未登入\"}");
	    }
	}
}
