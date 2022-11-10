package com.example.service;

import com.example.Ddto.UserCommentDto;
import com.example.model.UserModel;
import com.example.repository.UserRepo;
import com.example.security.JwtUserDetails;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserModelService implements UserDetailsService {

    @Autowired
    public UserRepo userRepo;

    public boolean registerUser(String username, String password, String email, String avatar) {
        if (username != null && password != null) {
            UserModel userModel = new UserModel();

            userModel.setUsername(username);
            userModel.setPassword(password);
            userModel.setEmail(email);
            userModel.setAvatar(avatar);
            boolean userCreated = userRepo.save(userModel);
            if (userCreated)
            {
                //return userRepo.createUserFavouriteTable(userModel);
                return true;
            }
            else {
                return false;
            }
        }

        else {
            return false;
        }
    }

    public UserModel findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public boolean postAvatar(String username, String avatar) {
        return  userRepo.postAvatar(username, avatar);
    }

    public List<com.example.model.UserDetails> getUserDetails(String username) {
        return userRepo.getUserDetails(username);
    }

    public List<UserCommentDto> getUserComments(String username) {

        return userRepo.getUserComments(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = userRepo.findByUsername(username);
        return JwtUserDetails.create(user);
    }
}
