package com.klef.devops.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.devops.model.Missile;
import com.klef.devops.repository.MissileRepository;

@Service
public class MissileServiceImpl implements MissileService
{
    @Autowired
	private MissileRepository missileRepository;
	@Override
	public String addmissile(Missile missile) 
	{
		missileRepository.save(missile);
		return "Missile Loaded Successfully";
	}

	@Override
	public String deletemissile(int mid)
	{
		Optional<Missile> missile=missileRepository.findById(mid);
	       if(missile.isPresent())
	       {
	    	   missileRepository.deleteById(mid);
	    	   return "Missile Deleted Successfully";
	       }
	       else {
	    	   return "Missile ID Not found";
	       }
	}

	@Override
	public List<Missile> viewallmissiles()
	{
		return missileRepository.findAll();
	}

	@Override
	public String updateMissile(Missile missile)
	{
		missileRepository.save(missile);
		return "Missile Updated Successfully";
	}

	@Override
	public Missile getMissileById(int mid)
	{
		return missileRepository.findById(mid).orElse(null);
	}

}
