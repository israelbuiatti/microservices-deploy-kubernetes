package com.ms.acl.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.acl.entity.User;
import com.ms.acl.repository.UserRepository;
import com.ms.acl.service.UserService;
import com.ms.acl.util.HashUtil;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
	
	private UserRepository repository;
	
	public UserServiceImpl(UserRepository repository) {
		super();
		this.repository = repository;
	}
	
	@Override
	@Transactional
	public User save(User user) {
		user.setPassword(HashUtil.getSecureHash(user.getPassword()));
		return repository.save(user);

	}
	
	@Override
	@Transactional
	public User update(User user) {
		return repository.save(user);
	}
	
	@Override
	@Transactional
	public User delete(Long id) {
		
		User user = repository.getOne(id);
		user.setFlgAtivo(false);
		return repository.save(user);
	}

	@Override
	public List<User> all() {
		return repository.all();
	}
	
	public User login(String username, String password) {
		password = HashUtil.getSecureHash(password);
		
		User user = repository.findByUsernameAndPassword(username, password);
		return user;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> result = repository.findByUsername(username);
		
		if(!result.isPresent()) throw new UsernameNotFoundException("Dosen't exist user with email = " + username);
		
		User user = result.get();
		
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		
//		authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
		
		org.springframework.security.core.userdetails.User userSpring = new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
		
		return userSpring;
	}


}
