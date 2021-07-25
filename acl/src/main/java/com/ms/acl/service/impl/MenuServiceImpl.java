package com.ms.acl.service.impl;

import com.ms.acl.entity.Menu;
import com.ms.acl.entity.User;
import com.ms.acl.repository.MenuRepository;
import com.ms.acl.repository.UserRepository;
import com.ms.acl.service.MenuService;
import com.ms.acl.service.UserService;
import com.ms.acl.util.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	private MenuRepository repository;

	@Override
	public List<Menu> all() {
		return repository.all();
	}

}
