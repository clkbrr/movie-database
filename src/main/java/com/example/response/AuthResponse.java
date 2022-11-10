package com.example.response;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class AuthResponse {
    private String message;

    private long userId;

    private String password;

    private String avatar;
}
