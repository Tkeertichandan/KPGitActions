package com.klef.devops.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="missile_table")
public class Missile 
{
	@Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  @Column(name="missile_id")
	  private int id;
	  @Column(name="missile_name",length=300,nullable = false)
	  private String name;
	  @Column(name="missile_range", nullable = false )
	  private int range;
	  @Column(name="missile_weight",nullable = false)
	  private int weight;
	  @Column(name = "missile_organization",length=300,nullable = false)
	  private String organization;
	  public int getId() {
	  return id;
	  }
	  public void setId(int id) {
	  this.id = id;
	  }
	  public String getName() {
	  return name;
	  }
	  public void setName(String name) {
	  this.name = name;
	  }
	  public int getRange() {
	  return range;
	  }
	  public void setRange(int range) {
	  this.range = range;
	  }
	  public int getWeight() {
	  return weight;
	  }
	  public void setWeight(int weight) {
	  this.weight = weight;
	  }
	  public String getOrganization() {
	  return organization;
	  }
	  public void setOrganization(String organization) {
	  this.organization = organization;
	  }
	
	

}
