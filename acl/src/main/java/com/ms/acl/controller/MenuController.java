package com.ms.acl.controller;

import com.ms.acl.api.dto.MenuDTO;
import com.ms.acl.api.dto.UserDTO;
import com.ms.acl.constant.SecurityConstants;
import com.ms.acl.entity.Menu;
import com.ms.acl.entity.User;
import com.ms.acl.exception.RegraNegocioException;
import com.ms.acl.security.JwtManager;
import com.ms.acl.service.MenuService;
import com.ms.acl.service.UserService;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

	@Autowired
	private final MenuService service;

	@GetMapping
	public ResponseEntity<List<MenuDTO>> get(@RequestParam String token) {

		Claims claims = new JwtManager().parseToken(token);
		String uuid = claims.getSubject();
		List<String> roles = (List<String>) claims.get(SecurityConstants.JWT_ROLE_KEY);
		
		List<Menu> lista = service.getMenuWithPermission(uuid);
		
		List<MenuDTO> listaDTO = lista.stream().map(MenuDTO::converter).collect(Collectors.toList());
		
		return ResponseEntity.ok(listaDTO);
		
	}

}
