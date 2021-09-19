package com.ms.acl.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.ms.acl.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.acl.api.dto.UserLoginResponsedto;
import com.ms.acl.api.dto.UserLogindto;
import com.ms.acl.security.JwtManager;
import com.ms.acl.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {

	@Autowired
	private JwtManager jwtManager;

	@Autowired
	private AuthenticationManager authManager;

	private final UserService service;

	@PostMapping
	public ResponseEntity<UserLoginResponsedto> login(@RequestBody @Valid UserLogindto userLogin) {

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userLogin.getUsername(),
				userLogin.getPassword());
		Authentication auth = authManager.authenticate(token);

		SecurityContextHolder.getContext().setAuthentication(auth);

		org.springframework.security.core.userdetails.User userSpring = (org.springframework.security.core.userdetails.User) auth
				.getPrincipal();

		List<String> roles = userSpring.getAuthorities()
								.stream().map(authority -> authority.getAuthority())
				.collect(Collectors.toList());

		User user = service.login(userSpring.getUsername());

		return ResponseEntity.ok(jwtManager.createToken(user, roles));

	}

}
