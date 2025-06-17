package com.example.demo.service;

import com.example.demo.exception.CertException;
import com.example.demo.model.dto.UserCertDto;

public interface CertService {
	UserCertDto getCert(String username, String password) throws CertException;
}
