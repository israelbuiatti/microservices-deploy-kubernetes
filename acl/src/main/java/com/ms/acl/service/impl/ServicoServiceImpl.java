package com.ms.acl.service.impl;

import com.ms.acl.entity.Menu;
import com.ms.acl.entity.Servico;
import com.ms.acl.repository.MenuRepository;
import com.ms.acl.repository.ServicoRepository;
import com.ms.acl.service.MenuService;
import com.ms.acl.service.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoServiceImpl implements ServicoService {

	@Autowired
	private ServicoRepository repository;

	@Override
	public List<Servico> all() {
		return repository.all();
	}

}
