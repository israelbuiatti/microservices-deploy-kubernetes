package com.ms.acl.repository;

import com.ms.acl.entity.Menu;
import com.ms.acl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {
	
	@Query(value = "SELECT u FROM Menu u where flgAtivo is true")
	public List<Menu> all();

}
