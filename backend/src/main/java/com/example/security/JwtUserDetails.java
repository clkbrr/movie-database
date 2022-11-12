package com.example.security;

import com.example.model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
public class JwtUserDetails implements UserDetails {
    private long id;

    private String username;

    private String password;

    private String email;

    private Collection<? extends GrantedAuthority> authorities;

    public static JwtUserDetails create(UserModel user) {
        List<GrantedAuthority> authoritiesList = new ArrayList<>();

        authoritiesList.add(new SimpleGrantedAuthority("user"));
        return new JwtUserDetails(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), authoritiesList);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
