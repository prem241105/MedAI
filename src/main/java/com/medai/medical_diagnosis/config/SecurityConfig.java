package com.medai.medical_diagnosis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

                http
                                .cors(org.springframework.security.config.Customizer.withDefaults())
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/api/register", "/error", "/h2-console/**")
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .headers(headers -> headers.frameOptions(frame -> frame.disable()))
                                .formLogin(form -> form
                                                .loginProcessingUrl("/login")
                                                .successHandler((request, response, authentication) -> {
                                                        response.setStatus(200);
                                                        response.getWriter().write("{\"message\":\"success\"}");
                                                })
                                                .failureHandler((request, response, exception) -> {
                                                        response.setStatus(401);
                                                        response.getWriter().write("{\"error\":\"unauthorized\"}");
                                                })
                                                .permitAll())
                                .logout(logout -> logout
                                                .logoutSuccessHandler((request, response, authentication) -> {
                                                        response.setStatus(200);
                                                        response.getWriter().write("{\"message\":\"success\"}");
                                                })
                                                .permitAll());

                return http.build();
        }
}
