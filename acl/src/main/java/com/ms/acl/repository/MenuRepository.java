package com.ms.acl.repository;

import com.ms.acl.entity.Menu;
import com.ms.acl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {

	@Query(value = "SELECT u FROM Menu u where flgAtivo is true")
	public List<Menu> all();

	@Query(
			value = "select \n" +
						"m.*" +
					"from \n" +
						"acl.user u \n" +
						"join acl.user_group ug on u.id=ug.id_user\n" +
						"join acl.group g on g.id=ug.id_group \n" +
						"join acl.group_menu gm on gm.id_group=g.id\n" +
						"join acl.menu m on m.id=gm.id_menu \n" +
					"where\n" +
						"u.flg_ativo \n" +
						"and ug.flg_ativo \n" +
						"and g.flg_ativo \n" +
						"and gm.flg_ativo \n" +
						"and m.flg_ativo \n" +
					    "and u.flg_ativo \n" +
						"and cast(u.uuid as text)=:uuid",
			nativeQuery = true)
	public List<Menu> getMenuWithPermission(@Param("uuid") String uuid);

}
