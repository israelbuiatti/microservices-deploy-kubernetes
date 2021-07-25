package com.ms.acl.controller;

import com.ms.acl.api.dto.HealthDTO;
import com.ms.acl.api.dto.MenuDTO;
import com.ms.acl.entity.Menu;
import com.ms.acl.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/health")
public class HealthController {


	@GetMapping
	public ResponseEntity<HealthDTO> get() {

		HealthDTO health = new HealthDTO();
		
		return ResponseEntity.ok(health);
		
	}

}
