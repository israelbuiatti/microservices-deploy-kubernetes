package com.ms.acl.security;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ms.acl.entity.User;
import org.springframework.stereotype.Component;

import com.ms.acl.api.dto.UserLoginResponsedto;
import com.ms.acl.constant.SecurityConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtManager {

	public UserLoginResponsedto createToken(User user, List<String> roles) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, SecurityConstants.JWT_EXP_DAYS);

		Map<String, Object> claims = new HashMap<>();
		claims.put("id_vendedor", String.valueOf(user.getIdVendedor()));
		claims.put("username", user.getUsername());
		claims.put(SecurityConstants.JWT_ROLE_KEY, roles);
		
		String jwt = Jwts.builder()
						 .setSubject(user.getUuid().toString())
						 .setExpiration(calendar.getTime())
						 //.claim(SecurityConstants.JWT_ROLE_KEY, roles)
						 .addClaims(claims)
						 .signWith(SignatureAlgorithm.HS512, SecurityConstants.API_KEY.getBytes())
						 .compact();
		
		Long expireIn = calendar.getTimeInMillis();
		
		return new UserLoginResponsedto(jwt, expireIn, SecurityConstants.JWT_PROVIDER);
	}
	
	public Claims parseToken(String jwt) throws JwtException {
		Claims claims = Jwts.parser()
							.setSigningKey(SecurityConstants.API_KEY.getBytes())
							.parseClaimsJws(jwt)
							.getBody();
		
		
		return claims;
	}
}
