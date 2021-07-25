package com.ms.acl.repository;

import com.ms.acl.entity.Menu;
import com.ms.acl.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServicoRepository extends JpaRepository<Menu, Long> {
	
	@Query(value = "SELECT u FROM Servico u where flgAtivo is true")
	public List<Servico> all();

}
