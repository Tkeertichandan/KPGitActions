package com.klef.devops.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.devops.model.Missile;
import com.klef.devops.service.MissileService;

@RestController
@RequestMapping("/missile")
@CrossOrigin("*")
public class MissileController
{
    @Autowired
    private MissileService missileService;
    
    @GetMapping("/")
    public String home() 
    {
        return " Full Stack Deployment Demo";
    }

    @PostMapping("/add")
    public ResponseEntity<String> addMissile(@RequestBody Missile missile)
    {
        try
        {
            String result = missileService.addmissile(missile);
            return ResponseEntity.ok(result);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(500).body("Failed to Add Missile");
        }
    }

    @DeleteMapping("/delete/{mid}")
    public ResponseEntity<String> deleteMissile(@PathVariable int mid)
    {
        try
        {
            String result = missileService.deletemissile(mid);
            return ResponseEntity.ok(result);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(500).body("Failed to Delete Missile");
        }
    }

        @GetMapping("/viewall")
    public ResponseEntity<List<Missile>> viewAllMissiles()
    {
        List<Missile> missiles = missileService.viewallmissiles();
        return ResponseEntity.ok(missiles);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateMissile(@RequestBody Missile missile)
    {
        try
        {
            String result = missileService.updateMissile(missile);
            return ResponseEntity.ok(result);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(500).body("Failed to Update Missile");
        }
    }

    @GetMapping("/viewbyid/{mid}")
    public ResponseEntity<?> getMissileById(@PathVariable int mid)
    {
        try
        {
            Missile missile = missileService.getMissileById(mid);
            if (missile != null)
            {
                return ResponseEntity.ok(missile);
            }
            else
            {
                return ResponseEntity.status(404).body("Missile Not Found");
            }
        }
        catch(Exception e)
        {
            return ResponseEntity.status(500).body("Failed to Fetch Missile");
        }
    }
}
