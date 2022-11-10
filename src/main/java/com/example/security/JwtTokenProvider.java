package com.example.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${movie-database.app.secret}")
    private String APP_SECRET;

    @Value("${movie-database.expires.in}")
    private long EXPIRES_IN;

    public String generateJwtToken(Authentication auth) {
        JwtUserDetails userDetails = (JwtUserDetails) auth.getPrincipal(); // Auth edeceğimiz user (principal)
        Date expireDate = new Date(new Date().getTime() + EXPIRES_IN);

        // Tokeni olusturyoruz
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, APP_SECRET).compact();
    }

    // Sifreyi geri cöz
    public String getUsernameFromJwt(String token) {
        Claims claims = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token).getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token);
            return !isTokenExpired(token);
        }catch (SignatureException e) {
            return false;

        } catch (MalformedJwtException e) {
            return false;

        }catch (ExpiredJwtException e) {
            return false;

        }catch (UnsupportedJwtException e) {
            return false;

        }catch (IllegalArgumentException e) {
            return false;

        }
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }
}
