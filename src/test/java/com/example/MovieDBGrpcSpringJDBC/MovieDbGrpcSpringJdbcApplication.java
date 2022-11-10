package com.example.MovieDBGrpcSpringJDBC;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;


@SpringBootApplication
public class MovieDbGrpcSpringJdbcApplication {

    public static void main(String[] args) throws IOException, InterruptedException {
	SpringApplication.run(MovieDbGrpcSpringJdbcApplication.class, args);

        /*Server server = ServerBuilder.forPort(7575)
                .addService(new LitService())
                .build();
        server.start();
        server.awaitTermination();*/
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }
}
