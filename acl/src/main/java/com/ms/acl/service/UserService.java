package com.ms.acl.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import com.ms.acl.entity.User;

public interface UserService {

	List<User> all();
	User save(User usuario);
	User update(User usuario);
	User delete(Long id);
	User login(String username, String password);
	User login(String username);
	UserDetails loadUserByUsername(String username);
	
}
