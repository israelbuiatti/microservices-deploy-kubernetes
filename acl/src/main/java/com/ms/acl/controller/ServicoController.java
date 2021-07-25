package com.ms.acl.controller;

import com.ms.acl.api.dto.MenuDTO;
import com.ms.acl.api.dto.ServicoDTO;
import com.ms.acl.entity.Menu;
import com.ms.acl.entity.Servico;
import com.ms.acl.service.MenuService;
import com.ms.acl.service.ServicoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/servicos")
@RequiredArgsConstructor
public class ServicoController {

	@Autowired
	private final ServicoService service;

	@GetMapping
	public ResponseEntity<List<ServicoDTO>> get() {
		
		List<Servico> lista = service.all();
		
		List<ServicoDTO> listaDTO = lista.stream().map(n -> ServicoDTO.converter(n) ).collect(Collectors.toList());
		
		return ResponseEntity.ok(listaDTO);
		
	}

}
