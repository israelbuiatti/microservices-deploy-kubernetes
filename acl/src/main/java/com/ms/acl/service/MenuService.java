package com.ms.acl.service;

import com.ms.acl.entity.Menu;
import com.ms.acl.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface MenuService {

	List<Menu> all();

	List<Menu> getMenuWithPermission(String id);
	
}
