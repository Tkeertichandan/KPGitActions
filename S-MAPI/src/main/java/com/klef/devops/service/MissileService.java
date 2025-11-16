package com.klef.devops.service;

import java.util.List;

import com.klef.devops.model.Missile;

public interface MissileService
{
	public String addmissile(Missile missile);
	public String deletemissile(int mid);
	public List<Missile> viewallmissiles();
	public String updateMissile(Missile missile);
	public Missile getMissileById(int mid);
	
}
