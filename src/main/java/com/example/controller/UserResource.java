package com.example.controller;

import com.example.Ddto.AvatarDto;
import com.example.Ddto.LoginDto;
import com.example.Ddto.UserCommentDto;
import com.example.model.Favourite;
import com.example.model.UserDetails;
import com.example.model.UserModel;
import com.example.response.AuthResponse;
import com.example.security.JwtTokenProvider;
import com.example.service.UserModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:8000")
@RestController
@RequestMapping(value = "user")
public class UserResource {

    @Autowired
    public UserModelService userModelService;

    @Autowired
    public AuthenticationManager authenticationManager;

    @Autowired
    public JwtTokenProvider jwtTokenProvider;

    @Autowired
    public PasswordEncoder passwordEncoder;

    //@Autowired
   // public SessionRegistry sessionRegistry;

    @Autowired
    public static String currentUser;
    @Autowired
    public static long currentUserId;


    @PostMapping(path = "register", consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:8000")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody UserModel userModel) {
        AuthResponse authResponse = new AuthResponse();

        String hashedPassword = passwordEncoder.encode(userModel.getPassword());
        boolean isRegistered = userModelService.registerUser(userModel.getUsername(), hashedPassword, userModel.getEmail(), userModel.getAvatar());
        // localhost:8080/user/register
        if (isRegistered) {
             authResponse.setMessage(userModel.getUsername() + " adli kullanici basariyla olusturuldu");
             return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
        }
        else {
            authResponse.setMessage("Kullanici eklenemedi");
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "login", consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:8000")
    public AuthResponse findByUsernameAndPassword(@RequestBody LoginDto loginDto) {
        // localhost:8080/user/login
        UsernamePasswordAuthenticationToken authenticationToken
        = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword());

        Authentication auth = authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwtToken = jwtTokenProvider.generateJwtToken(auth);

        UserModel user = userModelService.findByUsername(loginDto.getUsername());

        currentUser = auth.getPrincipal().toString();

        currentUserId = user.getId();

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Bearer " + jwtToken);
        authResponse.setUserId(user.getId());
        authResponse.setPassword(user.getPassword());
        authResponse.setAvatar(user.getAvatar());
        return authResponse;
    }

    @GetMapping(path = "findbyusername/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:8000")
    public UserModel findByUsername(@PathVariable String username) {
        // localhost:8080/user/findbyusername/mircolak
        return userModelService.findByUsername(username);
    }
    
    @CrossOrigin(origins = "http://locahost:8000")
    @PostMapping(path = "postAvatar", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postAvatar(@RequestBody AvatarDto avatarDto) {
        boolean isSaved = userModelService.postAvatar(avatarDto.getUsername(), avatarDto.getAvatar());
        // localhost:8080/user/postAvatar
        if (isSaved) {
            return ResponseEntity.status(HttpStatus.OK).body("Avatar basariyla eklendi");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Avatar eklenemedi");
        }
    }

    @GetMapping(path = "getuserdetails/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:8000")
    public ArrayList<UserDetails> getUserDetails(@PathVariable String username) {
        // localhost:8080/user/getuserdetails/mircolak
        return (ArrayList<UserDetails>) userModelService.getUserDetails(username);
    }

    @GetMapping(path = "getusercomments/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:8000")
    public ArrayList<UserCommentDto> getUserComments(@PathVariable String username) {
        // localhost:8080/user/getusercomments/mircolak
        return (ArrayList<UserCommentDto>) userModelService.getUserComments(username);
    }
}
